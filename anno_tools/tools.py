import os
import shutil
import cv2
import xml.etree.ElementTree as ET
import numpy as np
import random 

def sub_set(anno_path, path, count):
    for directory in ["subset/annotations", "subset/images"]:
        if not os.path.exists(directory):
            os.makedirs(directory)
    
    op_anno_path="subset/annotations"
    op_path="subset/images"


    for annotations_name in os.listdir(anno_path):
        if count != 0:
            if annotations_name.endswith(".xml"):
                annotations_path = os.path.join(anno_path, annotations_name)
                images_name = annotations_name.replace(".xml", ".jpg")
                images_path = os.path.join(path, images_name)

                # Check if the images_path exists and if it's a valid image file
                if os.path.exists(images_path) and images_path.lower().endswith(('.jpg', '.jpeg')):
                    image = cv2.imread(images_path)

                    # Save the grayscale image as JPEG (you can use 'png' for PNG format)
                    new_images_path = os.path.join(op_path, images_name)
                    shutil.copy(images_path, new_images_path)

                    # Copy the annotations to the destination directory
                    new_annotations_path = os.path.join(op_anno_path, annotations_name)
                    shutil.copy(annotations_path, new_annotations_path)

                count -= 1
        else:
            break

    print("Success")


def get_image_dimensions(image_path):    
    img = cv2.imread(image_path)
    if img is None:
        return None

    height, width = img.shape[:2]
    dimensions = img.shape[2] if len(img.shape) > 2 else 1

    return width, height, dimensions 


def xml_to_png(xml_path,op_pngpath,feature_name,pixel_shift,pixel_value):    

    xml_folder=xml_path
    png_ano=op_pngpath

    for xml_file in os.listdir(xml_folder):
        if xml_file.endswith(".xml"):
        
            path=os.path.join(xml_folder,xml_file)
            tree = ET.parse(path)
            root = tree.getroot()
        
            # Get the image filename from the XML file
            image_filename = root.find("filename").text

            #find the dimentions 
            for size_elem in root.iter('size'):
                width = int(size_elem.find('width').text)
                height = int(size_elem.find('height').text)

            # Create an empty image with the same size
            image = np.full((height, width), 0, dtype=np.uint8)  # Initialize with 0 (representing background)

            # Apply uniform reduction of 4 pixels to the bounding boxes
            

            for obj in root.findall("object"):
                # Get the object label
                label = obj.find("name").text

                # Get the bounding box coordinates
                bbox = obj.find("bndbox")
                xmin = int(float(bbox.find("xmin").text)) + pixel_shift
                ymin = int(float(bbox.find("ymin").text)) + pixel_shift
                xmax = int(float(bbox.find("xmax").text)) - pixel_shift
                ymax = int(float(bbox.find("ymax").text)) - pixel_shift
            
                if label==feature_name:           
                    image[ymin:ymax, xmin:xmax] = pixel_value
            
            # Save the image in PNG format
            temp=os.path.join(png_ano,image_filename[:-4] + ".png")
            cv2.imencode('.png', image)[1].tofile(temp)
    print("sucess")


def png_to_png_feature_addition(xml_path,inp_png,op_png,feature_name,pixel_shift,pixel_value):
    
    for xml_file in os.listdir(xml_path):
        if xml_file.endswith(".xml"):
        
            #read the xml file 
            path=os.path.join(xml_path,xml_file)
            
            tree = ET.parse(path)
            root = tree.getroot()

            # Get the image filename from the XML file
            image_filename = root.find("filename").text
            image_filename = image_filename.replace(".jpg", ".png")
            png_path=os.path.join(inp_png,image_filename)

            #load back previously created png anno images
            image_encoded = np.fromfile(png_path, dtype=np.uint8)

            # Decode the image using cv2.imdecode
            image_decoded = cv2.imdecode(image_encoded, cv2.IMREAD_UNCHANGED)
        
            #print(image_decoded)
            #count=count+1
            #if count>1:
            #    break         

            for obj in root.findall("object"):
                # Get the object label
                label = obj.find("name").text

                # Get the bounding box coordinates
                bbox = obj.find("bndbox")
                xmin = int(float(bbox.find("xmin").text)) + pixel_shift
                ymin = int(float(bbox.find("ymin").text)) + pixel_shift
                xmax = int(float(bbox.find("xmax").text)) - pixel_shift
                ymax = int(float(bbox.find("ymax").text)) - pixel_shift

                if label==feature_name:           
                    image_decoded[ymin:ymax, xmin:xmax] = pixel_value
            
            # Save the image in PNG format
            temp=os.path.join(op_png,image_filename[:-4] + ".png")
            cv2.imencode('.png', image_decoded)[1].tofile(temp)
    print("sucess")

def intersection_ano_png(png_path1,png_path2,refrence,op_path,pixel_value):
    for png_file in os.listdir(png_path1):
        if png_file.endswith(".png"):        
            
            inp1=os.path.join(png_path1,png_file)
            inp2=os.path.join(png_path2,png_file)
            inp3=os.path.join(refrence,png_file)
            

            #load back previously created png anno images
            image_encoded = np.fromfile(inp1, dtype=np.uint8)

            # Decode the image using cv2.imdecode
            mask1 = cv2.imdecode(image_encoded, cv2.IMREAD_UNCHANGED)
            
            #load back previously created png anno images
            image_encoded = np.fromfile(inp2, dtype=np.uint8)

            # Decode the image using cv2.imdecode
            mask2 = cv2.imdecode(image_encoded, cv2.IMREAD_UNCHANGED)

            #load back previously created png anno images
            image_encoded = np.fromfile(inp3, dtype=np.uint8)

            # Decode the image using cv2.imdecode
            mask3 = cv2.imdecode(image_encoded, cv2.IMREAD_UNCHANGED)
            
            # Find the intersection where both mask1 and mask2 have pixel value 200
            intersection = np.logical_and(mask1 == pixel_value, mask2 == pixel_value)

            # Replace the values in mask3 with 200 where intersection is True
            mask3[intersection] = pixel_value

            temp=os.path.join(op_path,png_file)
            cv2.imencode('.png', mask3)[1].tofile(temp)
    print("sucess")

def intersection_ano_png2(png_path1, png_path2, op_path, pixel_value):

    for png_file in os.listdir(png_path1):
        if png_file.endswith(".png"):
            inp1 = os.path.join(png_path1, png_file)
            inp2 = os.path.join(png_path2, png_file)
            print(inp1)
            # Load back previously created png anno images
            image_encoded = np.fromfile(inp1, dtype=np.uint8)

            # Decode the image using cv2.imdecode
            mask1 = cv2.imdecode(image_encoded, cv2.IMREAD_UNCHANGED)

            # Load back previously created png anno images
            image_encoded = np.fromfile(inp2, dtype=np.uint8)

            # Decode the image using cv2.imdecode
            mask2 = cv2.imdecode(image_encoded, cv2.IMREAD_UNCHANGED)

            # Find the intersection where both mask1 and mask2 have pixel value 200
            intersection = np.logical_and(mask1 == pixel_value, mask2 == pixel_value)

            # Create a blank mask of the same size as mask1 and mask2
            mask3 = np.zeros_like(mask1)

            # Set the values in mask3 to 200 where intersection is True
            mask3[intersection] = pixel_value

            temp = os.path.join(op_path, png_file)
            cv2.imencode('.png', mask3)[1].tofile(temp)
    print("sucess")
    


def padding(root_img, output_img, root_ano, output_ano):
       
    desired_size = 512 
    for image_file in os.listdir(root_img):
        if image_file.endswith(".jpg"):
        
            #saving the path to image
            image_path = os.path.join(root_img, image_file)
            print(image_path)

            # reading the images
            img = cv2.imread(image_path)

            # resize the image while preserving aspect ratio and adding padding
            height, width   =   img.shape[:2]
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

            # Convert the padded image to grayscale using OpenCV
            gray_img = cv2.cvtColor(padded_img, cv2.COLOR_BGR2GRAY)

            # save the padded image
            output_image_path = os.path.join(output_img,  image_file)
            cv2.imwrite(output_image_path, gray_img)

            #loading mask file to add padding 
            mask_file=image_file.replace(".jpg",".png")
            mask_path = os.path.join(root_ano,mask_file)

            mask=cv2.imread(mask_path)

            # resize the image while preserving aspect ratio and adding padding
            height, width   =   mask.shape[:2]
            max_dim         =   max(height, width)
            ratio           =   int(desired_size) / max_dim
            new_size        =   tuple([int(x * ratio) for x in (width, height)])
            # Resize the mask using nearest-neighbor interpolation
            resized_mask = cv2.resize(mask, (new_size[0], new_size[1]), interpolation=cv2.INTER_NEAREST)


            # adding pad to the image to get consistent shape
            pad_w           =   desired_size - new_size[0]
            pad_h           =   desired_size - new_size[1]
            top, bottom     =   pad_h // 2, pad_h - (pad_h // 2)
            left, right     =   pad_w // 2, pad_w - (pad_w // 2)
            padded_mask      =   cv2.copyMakeBorder(resized_mask, top, bottom, left, right, cv2.BORDER_CONSTANT, value=[0, 0, 0])

            # save the padded image
            output_mask_path = os.path.join(output_ano,  mask_file)
            cv2.imwrite(output_mask_path, padded_mask)
    return "done"



def mask_conversion(inp_dict,in_path,op_path):
   
    for png_file in os.listdir(in_path):
        if png_file.endswith(".png"):
            inp1=os.path.join(in_path,png_file)

            #load back previously created png anno images
            image_encoded = np.fromfile(inp1, dtype=np.uint8)
            # Converting dict_keys object to a list
            keys_list = list(inp_dict.keys())
            # Decode the image using cv2.imdecode
            mask = cv2.imdecode(image_encoded, cv2.IMREAD_UNCHANGED)
            for i in keys_list:
                mask[mask == i] = inp_dict[i]
            temp=os.path.join(op_path,png_file)
            cv2.imencode('.png', mask)[1].tofile(temp)
    print("sucess")


def test_train_val_split_80_10_10(img_root, ano_root):
    
    import shutil
    import os

    # Set the percentages of images to use for testing and validation
    test_pct = 0.1
    val_pct = 0.1

    # Set the directories for the train, validation, and test data
    train_img = "train_img"
    train_ano = "train_ano"
    val_img = "val_img"
    val_ano = "val_ano"
    test_img = "test_img"
    test_ano = "test_ano"

    # Create the train, validation, and test directories
    for directory in [train_img, train_ano, val_img, val_ano, test_img, test_ano]:
        if not os.path.exists(directory):
            os.makedirs(directory)

    # Get the list of image filenames
    image_filenames = [filename for filename in os.listdir(img_root) if filename.endswith(".jpg")]

    # Calculate the number of images for testing and validation based on the percentages
    num_images = len(image_filenames)
    num_test_images = int(num_images * test_pct)
    num_val_images = int(num_images * val_pct)

    # Randomly select images for testing and validation
    test_image_filenames = random.sample(image_filenames, num_test_images)
    remaining_image_filenames = list(set(image_filenames) - set(test_image_filenames))
    val_image_filenames = random.sample(remaining_image_filenames, num_val_images)

    # Iterate through the image data root directory
    for filename in os.listdir(img_root):
        if filename.endswith(".jpg"):
            src_path = os.path.join(img_root, filename)
            annotation_filename = filename.replace(".jpg", ".png")
            src_ano_path = os.path.join(ano_root, annotation_filename)
        
            if filename in test_image_filenames:
                # Move the image to the test directory
                dst_path = os.path.join(test_img, filename)
                dst_ano_path = os.path.join(test_ano, annotation_filename)
            elif filename in val_image_filenames:
                # Move the image to the validation directory
                dst_path = os.path.join(val_img, filename)
                dst_ano_path = os.path.join(val_ano, annotation_filename)
            else:
                # Move the image to the train directory
                dst_path = os.path.join(train_img, filename)
                dst_ano_path = os.path.join(train_ano, annotation_filename)
        
            # Move the image and the corresponding annotation file
            shutil.copy(src_path, dst_path)
            if os.path.exists(src_ano_path):
                shutil.copy(src_ano_path, dst_ano_path)

    print("Splitting successful!")



def padding_img(image_path, desired_size):
    
    # Reading the image
    img = cv2.imread(image_path)

    # Resize the image while preserving aspect ratio and adding padding
    height, width = img.shape[:2]
    max_dim = max(height, width)
    ratio = desired_size / max_dim
    new_size = tuple([int(x * ratio) for x in (width, height)])
    resized_img = cv2.resize(img, (new_size[0], new_size[1]))

    # Adding pad to the image to get consistent shape
    pad_w = desired_size - new_size[0]
    pad_h = desired_size - new_size[1]
    top, bottom = pad_h // 2, pad_h - (pad_h // 2)
    left, right = pad_w // 2, pad_w - (pad_w // 2)
    padded_img = cv2.copyMakeBorder(resized_img, top, bottom, left, right, cv2.BORDER_CONSTANT, value=[0, 0, 0])

    # Convert the padded image to grayscale using OpenCV
    

    return padded_img