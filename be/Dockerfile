# Use the official Node.js image as the base
FROM node:18-alpine

# Set the working directory to the 'be' folder inside the container
WORKDIR /app/be

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire backend code
COPY . .

# Expose the app's port
EXPOSE 3000

# Run the NestJS application with hot-reloading
CMD ["npm", "run", "start:dev"]
