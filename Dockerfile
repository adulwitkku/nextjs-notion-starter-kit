# syntax=docker.io/docker/dockerfile:1

FROM oven/bun AS builder

WORKDIR /app

# ARG ก่อน FROM ใช้กับคำสั่ง FROM ได้เท่านั้น ต้องประกาศซ้ำใน stage นี้
# ถึงจะรับค่า --build-arg จาก Coolify ได้ตอน bun run build
ARG REDIS_HOST
ARG REDIS_PASSWORD
ENV REDIS_HOST=$REDIS_HOST
ENV REDIS_PASSWORD=$REDIS_PASSWORD

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

FROM oven/bun AS runner

WORKDIR /app

ENV NODE_ENV=production

ARG REDIS_HOST
ARG REDIS_PASSWORD
ENV REDIS_HOST=$REDIS_HOST
ENV REDIS_PASSWORD=$REDIS_PASSWORD

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["bun", "run", "start"]
