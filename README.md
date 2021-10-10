## Lambda
A simple, minimalistic backend application for user management. Built upon Node.js, gRPC, Mongodb. Written in TypeScript.

#### Currenty Deployed On **Heroku** Via GitHub Actions
[Heroku Link](https://lambda-01.herokuapp.com/api)
#### Ready To Get Deployed On Private Server Via GitLab CI/CD (Config is available)

#### API Documentation And Examples Are Shipped Via Postman Collection
[Collection](https://situla.bitbit.net/filebin/9e0bcebdae7dd75a52ef4137bd209c1bb4b0bf9968af276dae12f3463c3c3cbb/edf926403bd702040a9e9edaf461e1a90cac548f857c48cc23704e1a8737d06f?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=HZXB1J7T0UN34UN512IW%2F20211010%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211010T181514Z&X-Amz-Expires=30&X-Amz-SignedHeaders=host&response-cache-control=max-age%3D30&response-content-disposition=filename%3D%22Lambda__Alibaba_Node.js_Coding_Challenge_.postman_collection.json%22&response-content-type=application%2Fjson&X-Amz-Signature=e038a4fa57df419b491798ea7a446bd8205027e688e6b8be7a77028522a75153)

[Enviroment](https://situla.bitbit.net/filebin/9e0bcebdae7dd75a52ef4137bd209c1bb4b0bf9968af276dae12f3463c3c3cbb/0785346116c4ad87815897a0613c398bc4a53c9dd08690d1d771a92b3f24d4ec?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=HZXB1J7T0UN34UN512IW%2F20211010%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211010T181623Z&X-Amz-Expires=30&X-Amz-SignedHeaders=host&response-cache-control=max-age%3D30&response-content-disposition=filename%3D%22Lambda.postman_environment.json%22&response-content-type=application%2Fjson&X-Amz-Signature=cdf6408a93bac5abd3aa6e4f073c573d73fc695fb6e93dbd18c59e72e704af3f)

## Startup Instructions
- For launching application without docker (Non-separated):
```
    ...clone the repo
    npm i
    npm start
```
- Docker (Non-separated):
```
    make bootstrap_mono
```
- Docker (microservice - runs authentication and user service in a separate container with their own web and gRPC backend):
```
    make bootstrap
```
Environment Variables (Sample): 
```
HTTP_SERVER_PORT=3000
API_VERSION=1

MONGO_PREFIX=mongodb
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_USER=admin
MONGO_PASSWORD=admin
MONGO_DB_NAME=lambda
MONGO_DB_AUTH=admin

FIRST_ADMIN_PASSWORD=Admin@123

GRPC_SERVER_PORT=50050

USER_SERVICE_GRPC_HOST=127.0.0.1:50050
AUTH_SERVICE_GRPC_HOST=127.0.0.1:50050
```