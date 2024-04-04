set -e
docker build . -t squid-processor
# make sure the port matches .env. 
# For Linux, add --add-host=host.docker.internal:host-gateway
docker run --rm -e DB_HOST=host.docker.internal --env-file=.env -p 4350:4350 squid-processor
