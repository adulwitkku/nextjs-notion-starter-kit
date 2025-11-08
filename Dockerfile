# syntax=docker.io/docker/dockerfile:1

# *** กำหนด ARG ก่อน builder stage ***
ARG REDIS_HOST
ARG REDIS_PASSWORD

FROM oven/bun as builder

# Install dependencies only when needed
WORKDIR /app

# ส่งต่อ environment variables สำหรับ build time
ENV REDIS_HOST=$REDIS_HOST
ENV REDIS_PASSWORD=$REDIS_PASSWORD

# คัดลอกไฟล์ package.json และ lockfile (ถ้ามี)
COPY package.json ./

# ติดตั้ง dependencies
RUN bun install --frozen-lockfile

# คัดลอกโค้ดทั้งหมดของโปรเจค
COPY . .

# สร้าง production build
RUN bun run build

# สร้าง production image
FROM oven/bun as runner

WORKDIR /app

# ตั้งค่าสภาพแวดล้อมเป็น production
ENV NODE_ENV=production

# คัดลอกไฟล์ที่จำเป็นจาก builder stage
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# เปิด port 3000
EXPOSE 3000

# รัน Next.js
CMD ["bun", "run", "start"]