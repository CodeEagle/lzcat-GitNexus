FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache git

RUN git clone --depth 1 --branch v1.3.11 https://github.com/abhigyanpatwari/GitNexus.git /tmp/gitnexus

RUN mv /tmp/gitnexus/gitnexus-web /app

RUN npm install

RUN npm run build

FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 5173

ENV HOST=0.0.0.0
ENV PORT=5173

CMD ["serve", "-s", "dist", "-l", "5173", "--header", "Cross-Origin-Opener-Policy: same-origin", "--header", "Cross-Origin-Embedder-Policy: require-corp"]
