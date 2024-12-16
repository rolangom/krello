# Start Generation Here
FROM node:14 AS build

# Set the working directory
WORKDIR /app/client

# Copy package.json and package-lock.json
COPY client/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client code
COPY client/ ./

# Build the client
RUN npm run build

# Optional: Verify build
RUN ls -la /app/client/dist

# Stage 2: Set up FastAPI
FROM python:3.11

# Set the working directory for FastAPI
WORKDIR /app

# Copy the FastAPI app code
COPY . ./

# Install FastAPI and other dependencies
RUN pip install -r requirements.txt

# Copy the built client from the previous stage
COPY --from=build /app/client/dist ./client/dist

# Expose the port for FastAPI
EXPOSE 8080

# Command to run the FastAPI app
CMD ["uvicorn", "fastapi_app:app", "--host", "0.0.0.0", "--port", "8080", "--reload"]
# End Generation Here