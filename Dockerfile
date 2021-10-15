# Using node lts version with alpine
FROM node:lts-alpine

# Set working directory to /app
WORKDIR /app

# First copy package.json and run yarn for caching
COPY .npmrc .
COPY package.json .
COPY yarn.* .
RUN yarn

# Copy all files to working directory
COPY . .

# Expose 9003 port
EXPOSE 9003

# Start application
CMD ["yarn", "start"]
