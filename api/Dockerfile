FROM node:20-alpine

# Set working directory (optional, but recommended for organization)
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001 

# Assuming your server starts from server.js (adjust if different)
CMD [ "node", "server.js" ]
