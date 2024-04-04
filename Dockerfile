FROM node:16-alpine as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .

# Build the project
RUN npm run build

FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install runtime dependencies
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

# Expose the port the app runs on
EXPOSE 4350

# Run the application
CMD ["npm", "start"]
