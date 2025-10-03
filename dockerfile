# Use Node.js base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the Vite app
// RUN npm run build

# Expose the default Vite preview port
EXPOSE 4173

# Serve using Vite's preview command
CMD ["npm", "run", "dev"]
