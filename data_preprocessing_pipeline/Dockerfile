FROM cupy/cupy

WORKDIR /app

RUN apt-get update && \
    apt-get install -y \
    libgl1-mesa-glx \
    libgtk-3-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN pip3 install --upgrade pip && \
    pip3 install \
    opencv-python \
    jupyter 

CMD ["/bin/bash"]
