from keras_segmentation.predict import model_from_checkpoint_path
import cv2
import numpy as np
from paddleocr import PaddleOCR
import pandas as pd
import os
from collections import Counter

model=model_from_checkpoint_path("checkpoints")

def intersection_area(box1, box2):
    # Extract coordinates for box 1
    x1, y1 = box1[0]
    x2, y2 = box1[1]
    x3, y3 = box1[2]
    x4, y4 = box1[3]

    # Extract coordinates for box 2
    x5, y5 = box2[0]
    x6, y6 = box2[1]
    x7, y7 = box2[2]
    x8, y8 = box2[3]

    # Calculate the intersection coordinates
    x_intersection = max(x1, x5)
    y_intersection = max(y1, y5)
    x2_intersection = min(x2, x6)
    y2_intersection = min(y3, y7)

    # Calculate the width and height of the intersection
    width = max(0, x2_intersection - x_intersection)
    height = max(0, y2_intersection - y_intersection)

    # Calculate the area of the intersection
    intersection_area = width * height

    return intersection_area


def mask_conversion(inp_dict,mask):
    keys_list = list(inp_dict.keys())
    for i in keys_list:
        mask[mask == i] = inp_dict[i]
    return mask

def table_img(img):
    image_path="PMC1065056_table_0.jpg"
    # Reading the image
    img = cv2.imread(image_path)
    desired_size=512
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
    z = cv2.copyMakeBorder(resized_img, top, bottom, left, right, cv2.BORDER_CONSTANT, value=[0, 0, 0])

    x=model.predict_segmentation(z)
    dic={1:255,2:150,3:80}
    image_decoded=mask_conversion(dic,x)

    # Initialize variables to store the coordinates of the first non-zero pixel
    first_Y = None
    first_X = None

    # Find the coordinates (i, j) of the first non-zero pixel from the top-left
    for i in range(0, 256):
        for j in range(0, 256):
            if image_decoded[i, j] > 0:
                first_Y = i - 1
                first_X = j - 1
                break
        if first_Y is not None:
            break

    # Initialize variables to store the coordinates of the first non-zero pixel from the bottom-right
    last_Y = None
    last_X = None

    # Find the coordinates (i, j) of the first non-zero pixel from the bottom-right
    for i in range(255, -1, -1):
        for j in range(255, -1, -1):
            if image_decoded[i, j] > 0:
                last_Y = i + 2
                last_X = j + 2
                break
        if last_Y is not None:
            break
    print(last_X,last_Y,first_X,first_Y)

    x = 0
    y = 0
    for i in range(first_X, last_X):    
        for j in range(first_Y, last_Y):
            if image_decoded[j, i] == 0:
                y = y + 1
            else:
                x = x + 1

        # Now, outside of the inner loop for each column, check if x is less than y
        if x< y:
            for w in range(first_Y, last_Y):
                image_decoded[w, i] = 0
        x = 0
        y = 0

    x = 0
    y = 0
    for i in range(first_Y, last_Y):
        
        for j in range(first_X, last_X):
            if image_decoded[i, j] == 0:
                y = y + 1
            else:
                x = x + 1
        if y > x:
            for w in range(first_X, last_X):
                image_decoded[i,w] = 0
        x = 0
        y = 0

    top, bottom = pad_h // 4, 256 - (pad_h // 4)
    left, right = pad_w // 4, 256 - (pad_w // 4)
    # Crop the image
    cropped_image = image_decoded[top:bottom, left:right]
    # Save the modified image
    cropped_image = cv2.resize(cropped_image, (width,height),interpolation=cv2.INTER_NEAREST)
    cv2.imencode('.png', cropped_image)[1].tofile("temp3.png")
    
    # Initialize the OCR model
    ocr = PaddleOCR(use_angle_cls=True, lang='en')

    # Load the original image
    original_image = img

    # Load the segmentation mask and perform connected component labeling
    img = cv2.imread("temp3.png", cv2.IMREAD_GRAYSCALE)  # Make sure the image is grayscale
    n_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(img, connectivity=4)

    # Create a directory to save cropped images
    output_folder = "cropped_images"
    os.makedirs(output_folder, exist_ok=True)

    # Create a list to store the modified bounding boxes (expanded by 3 pixels)
    expanded_bounding_boxes = []
    text_arr = []

    # Iterate over each labeled region in the sorted order
    for index in range(1, n_labels):
        area = stats[index, cv2.CC_STAT_AREA]

        # Extract the original bounding box (x, y, w, h) for the current label
        x, y, w, h = stats[index, cv2.CC_STAT_LEFT], stats[index, cv2.CC_STAT_TOP], stats[index, cv2.CC_STAT_WIDTH], stats[index, cv2.CC_STAT_HEIGHT]

        # Expand the bounding box by 3 pixels in all directions
        x -= 4
        y -= 4
        w += 8
        h += 8

        expanded_bounding_boxes.append((x, y, w, h))
    bbox=[]

    # Crop the original image based on the modified bounding boxes and save them
    for n, (x, y, w, h) in enumerate(expanded_bounding_boxes):
        crop = original_image[y:y+h, x:x+w]

        for i in range(crop.shape[0]):
            for j in range(crop.shape[1]):
                for k in range(crop.shape[2]):
                    pixel_value = crop[i, j, k]
                    if pixel_value < 180:
                        crop[i,j,k]=crop[i,j,k]=50
                    else:
                        crop[i,j,k]=crop[i,j,k]=255
        try:
            # Upscale the image using bilinear interpolation
            scale_factor = 4
            upscaled_image = cv2.resize(crop, None, fx=scale_factor, fy=scale_factor, interpolation=cv2.INTER_NEAREST)

            # apply OCR using PaddleOCR
            result = ocr.ocr(upscaled_image, cls=True)
            tuples = [res[0][-1] for res in result]

            # Extract and concatenate the OCR text
            CONTENT = ""
            for tpl in tuples:
                CONTENT = CONTENT + tpl[0]
            text_arr.append(CONTENT)
        except Exception as e:
            print(f"Error processing segment {n}: {e}")
            text_arr.append("")

        # Save the cropped image
        output_path = os.path.join(output_folder, f"segment_{n}.jpg")
        cv2.imwrite(output_path, crop)

    # Create a DataFrame with order numbers, filenames, and OCR text
    order_numbers = list(range(len(expanded_bounding_boxes)))
    data = {'Order Number': order_numbers, 'Filename': [f"segment_{i}.jpg" for i in order_numbers], 'OCR_text': text_arr}
    df = pd.DataFrame(data)

    # Save the DataFrame to a CSV file
    csv_filename = "segmentation_info.csv"
    df.to_csv(csv_filename, index=False)

    # Extract the x values from the bounding boxes
    x_values = [x for x, _, _, _ in expanded_bounding_boxes]

    # Use Counter to count the frequency of each x value
    x_counts = Counter(x_values)

    # Find the maximum frequency
    num_rows = max(x_counts.values())

    # Extract the y values from the bounding boxes
    y_values = [y for _, y, _, _ in expanded_bounding_boxes]

    # Use Counter to count the frequency of each y value
    y_counts = Counter(y_values)

    # Find the maximum frequency
    num_cols = max(y_counts.values())

    # Create an empty NumPy array with the specified number of rows and columns
    empty_array = np.empty((num_rows, num_cols), dtype=object)

    # Fill the empty array with the content of text_arr
    row, col = 0, 0  # Initialize row and column indices
    for text in text_arr:
        empty_array[row, col] = text  # Fill the current cell with text
    
        # Move to the next cell, considering the array shape
        col += 1
        if col >= num_cols:
            col = 0  # Reset column index to 0
            row += 1  # Move to the next row

    # Save the NumPy array to a CSV file
    csv_filename = "output.csv"
    np.savetxt(csv_filename, empty_array, fmt="%s", delimiter=",")

    print("CSV file saved as:", csv_filename)

