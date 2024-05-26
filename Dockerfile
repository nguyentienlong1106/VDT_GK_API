FROM node:latest AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:latest
WORKDIR /app

COPY --from=builder /app .

EXPOSE 8000

CMD ["npm", "start"]