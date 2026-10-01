#!/bin/sh
# Encodes the release video for the landing page into public/video/:
#   tagvico-3-5.mp4   H.264 + AAC, 1280x720, faststart (VP9 WebM came out larger at this quality, so it is not used)
#   tagvico-3-5-poster.webp  from the still given as the second argument, or from the first frame
# Usage: scripts/encode-video.sh <release.mp4> [poster-still.png]
set -eu
input=${1:?usage: encode-video.sh <release.mp4> [poster-still.png]}
poster=${2:-}
out=public/video
mkdir -p "$out"
scale="scale=1280:720:flags=lanczos"

ffmpeg -y -loglevel error -i "$input" -vf "$scale" -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p \
  -c:a aac -b:a 96k -movflags +faststart "$out/tagvico-3-5.mp4"
if [ -n "$poster" ]; then
  ffmpeg -y -loglevel error -i "$poster" -vf "$scale" -c:v libwebp -quality 80 "$out/tagvico-3-5-poster.webp"
else
  ffmpeg -y -loglevel error -i "$input" -frames:v 1 -vf "$scale" -c:v libwebp -quality 80 "$out/tagvico-3-5-poster.webp"
fi
ls -l "$out"
