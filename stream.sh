ROOT_PATH="/Users/redwan/Library/CloudStorage/OneDrive-UniversityofNewOrleans/Sharing/bowit/expVid"
FILENAME="bowit_exp2_-2023-12-18_15.10.12.mp4"

INPUT_FILE_NAME=${ROOT_PATH}/${FILENAME}

ffmpeg  -f avfoundation -framerate 30 -i "0" -vf "format=yuv420p" \
        -s 1280x720  -c:v libx264 -b:v 1500k \
        -preset ultrafast  \
         -f flv rtmp://localhost:1935/live/webcam