FROM cupy/cupy

WORKDIR /app

RUN apt-get update &&\
    apt-get install libgl1-mesa-glx -y&&\
    apt-get install libgtk-3-dev -y

RUN pip3 install opencv-python &&\
    pip3 install jupyter 

CMD ["/bin/bash"]