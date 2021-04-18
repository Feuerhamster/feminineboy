# Build stage
FROM node:lts-alpine AS builder

RUN mkdir /app
WORKDIR /app

# copy configs folder
COPY package*.json ./
COPY tsconfig.json ./
# copy source code to /app/src folder
COPY src src

# install dependencies (https://docs.npmjs.com/cli/v7/commands/npm-ci)
RUN npm ci

# build
RUN npm run build

# Production stage
FROM node:lts-alpine
ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY . /app/
COPY --from=builder /app/dist dist

# install production dependencies
RUN npm install

CMD ["npm", "start"]