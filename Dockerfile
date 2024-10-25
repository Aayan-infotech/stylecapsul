# Stage 1: Build the application
FROM node:18 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the application
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app/dist ./dist

# Install a minimal HTTP server to serve the static files
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 2024

# Serve the production build
CMD ["serve", "-s", "dist", "-l", "2024"]
