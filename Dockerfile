# Use an official TensorFlow GPU base image
FROM tensorflow/tensorflow:devel-gpu

# Set the working directory in the container
WORKDIR /cpastone_project

# Install Python, pip, and other dependencies
RUN apt-get update && \
    apt-get install -y \
        python3 \
        python3-pip

# Install specific Python packages
RUN pip3 install Django opencv-python-headless shutil numpy

# Install Visual Studio Code (VSCode)
RUN apt-get install -y wget gnupg && \
    wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > /etc/apt/trusted.gpg.d/microsoft.gpg && \
    echo "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list && \
    apt-get update && \
    apt-get install -y code

# Expose port 8000 for Django
EXPOSE 8000


# Set a default command to run when the container starts
CMD ["bash"]
