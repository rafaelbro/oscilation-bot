FROM node:18.0.0-buster-slim

WORKDIR /build
COPY . /build

RUN apt update \
  && apt install -y --no-install-recommends \
  ca-certificates \
  && npm i --force

RUN chmod +x ./scripts/startupScript.sh

ENTRYPOINT ["./scripts/startupScript.sh" ]