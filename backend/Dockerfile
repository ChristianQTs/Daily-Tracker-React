FROM node:20-alpine
WORKDIR /backend
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "api.js"]
EXPOSE 5173