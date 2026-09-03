FROM node:alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Build stage
FROM base AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

# SITE_URL is baked at build time into HTML (canonicals, OG, sitemap,
# hreflang). Without it, every URL in the build defaults to
# http://localhost:4321 — wrecks SEO. Pass via docker-compose build args.
ARG SITE_URL=http://localhost:4321
ENV SITE_URL=$SITE_URL
RUN npm run build

# Production runtime
FROM base AS runner
WORKDIR /app

# Non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 astro

COPY --from=builder --chown=astro:nodejs /app/dist ./dist
COPY --from=deps --chown=astro:nodejs /app/node_modules ./node_modules
COPY --chown=astro:nodejs package.json ./

USER astro

EXPOSE 4321
ENV HOST=0.0.0.0
ENV PORT=4321

CMD ["node", "./dist/server/entry.mjs"]
