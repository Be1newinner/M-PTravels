# ---------- Stage 1: Build ----------
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies (only those needed for build)
COPY package*.json ./
RUN npm install

# Copy entire project for build
COPY . .

# Build TypeScript
RUN npm run build

# ---------- Stage 2: Production ----------
FROM node:18-alpine AS production

WORKDIR /app

# Copy only the build and runtime files
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/docs ./docs

# Copy any necessary config
COPY --from=builder /app/src/config ./src/config

# Don't run as root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Set env and start app
ENV NODE_ENV=production
CMD ["node", "dist/index.js"]
