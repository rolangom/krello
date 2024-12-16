import boto3
from botocore.exceptions import ClientError
import os


def get_client(env: str | None = None):
    if env == "local":
        return boto3.client(
            "dynamodb",
            endpoint_url="http://localhost:8000",  # Local DynamoDB endpoint
            region_name="local",
        )
    else:
        return boto3.client(
            "dynamodb",
            region_name=os.getenv("AWS_REGION"),
            aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
            aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
        )


def create_table(table_name: str, dynamodb):
    """
    Creates a DynamoDB table with the specified schema

    Parameters:
        table_name (str): The name of the table to create
    """

    try:
        response = dynamodb.create_table(
            TableName=table_name,
            KeySchema=[
                {
                    "AttributeName": "id",
                    "KeyType": "HASH",  # Partition key
                },
            ],
            AttributeDefinitions=[
                {
                    "AttributeName": "id",
                    "AttributeType": "S",  # String type for ID
                }
            ],
            ProvisionedThroughput={"ReadCapacityUnits": 1, "WriteCapacityUnits": 1},
        )

        # Wait until the table exists
        print(f"Creating table {table_name}...")
        dynamodb.get_waiter("table_exists").wait(TableName=table_name)
        print(f"Table {table_name} created successfully!")

        return response

    except ClientError as e:
        print(f"Error creating table: {e.response['Error']['Message']}")
        raise


def delete_table(table_name):
    dynamodb = get_client()

    try:
        dynamodb.delete_table(TableName=table_name)
        print(f"Table {table_name} deleted successfully!")
    except ClientError as e:
        print(f"Error deleting table: {e.response['Error']['Message']}")


if __name__ == "__main__":
    table_name = "cards"  # Replace with your desired table name
    create_table(table_name)
    # delete_table(table_name)
