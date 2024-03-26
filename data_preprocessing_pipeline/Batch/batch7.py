import xml.etree.ElementTree as ET
import cupy as cp
import csv
from PIL import Image
import cv2
import os

def read_csv_to_array(filename):
    data_array = []

    with open(filename, 'r') as csvfile:
        csv_reader = csv.reader(csvfile)
        for row in csv_reader:
            if row:  # Skip empty rows
                data_array.append(row[0])  # Assuming single value per row

    return data_array

filename="xml_batch_7.csv"
xml_paths=read_csv_to_array(filename)

def pre_prpcessing_pipeline(xml_paths,image_folder,mask_output,img_output,pixel_shift,desired_size):
    for path in xml_paths:
        if path.endswith(".xml"):
            tree = ET.parse(path)
            root = tree.getroot()

            # Get the image filename from the XML file
            image_filename = root.find("filename").text

            # Find the dimens
            # ions
            for image_dim in root.iter('size'):
                width = int(image_dim.find('width').text)
                height = int(image_dim.find('height').text)
            
            # Create an empty image with the same size on GPU
            image_gpu = cp.full((height, width), 0, dtype=cp.uint8)  # Initialize with 0 (representing background)
            image_gpu1 = cp.zeros_like(image_gpu)
            intersection_img = cp.zeros_like(image_gpu)

            # Apply uniform reduction of 4 pixels to the bounding boxes
            for obj in root.findall("object"):
                
                # Get the object label
                label = obj.find("name").text

                if label == "table row":
                
                    # Get the bounding box coordinates
                    bbox = obj.find("bndbox")
                    xmin = int(float(bbox.find("xmin").text)) + pixel_shift
                    ymin = int(float(bbox.find("ymin").text)) + pixel_shift
                    xmax = int(float(bbox.find("xmax").text)) - pixel_shift
                    ymax = int(float(bbox.find("ymax").text)) - pixel_shift

                    # Update the image array on GPU with row bbox
                    image_gpu[ymin:ymax, xmin:xmax] = 255  

                if label == "table column":

                    # Get the bounding box coordinates
                    bbox = obj.find("bndbox")
                    xmin = int(float(bbox.find("xmin").text)) + pixel_shift
                    ymin = int(float(bbox.find("ymin").text)) + pixel_shift
                    xmax = int(float(bbox.find("xmax").text)) - pixel_shift
                    ymax = int(float(bbox.find("ymax").text)) - pixel_shift

                    # Update the image array on GPU with row bbox
                    image_gpu1[ymin:ymax, xmin:xmax] = 255
            
            # Intersect row and column to reduce to cell 
            intersection = cp.logical_and(image_gpu == 255, image_gpu1 == 255)
            intersection_img[intersection] = 255

            # Apply uniform reduction of 4 pixels to the bounding boxes
            for obj in root.findall("object"):
                
                # Get the object label
                label = obj.find("name").text
                
                if label == "table spanning cell":

                    # Get the bounding box coordinates
                    bbox = obj.find("bndbox")
                    xmin = int(float(bbox.find("xmin").text)) + pixel_shift
                    ymin = int(float(bbox.find("ymin").text)) + pixel_shift
                    xmax = int(float(bbox.find("xmax").text)) - pixel_shift
                    ymax = int(float(bbox.find("ymax").text)) - pixel_shift
                    
                    intersection_img[ymin:ymax, xmin:xmax] = 200

            # Apply uniform reduction of 4 pixels to the bounding boxes
            for obj in root.findall("object"):
                
                # Get the object label
                label = obj.find("name").text

                if label == "table projected row header":
                
                    # Get the bounding box coordinates
                    bbox = obj.find("bndbox")
                    xmin = int(float(bbox.find("xmin").text)) + pixel_shift
                    ymin = int(float(bbox.find("ymin").text)) + pixel_shift
                    xmax = int(float(bbox.find("xmax").text)) - pixel_shift
                    ymax = int(float(bbox.find("ymax").text)) - pixel_shift

                    intersection_img[ymin:ymax, xmin:xmax] = 120

            #Start adding the padding 

            # reading the parent images
            img = cv2.imread(os.path.join(image_folder,image_filename))

            # resize the image while preserving aspect ratio and adding padding
            max_dim         =   max(height, width)
            ratio           =   int(desired_size) / max_dim
            new_size        =   tuple([int(x * ratio) for x in (width, height)])
            resized_img     =   cv2.resize(img, (new_size[0], new_size[1]))

            # adding pad to the image to get consistent shape
            pad_w           =   desired_size - new_size[0]
            pad_h           =   desired_size - new_size[1]
            top, bottom     =   pad_h // 2, pad_h - (pad_h // 2)
            left, right     =   pad_w // 2, pad_w - (pad_w // 2)
            padded_img      =   cv2.copyMakeBorder(resized_img, top, bottom, left, right, cv2.BORDER_CONSTANT, value=[0, 0, 0])

            # Calculate the padding needed for each side
            pad_top = (max_dim - intersection_img.shape[0]) // 2
            pad_bottom = max_dim - intersection_img.shape[0] - pad_top
            pad_left = (max_dim - intersection_img.shape[1]) // 2
            pad_right = max_dim - intersection_img.shape[1] - pad_left

            # Pad intersection_img to fit the mask size
            padded_intersection_img = cp.pad(intersection_img, ((pad_top, pad_bottom), (pad_left, pad_right)), mode='constant', constant_values=0)

            # Update pixel values in intersection_img
            padded_intersection_img = cp.where(padded_intersection_img == 255, 1, padded_intersection_img)
            padded_intersection_img = cp.where(padded_intersection_img == 200, 2, padded_intersection_img)
            padded_intersection_img = cp.where(padded_intersection_img == 120, 3, padded_intersection_img)
            
            image_to_save = Image.fromarray(cp.asnumpy(padded_intersection_img))

            # save images

            #create path for image and mask
            img_path=os.path.join(img_output,image_filename.replace(".jpg",".png"))
            mask_path=os.path.join(mask_output,image_filename.replace(".jpg",".png"))

            # Save image using OpenCV
            # Save the PIL Image as a PNG file
            image_to_save.save(mask_path)
            cv2.imwrite(img_path, padded_img)

        print("Success")


img_output="img_validation"
mask_output="mask_validation"
if not os.path.exists(mask_output):
    os.makedirs(mask_output)    
if not os.path.exists(img_output):
    os.makedirs(img_output)

pre_prpcessing_pipeline(xml_paths,"images",mask_output, img_output,2,512)