# Useing the linux based nvidia + opengl as the base image
FROM nvidia/cudagl:11.0-base

# Set the working directory in the container
WORKDIR /app

# add gpg key
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys A4B469963BF863CC  

# Set noninteractive mode for package installations
ENV DEBIAN_FRONTEND=noninteractive

# Intall updates
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    cmake \
    git \
    wget \
    software-properties-common \
    pciutils \
    lsb-release \
    gnupg \
    libgl1-mesa-glx \
    libgtk-3-dev && \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Add deadsnakes PPA and install Python 3.7
RUN add-apt-repository ppa:deadsnakes/ppa && \
    apt-get update && \
    apt-get install -y python3.7 python3.7-dev python3.7-distutils

# Install pip for Python 3.7
RUN wget https://bootstrap.pypa.io/get-pip.py && \
    python3.7 get-pip.py

# Intsall necessary python packages 
RUN pip3.7 install \
    opencv-python==4.5.1.48 \
    tqdm==4.66.2 \
    pillow==9.5.0 \
    h5py==2.10.0 


# Reset to default interactive mode
ENV DEBIAN_FRONTEND=dialog

# Download CUDA, cudnn and tensorflow for gpu acess 
RUN wget http://developer.download.nvidia.com/compute/cuda/11.0.2/local_installers/cuda_11.0.2_450.51.05_linux.run && \
    wget https://developer.download.nvidia.com/compute/redist/cudnn/v8.0.5/cudnn-11.0-linux-x64-v8.0.5.39.tgz 

# Set the default command to run at container runtime

RUN sh cuda_11.0.2_450.51.05_linux.run --silent --toolkit --override && \
    export PATH=/usr/local/cuda/bin${PATH:+:${PATH}} && \
    echo 'export LD_LIBRARY_PATH=/usr/local/cuda/lib64:$LD_LIBRARY_PATH' >> ~/.bashrc &&\
    . ~/.bashrc &&\
    tar -xzvf cudnn-11.0-linux-x64-v8.0.5.39.tgz && \
    cp cuda/include/cudnn.h /usr/local/cuda/include && \
    cp cuda/include/cudnn_adv_infer.h /usr/local/cuda/include && \
    cp cuda/include/cudnn_adv_train.h /usr/local/cuda/include && \
    cp cuda/include/cudnn_backend.h /usr/local/cuda/include && \
    cp cuda/include/cudnn_cnn_infer.h /usr/local/cuda/include && \
    cp cuda/include/cudnn_cnn_train.h /usr/local/cuda/include && \
    cp cuda/include/cudnn_ops_infer.h /usr/local/cuda/include && \
    cp cuda/include/cudnn_ops_train.h /usr/local/cuda/include && \
    cp cuda/include/cudnn_version.h /usr/local/cuda/include && \
    cp cuda/lib64/libcudnn.so /usr/local/cuda/lib64 && \
    cp cuda/lib64/libcudnn.so.8 /usr/local/cuda/lib64 && \
    cp cuda/lib64/libcudnn.so.8.0.5 /usr/local/cuda/lib64 && \
    cp cuda/lib64/libcudnn_adv_infer.so /usr/local/cuda/lib64 && \
    cp cuda/lib64/libcudnn_adv_infer.so.8 /usr/local/cuda/lib64 && \
    cp cuda/lib64/libcudnn_adv_infer.so.8.0.5 /usr/local/cuda/lib64 && \
    cp cuda/lib64/libcudnn_adv_train.so /usr/local/cuda/lib64 && \
    cp cuda/lib64/libcudnn_adv_train.so.8 /usr/local/cuda/lib64 && \
    cp cuda/lib64/libcudnn_adv_train.so.8.0.5 /usr/local/cuda/lib64 && \
    cp cuda/lib64/libcudnn_cnn_infer.so /usr/local/cuda/lib64 && \
    cp cuda/lib64/libcudnn_cnn_infer.so.8 /usr/local/cuda/lib64 && \
    cp cuda/lib64/libcudnn_cnn_infer.so.8.0.5 /usr/local/cuda/lib64 && \
    cp cuda/lib64/libcudnn_cnn_train.so /usr/local/cuda/lib64 && \
    cp cuda/lib64/libcudnn_cnn_train.so.8 /usr/local/cuda/lib64 && \
    cp cuda/lib64/libcudnn_cnn_train.so.8.0.5 /usr/local/cuda/lib64 && \
    cp cuda/lib64/libcudnn_ops_infer.so /usr/local/cuda/lib64 && \
    cp cuda/lib64/libcudnn_ops_infer.so.8 /usr/local/cuda/lib64 && \
    cp cuda/lib64/libcudnn_ops_infer.so.8.0.5 /usr/local/cuda/lib64 && \
    cp cuda/lib64/libcudnn_ops_train.so /usr/local/cuda/lib64 && \
    cp cuda/lib64/libcudnn_ops_train.so.8 /usr/local/cuda/lib64 && \
    cp cuda/lib64/libcudnn_ops_train.so.8.0.5 /usr/local/cuda/lib64 && \
    cp cuda/lib64/libcudnn_static.a /usr/local/cuda/lib64 && \
    cp cuda/lib64/libcudnn_static.a /usr/local/cuda/lib64 && \
    chmod a+r /usr/local/cuda/include/cudnn*.h /usr/local/cuda/lib64/libcudnn* && \
    pip3.7 install tensorflow-gpu==2.4.1 && \
    pip3.7 install keras==2.4.3 && \
    pip3.7 install protobuf==3.9.2 &&\
    rm -rf cuda_11.0.2_450.51.05_linux.run && \
    rm -rf cudnn-11.0-linux-x64-v8.0.5.39.tgz && \
    rm -rf cuda 

RUN apt-get update && \
    apt upgrade -y 

# Expose ports 
EXPOSE 8000

CMD ["/bin/bash"]