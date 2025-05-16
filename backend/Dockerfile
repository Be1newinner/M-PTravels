# 1️⃣ Base image for building (has Node + pnpm + ts)
FROM node:20-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

# Create working dir
WORKDIR /app

# Copy only necessary files to leverage Docker caching
COPY package.json pnpm-lock.yaml ./
COPY tsconfig.build.json tsconfig.json ./
COPY eslint.config.js ./eslint.config.js
COPY nodemon.json ./nodemon.json

# Install dependencies (no devDeps in prod)
RUN pnpm install --frozen-lockfile

# Copy source files
COPY src ./src
COPY public ./public
COPY docs ./docs
COPY loader.mjs ./

# Compile TypeScript to JavaScript
RUN pnpm run build

# 2️⃣ Production image with only built code
FROM node:20-alpine AS runner

# Set secure permissions and non-root user (FAANG best practice)
RUN addgroup -S app && adduser -S app -G app
USER app

# Create working directory
WORKDIR /app

# Copy compiled JS and node_modules only
COPY --chown=app:app --from=builder /app/dist ./dist
COPY --chown=app:app --from=builder /app/node_modules ./node_modules
COPY --chown=app:app --from=builder /app/package.json ./package.json
COPY --chown=app:app --from=builder /app/public ./public
COPY --chown=app:app --from=builder /app/docs ./docs
COPY --chown=app:app --from=builder /app/loader.mjs ./loader.mjs

# Define environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Expose port
EXPOSE 8080

# Start app
CMD ["node", "dist/index.js"]
