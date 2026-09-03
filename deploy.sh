#!/bin/bash
# Generic deploy script. Adjust git branch + container name for your project.
set -e

echo "🚀 Starting deployment..."

# Pull latest
echo "📥 Pulling latest changes..."
git pull

# Stop existing
echo "🛑 Stopping containers..."
docker-compose down

# Build & start
echo "🏗️  Building and starting..."
docker-compose build --no-cache
docker-compose up -d

# Health check (HTTP — TLS terminated upstream by reverse proxy / CDN)
echo "⏳ Waiting for service..."
sleep 15

if curl -fs http://localhost:4321 >/dev/null 2>&1; then
    echo "✅ Deployment successful!"
else
    echo "❌ Health check failed!"
    docker-compose logs --tail=50
    exit 1
fi

echo "🧹 Cleaning up..."
docker image prune -f
echo "✅ Done!"
