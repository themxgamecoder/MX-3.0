FROM node:20-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

COPY package.json .

RUN npm install nayan-videos-downloader@0.0.8 && npm install qrcode-terminal
COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
