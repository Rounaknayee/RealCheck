# Use the official Node.js image as our base
FROM --platform=linux/amd64 node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install 

# Copy the rest of the application
COPY . .

# Set environment variables
ENV NODE_ENV=production
# Add any other environment variable you need here

# Expose the port the app runs on
EXPOSE 5001

# Command to start the application
CMD ["npm", "start"]
