
# aqui estamos pegando um imagem maior e dando um apelido a ela de base, e instalando o pnpm nela
FROM node:24.15.0 AS base

RUN npm i -g pnpm

FROM base AS dependencies

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

#  para etapa de biuld todas elas olhando para a nossa base
FROM base AS build
# vamos precisar novamente delcara o diretorio de trabalho
WORKDIR /usr/src/app

COPY . .
# aqui vamos copiar a node modules do depencies para o nosso from de biuld.
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

RUN pnpm build
RUN pnpm prune --prod

# aqui usamos uma imagem menor 
FROM node:24.15.0-alpine3.23 AS deploy

USER 1000

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json

EXPOSE 3333

CMD ["node", "dist/infra/http/server.js"]