## step 1 : login to docker
docker login -u be1newinner
***then insert your personal access token generated from docker website***

## step 2 : build docker image
docker build -t be1newinner/mptravels-backend:1.3.0 .

## step 3 : verify
docker images

## step 4 : push
docker push be1newinner/mptravels-backend:1.3.0

## step 5 : run
docker run -p 3000:3000 mptravels-backend


## then in server

### step 1. stop the previous container and remove it
docker stop mptravels-backend
docker rm mptravels-backend

### step 2. pull the latest changes
docker pull be1newinner/mptravels-backend:1.3.0

### step 3. run the container
docker run -d --name mptravels-backend -p 5001:5001 --env-file .env be1newinner/mptravels-backend:1.3.0 

### step 4. verify the containers
docker ps or docker ps --all

### step 5. for checking the logs
docker logs -f mptravels-backend
