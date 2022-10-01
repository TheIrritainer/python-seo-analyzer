FROM python:3-alpine

RUN apk update && \
    apk --no-cache add \
    nodejs npm \
    make \
    g++ \
    bash nano


WORKDIR /app

COPY . /app

RUN python3 setup.py install

RUN npm install

CMD ["node", "index.js"]
