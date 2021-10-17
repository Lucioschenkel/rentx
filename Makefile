build:
	sudo docker-compose build

start:
	sudo docker-compose up -d

logs:
	sudo docker logs rentalx -f

login:
	sudo docker-compose exec app /bin/bash