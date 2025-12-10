# ============================================
# Base image with Bun (Alpine)
# ============================================
FROM oven/bun:1.3.3-alpine AS base
WORKDIR /app

# ============================================
# Dependencies stage
# ============================================
FROM base AS deps

# Copy package files first (for layer caching)
COPY package.json bun.lock ./

# Install dependencies with cache mount
RUN --mount=type=cache,id=bun-cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

# ============================================
# Builder stage
# ============================================
FROM base AS builder

# Set environment variables for build
ENV NODE_ENV=production

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy package files
COPY package.json bun.lock ./

# Copy source code
COPY . .

# Build Vite app with cache mount for node_modules/.vite
RUN --mount=type=cache,id=vite-cache,target=/app/node_modules/.vite \
    bun run build

# ============================================
# Production runner stage
# ============================================
FROM oven/bun:1.3.3-alpine AS runner

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --ingroup nodejs vite

# Copy built static files from dist directory
COPY --from=builder --chown=vite:nodejs /app/dist ./

# Switch to non-root user
USER vite

# Expose the port
EXPOSE 3000

# Set hostname for Dokploy/Docker Swarm compatibility
ENV HOSTNAME="0.0.0.0"

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=5 \
    CMD bun -e "fetch('http://localhost:3000').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

# Start Bun static file server directly
CMD ["bun", "-e", "import { serve } from 'bun'; serve({ port: 3000, hostname: '0.0.0.0', fetch: async (req) => { const url = new URL(req.url); let path = url.pathname === '/' ? '/index.html' : url.pathname; const file = Bun.file('.' + path); if (await file.exists()) return new Response(file); const index = Bun.file('./index.html'); return await index.exists() ? new Response(index) : new Response('Not Found', { status: 404 }); } });"]
