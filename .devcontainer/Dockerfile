FROM alpine:3.19

RUN apk add --no-cache \
    curl git ca-certificates bash sudo \
    nodejs npm

# add vscode user
RUN addgroup -g 1000 -S vscode \
 && adduser -u 1000 -S -G vscode -s /bin/sh vscode

USER vscode

#entrypoint
CMD ["bash"]
