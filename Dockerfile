# Use the official Node.js image from the Docker Hub
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Build the project using Webpack
RUN npm run build

# Expose the port your app will run on
EXPOSE 9000

# Start the application
CMD ["npm", "start"]
