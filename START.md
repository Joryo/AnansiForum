pnpm install

add .env file in api folder:
DATABASE_URL="file:./database.db"
ENV="local"
in apps/api: npx prisma generate

pnpm dev


Docker:
docker-compose build
docker-compose up -d
