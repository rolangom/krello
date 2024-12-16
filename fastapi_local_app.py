from dotenv import load_dotenv

load_dotenv()

from fastapi_app import app

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8080)
