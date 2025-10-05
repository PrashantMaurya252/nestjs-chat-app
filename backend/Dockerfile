# Stage 1: Build
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20
WORKDIR /app
COPY --from=builder /app ./
ENV PORT=5000
EXPOSE 5000
CMD ["npm", "run", "start:prod"]
