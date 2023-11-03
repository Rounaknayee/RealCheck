# Use the official Node.js image as our base
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to optimize Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the CRA development server
CMD ["npm", "start"]


## OPTIMIZED Docker chain build for production
# Use the official Node.js image to build the app
# FROM node:16 AS build

# # Set the working directory
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the app files to the container
# COPY . .

# # Build the React app
# RUN npm run build

# # Serve the app using a lightweight node image
# FROM node:16-slim

# WORKDIR /usr/app

# COPY --from=build /usr/src/app/build /usr/app/build

# # Install serve to serve the React app
# RUN npm install -g serve

# # Expose the port the app runs on
# EXPOSE 3000

# # Command to serve the app
# CMD ["serve", "-s", "build", "-l", "3000"]