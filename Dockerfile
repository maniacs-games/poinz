# PoinZ docker file

# For the followin commands, we expect that your user is part of the "docker" usergroup
# (then you can run the docker command without "sudo")

# use the following command to build
# docker build -t xeronimus/poinz .

# start the container with interactive shell
# docker run -i -t xeronimus/poinz /bin/bash

# start the container locally in detached mode
# docker run -p 3000:3000 -d xeronimus/poinz

FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/poinz/public
RUN mkdir -p /usr/src/poinz/src
WORKDIR /usr/src/poinz

# Bundle app source
COPY deploy/public /usr/src/poinz/public
COPY deploy/src /usr/src/poinz/src
COPY deploy/package.json /usr/src/poinz/

# install app dependencies
RUN npm install --production

# expose port 3000
EXPOSE 3000


CMD [ "npm", "start" ]
