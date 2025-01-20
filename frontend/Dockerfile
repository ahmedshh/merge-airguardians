# Dockerfile for React Frontend
FROM node:16-alpine

# Set the working directory
WORKDIR /frontend

# Copy the React project files
COPY ./frontend ./

# Install Node.js dependencies
RUN npm install

# Build the React app
RUN npm run build

# Expose the port for the React app
EXPOSE 3000

# Command to start the React app
CMD ["npm", "start"]
