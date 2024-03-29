# Use the official Node.js image as a base
FROM node:16.20.2-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci --force

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js app
RUN npm run build -- --no-lint

# Expose the port that the Next.js app will run on
EXPOSE 3000

# Run the Next.js app in production mode
CMD ["npm", "run", "dev"]
