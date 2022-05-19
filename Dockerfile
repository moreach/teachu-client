FROM node:lts-alpine3.14 as teachu-build

ARG ngConfig="development"

COPY . /var/local/teachu-client/
WORKDIR /var/local/teachu-client/

RUN npm install
RUN npm run build -- --configuration=$ngConfig

FROM nginx:stable

COPY --from=teachu-build /var/local/teachu-client/dist/teachu /usr/share/nginx/html

EXPOSE 80
EXPOSE 443