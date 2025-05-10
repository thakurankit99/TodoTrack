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
RUN apt-get update && apt-get install -y build-essential

# Prepare the source location
RUN mkdir -p /go/src/github.com/root-gg/plik
WORKDIR /go/src/github.com/root-gg/plik

# Copy webapp build from previous stage
COPY --from=todotrack-frontend-builder /webapp/dist webapp/dist

# Add the source code ( see .dockerignore )
COPY . .

# Build the server binary explicitly for linux/amd64
RUN mkdir -p release/server && \
    mkdir -p release/clients && \
    mkdir -p release/changelog && \
    mkdir -p release/webapp && \
    CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o release/server/plikd server/main.go && \
    # Verify the binary exists and is executable
    chmod +x release/server/plikd && \
    ls -la release/server/ && \
    cp server/plikd.cfg release/server/ && \
    cp -r webapp/dist release/webapp/ && \
    cp -r changelog release/ && \
    cp README.md release/ && \
    # Create directory for file storage
    mkdir -p release/server/files

##################################################################################
FROM alpine:3.18 AS todotrack-image

LABEL maintainer="ankitosm"
LABEL description="TodoTrack - Task management with secure file sharing"

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

# Copy files from builder
COPY --from=todotrack-builder --chown=1000:1000 /go/src/github.com/root-gg/plik/release /home/todotrack/

# Create necessary directories with proper permissions and verify files
RUN mkdir -p /home/todotrack/server/files && \
    chown -R todotrack:todotrack /home/todotrack && \
    ls -la /home/todotrack/server/ && \
    # Make sure the binary is executable
    chmod +x /home/todotrack/server/plikd

# Set the version information
ENV PLIK_VERSION="TodoTrack-1.0"

# Expose default port
EXPOSE 8080

# Switch to non-root user
USER todotrack
WORKDIR /home/todotrack/server

# Run the server
CMD ["./plikd"]
