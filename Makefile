pull_image:
	docker pull node:15.10.0
backend_build:
	docker build -t lambda:latest -f backend.Dockerfile .
backend_db:
	docker-compose -p lambda-backend up -d mongo
run_app:
	docker-compose -p lambda-backend up -d gamma