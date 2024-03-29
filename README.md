ni# Capstone project : Structural OCR

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

To run this project, you'll need the following specific dependencies:

- Python 3.7
- TensorFlow GPU 2.4.1 with CUDA 11.0 and cuDNN 8.0
- keras 2.4.3
- imgaug
- opencv 4.5.9
- django

You can install the required Python packages using the following command:

```bash
pip install <package_name>==<version>
```
Example
```bash
pip install tensorflow_gpu==2.4.1
```

## Installation
There are two ways to get started with the project, follow these steps:

- Simple installation where you have to satisfy all dependency in your os.
- By using docker container.

1. Clone this repository:

   ```bash
   git clone https://github.com/RajKrishna2123/capstone_project
   ```
   ```bash
   cd capstone_project
   ```
   ```bash  
   pip install -r requirements.txt
   ```
2. Use docker container 
   ```bash
   docker build -t project_container:updated1 .
   ```
   following command will run the project 
   ```bash
   docker run --gpus all -it -v D:/struct_ocr_data:/app -p 8000:8000 project_cotainer:updated1 /bin/bash
   ```
   once container is up and running is case of lost connection then to reconnect to same container use following command 
   ```bash
   docker exec -it <container_id> bash
   ```
## Usage

This project can be used to convert your bulk/single images into editable formatted structured as it was in image into a relational table at once

## Features

1. Extensive Training Data: The implemented AI model is trained over an extensive dataset of 1 million high￾resolution images. This ensures the system's robustness and accuracy in document structure identification.

2. MLOps Integration: Our implementation adheres to MLOps practices, ensuring a seamless and automated
end-to-end workflow. Continuous integration and delivery pipelines will be established for efficient model 
deployment and updates.

3. Containerization: The system will be containerized for deployment as a web app and API service. This 
promotes scalability and ease of integration into various applications.

4. Google Drive Integration: A unique feature allows users to effortlessly process bulk data by providing Google 
Drive links.

5. Flexible Data Outputs: Another unique feature that system supports versatile data outputs, including CSV, 
MySQL databases, and XLSX, catering to diverse data management preferences.

6. Integrated API Service: Integrated API capabilities will provide other developers with easy access to 
incorporate Structural OCR functionalities into their applications, enhancing overall system accessibility.


## Documentation

[Link to external documentation or detailed guides, if available.]

## Credits

Special thanks to [Rajeev Ratan](https://github.com/rajeevratan84/image-segmentation-keras) for their awesome repository! that supported this project a lot.

## Acknowledgements

- [Vaibhav joshi](https://github.com/Helio-Centrism)
- [Shubhankar dey](https://github.com/contributor-two)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

