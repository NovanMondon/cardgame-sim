FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
     ca-certificates curl git bash sudo \
 && rm -rf /var/lib/apt/lists/*

# Install Node.js 24.x from NodeSource (Ubuntu's default nodejs is usually outdated)
RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
 && apt-get update \
 && apt-get install -y --no-install-recommends nodejs \
 && node --version \
 && npm --version \
 && rm -rf /var/lib/apt/lists/*

# Remove default ubuntu user if it exists with GID 1000
RUN userdel -r ubuntu 2>/dev/null || true

# add vscode user (UID/GID 1000)
RUN groupadd -g 1000 vscode \
 && useradd -m -u 1000 -g 1000 -s /bin/bash vscode \
 && echo "vscode ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/vscode \
 && chmod 0440 /etc/sudoers.d/vscode

USER vscode

# entrypoint
CMD ["bash"]
