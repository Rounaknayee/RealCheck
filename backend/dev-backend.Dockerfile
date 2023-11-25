# Use the official Node.js image as our base
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to optimize Docker caching
COPY package*.json ./

# Install dependencies, including dev dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 5001

# Command to run the application with nodemon for hot reloading
CMD ["npm", "run", "dev"]
