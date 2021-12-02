.PHONY: build start logs login down

build:
	docker-compose build

down:
	docker-compose down

start:
	docker-compose up -d

logs:
	docker logs rentx -f

login:
	docker-compose exec app /bin/bash