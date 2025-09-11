# Use Node.js 20 Alpine
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package.json ./
COPY server/package.json server/package-lock.json* ./server/

# Install dependencies
RUN npm install
RUN cd server && npm install

# Copy server source code
COPY server/ ./server/

# Generate Prisma client and build the application
RUN cd server && npm run prisma:generate
RUN npm run build

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S apiuser -u 1001

# Change ownership of the app directory
RUN chown -R apiuser:nodejs /app

USER apiuser

# Expose port (Railway will set this via environment variable)
EXPOSE 4000

ENV NODE_ENV=production

# Start the Express API server
CMD ["npm", "start"]
