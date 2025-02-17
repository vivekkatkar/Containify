FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
ENV key=my_api_key
CMD ["node", "src/index.js"]
