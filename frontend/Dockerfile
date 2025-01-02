# frontend/Dockerfile
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Install serve to serve the build
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

CMD ["serve", "-s", "dist"]