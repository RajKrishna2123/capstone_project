# Capstone project : Structural OCR

Innovations in Document Analysis: Exploring Keras Segmentation and Graph Convolutional Neural Networks for Structural OCR
## Project Architecture 
![2](https://github.com/RajKrishna2123/capstone_project/blob/main/project_architecture.gif)

## Description
this project was earlier developed under fire llama company as part of my internship. I am further developing it.
This project is under development as my last semester project for the subject UCF 439 Capstone project  

## Table of Contents
- [Requirements](#Requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Documentation](#documentation)
- [License](#license)

## Requirements

To run this project, you'll need the following dependencies:

- Python 3.7
- TensorFlow GPU 2.4.0
- CUDA 11.0
- cuDNN 8.0

You can install the required Python packages using the following command:

```bash
pip install tensorflow_gpu==2.4.0
```


## Installation
To get started with the project, follow these steps:

1. Clone this repository:

   ```bash
   git clone https://github.com/YourUsername/FireLLama.git
   ```
   ```bash
   cd FireLLama
   ```
   ```bash  
   pip install -r requirements.txt
   ```
## Usage

[Explain how users can use your project or application.]

## Features

1. **Segmentation Model:** Includes a pre-trained segmentation model based on the MobileNet architecture for semantic segmentation tasks.

2. **Training and Validation:** Provides scripts and instructions for training and validating the segmentation model using custom datasets.

3. **Data Processing:** Includes functions for data preprocessing, augmentation, and conversion between annotation formats (XML to PNG).

4. **Image Cropping:** Allows for cropping tables from images using connected component labeling and OCR-based methods.

5. **Text Recognition:** Utilizes OCR (Optical Character Recognition) to recognize and extract text from segmented table regions.

6. **CSV Output:** Exports the extracted table data to CSV files for further analysis and processing.

7. **Documentation:** Offers detailed documentation on how to use the codebase and its functionalities.

8. **Checkpoints:** Supports saving and loading model checkpoints for training and inference.

9. **Data Verification:** Provides a data verification step to ensure dataset integrity before training.

10. **Batch Processing:** Supports batch processing of multiple images and tables for efficiency.


## Documentation

[Link to external documentation or detailed guides, if available.]


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

