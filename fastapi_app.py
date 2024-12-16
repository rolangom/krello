from fastapi import FastAPI
from fastapi.responses import HTMLResponse, FileResponse, JSONResponse
from starlette_graphene3 import GraphQLApp, make_graphiql_handler
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from my_graphql.schema import schema
from domain.infrastructure import DynamoDBCardRepository
from dynamodb_ops import get_client

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


repo = DynamoDBCardRepository(get_client())


# Add the GraphQL endpoint
app.add_route(
    "/graphql",
    GraphQLApp(
        schema=schema, on_get=make_graphiql_handler(), context_value={"repo": repo}
    ),
)


# Serve the React app
@app.get("/", response_class=HTMLResponse)
async def serve_react_app():
    return FileResponse("client/dist/index.html")


# Enable serving of static files from the client/dist directory
app.mount("/", StaticFiles(directory="client/dist"), name="static")


@app.exception_handler(404)
async def resource_not_found(request, exc):
    return JSONResponse(status_code=404, content={"error": "Not found!"})
