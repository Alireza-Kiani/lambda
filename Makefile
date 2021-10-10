pull_image:
	docker pull node:15.10.0
backend_build:
	docker build -t lambda:latest -f backend.Dockerfile .
backend_db:
	docker-compose -p lambda-backend up -d mongo
backend_user_build:
	docker build --build-arg SERVICE=user -t lambda-user:latest -f backend.Dockerfile .
backend_auth_build:
	docker build --build-arg SERVICE=auth -t lambda-auth:latest -f backend.Dockerfile .

backend_auth_app:
	docker-compose -p lambda-backend up -d auth
backend_user_app:
	docker-compose -p lambda-backend up -d user

run_app:
	docker-compose -p lambda-backend up -d gamma


bootstrap:
	make backend_db backend_user_build backend_auth_build backend_auth_app backend_user_app
bootstrap_mono:
	make backend_db backend_build run_app