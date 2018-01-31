FROM node:8.9.0

# Global install yarn package manager
RUN apt-get update && apt-get install -y curl apt-transport-https && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

# Make a working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy Deps
COPY package.json yarn.lock /usr/src/app/

# Copy in the app
COPY /build /usr/src/app/

# Install Deps
RUN yarn install --production

# Expose Port
EXPOSE 3001

# Start server
CMD ["node", "bundle.js"]
