# Use an official Node runtime as the base image
FROM node:22

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port for the React development server
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]
