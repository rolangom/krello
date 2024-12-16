# Kanban like app using FastAPI (python), GraphQL, DynamoDB, and React

## Description

This is a simple kanban like app using FastAPI (python), Graphene (GraphQL), AWS DynamoDB, React and Apollo client.

## Setup

```bash
pip install -r requirements.txt
```

## Build

```bash
npm run build
```

## Start local DynamoDB

```bash
docker run -p 8000:8000 amazon/dynamodb-local:latest
```

## Run

```bash
uvicorn fastapi_app:app --reload
```

