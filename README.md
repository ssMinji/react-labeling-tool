This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# JEJU 감귤병해충 방제 서비스

## About

- 농민: 감귤 이미지를 업로드/1차 분류한다. 부위, 질병을 선택해야하며, 질문을 등록할 수 있다. 
- 전문가: 농민이 업로드한 이미지를 2차 분류(검증)한다. 등록된 질문에 답변을 할 수 있다. 

## Features

- Authentication(Login/ Register/ Logout)
- Upload
- Label
- Verify
- Verified

## Prerequisites

MySql and NodeJS should be installed

```
npm install -g webpack babel nodemon cross-env
npm install
```

## Scripts

- `npm run development` Start server in development environment
- `npm run build` Builds Server and Client
- `npm run start` Start server in production environment

Express server runs on port 3001, and development server runs on port 4000.

## Possible ERROR 

```Shell
ERROR: MySQL 8.0 - Client does not support authentication protocol requested by server; consider upgrading MySQL client
```

DO BELOW COMMEND IN MYSQL SERVER

```SQL
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
flush privileges;
```