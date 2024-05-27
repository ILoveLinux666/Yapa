# Use the official Node.js 14 image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY node/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY node/ ./

# Build TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]