import os
import cv2
import csv
import numpy as np

def read_csv_to_array(filename):
    data_array = []

    with open(filename, 'r') as csvfile:
        csv_reader = csv.reader(csvfile)
        for row in csv_reader:
            if row:  # Skip empty rows
                data_array.append(row[0])  # Assuming single value per row

    return data_array

# Specify the CSV file name you want to read
csv_filename = "batch_8.csv"

# Call the function to read CSV data into an array
xml_paths = read_csv_to_array(csv_filename)


def test_train_val_split_80_10_10(xml_paths, img_root, ano_root):
    import shutil
    import os
    import random

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

    # Shuffle the XML paths and calculate the number of files for testing and validation
    random.shuffle(xml_paths)
    num_files = len(xml_paths)
    num_test_files = int(num_files * test_pct)
    num_val_files = int(num_files * val_pct)

    # Separate files for testing and validation
    test_xml_paths = [os.path.basename(path) for path in xml_paths[:num_test_files]]
    val_xml_paths = [os.path.basename(path) for path in xml_paths[num_test_files:num_test_files + num_val_files]]
    train_xml_paths = [os.path.basename(path) for path in xml_paths[num_test_files + num_val_files:]]

    # Iterate through the XML file paths
    for xml_path in xml_paths:
        l = xml_path
        cx = l.split("\\")
        image_filename = cx[1].replace('.xml', '.jpg')
        mask_filename = cx[1].replace('.xml', '.png')
        img_path = os.path.join(img_root, image_filename)
        anno_path = os.path.join(ano_root, mask_filename)
        print(img_path, anno_path)

        if os.path.basename(xml_path) in test_xml_paths:
            dst_path = os.path.join(test_img, image_filename)
            dst_ano_path = os.path.join(test_ano, mask_filename)
        elif os.path.basename(xml_path) in val_xml_paths:
            dst_path = os.path.join(val_img, image_filename)
            dst_ano_path = os.path.join(val_ano, mask_filename)
        else:
            dst_path = os.path.join(train_img, image_filename)
            dst_ano_path = os.path.join(train_ano, mask_filename)

        # Move the image and the corresponding annotation file
        if os.path.exists(img_path) and os.path.exists(anno_path):
            shutil.move(img_path, dst_path)
            shutil.move(anno_path, dst_ano_path)

    print("Splitting successful!")


test_train_val_split_80_10_10(xml_paths, "subset/processed_img", "subset/png_ano")