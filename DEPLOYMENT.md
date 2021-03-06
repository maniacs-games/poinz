
PoinZ is currently deployed on a free-tier EC2 instance for testing purposes.

A more suitable deployment might be needed in the future.

### Amazon EC2 deployment

I did setup a free-tier ubuntu EC2 instance and installed docker

- connect to the EC2 instance via ssh (user is "ubuntu", not "ec2-user" !)
- install docker `curl -fsSL https://get.docker.com/ | sh`
- add user *ubuntu* to *docker* group `sudo gpasswd -a ubuntu docker`
- port forwarding (see below)
- redis container (see below)

3. push new version to upstream github repo (zuehlke)

4. checkout new version of *master* branch on EC2 instance (/home/ubuntu/git/poinz)

5. build docker image `npm run build` (our image is not pushed to a repo, so we build on the EC2 instance for now)

6. Start container `docker run --name poinz --link redis:db -p 8080:3000 -d xeronimus/poinz`.

#### Cheat Sheet

- `docker images` List all docker images
- `docker ps -a` List all docker containers
- `docker exec -it poinz /bin/bash` Open an interactive shell in our poinz container 

## Redis

Our roomsStore uses redis as persistent storage.
In order for it to work, there must be a redis server running, where our store can connect to.

One solution is to run redis also within docker (in a separate container).

`docker run -d --name redis -p 6379:6379 redis` (https://hub.docker.com/_/redis/)

### port forwarding:

(see also https://gist.github.com/kentbrew/776580)

list routing chains in iptable
`sudo iptables -t nat -L`

remove routing from iptable
`sudo iptables -t nat -D PREROUTING 1`

add correct forward from 80 to 8080
`sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8080`
