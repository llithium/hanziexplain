FROM node:20.12.2-alpine3.18 as base

# All deps stage
FROM base as deps
WORKDIR /app
ADD package.json ./
RUN npm i

# Production only deps stage
FROM base as production-deps
WORKDIR /app
ADD package.json  ./
RUN npm i --omit=dev

# Build stage
FROM base as build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN node ace build

# Production stage
FROM base
ENV TZ=UTC
ENV PORT=8080
ENV HOST=0.0.0.0
ENV LOG_LEVEL=info
ENV APP_KEY=zKXHe-Ahdb7aPK1ylAJlRgTefktEaACi
ENV NODE_ENV=production
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app
EXPOSE 8080
CMD ["node", "./bin/server.js"]
