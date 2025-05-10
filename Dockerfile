##################################################################################
FROM --platform=$BUILDPLATFORM node:20-alpine AS todotrack-frontend-builder

# Install needed binaries
RUN apk add --no-cache git make bash

# Add the source code
COPY Makefile .
COPY webapp /webapp

RUN make clean-frontend frontend

##################################################################################
FROM --platform=$BUILDPLATFORM golang:1-bullseye AS todotrack-builder

# Install needed binaries
RUN apt-get update && apt-get install -y build-essential crossbuild-essential-armhf crossbuild-essential-armel crossbuild-essential-arm64 crossbuild-essential-i386

# Prepare the source location
RUN mkdir -p /go/src/github.com/root-gg/plik
WORKDIR /go/src/github.com/root-gg/plik

# Copy webapp build from previous stage
COPY --from=todotrack-frontend-builder /webapp/dist webapp/dist

ARG CLIENT_TARGETS=""
ENV CLIENT_TARGETS=$CLIENT_TARGETS

ARG TARGETOS TARGETARCH TARGETVARIANT CC
ENV TARGETOS=$TARGETOS
ENV TARGETARCH=$TARGETARCH
ENV TARGETVARIANT=$TARGETVARIANT
ENV CC=$CC

# Add the source code ( see .dockerignore )
COPY . .

RUN releaser/releaser.sh

##################################################################################
FROM scratch AS todotrack-release-archive

COPY --from=todotrack-builder --chown=1000:1000 /go/src/github.com/root-gg/plik/plik-*.tar.gz /

##################################################################################
FROM alpine:3.18 AS todotrack-image

RUN apk add --no-cache ca-certificates

# Create todotrack user
ENV USER=todotrack
ENV UID=1000

# See https://stackoverflow.com/a/55757473/12429735
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/home/todotrack" \
    --shell "/bin/false" \
    --uid "${UID}" \
    "${USER}"

COPY --from=todotrack-builder --chown=1000:1000 /go/src/github.com/root-gg/plik/release /home/todotrack/

EXPOSE 8080
USER todotrack
WORKDIR /home/todotrack/server
CMD ./plikd
