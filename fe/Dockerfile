# Use the official Node.js image as the base
FROM node:18-alpine

# Set the working directory to the 'app' folder
WORKDIR /app

# Copy package files and install dependencies
COPY package.json app/package-lock.json ./
RUN npm install

# Copy the rest of the app files
COPY app/ .

# Expose the app port
EXPOSE 3000

# Run React in development mode for live reload
CMD ["npm", "start"]
