# Stage 1: Build React client
FROM node:18 AS frontend

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY client/package*.json ./client/

# Set working directory to client and install dependencies
WORKDIR /app/client
RUN npm install

# Copy the rest of the client code
COPY client/ ./

# Build the client
RUN npm run build

# Stage 2: Set up FastAPI
FROM python:3.11

# Set the working directory for FastAPI
WORKDIR /app

# Copy requirements first to leverage Docker cache
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the FastAPI app code
COPY . .

# Copy the built client from the previous stage
COPY --from=frontend /app/client/dist ./client/dist


# Expose the port for FastAPI
EXPOSE 8080

# Set the entrypoint to run the FastAPI app
ENTRYPOINT ["uvicorn", "fastapi_app:app", "--host", "0.0.0.0", "--port", "8080", "--reload"]
