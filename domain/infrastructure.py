from typing import List, Optional
import boto3
from botocore.exceptions import ClientError
from domain.models import Card
from domain.repository import CardRepository


class DynamoDBCardRepository(CardRepository):
    """DynamoDB implementation of Card repository"""

    def __init__(self, dynamodb_client=None):
        self.table_name = "cards"
        self.dynamodb = dynamodb_client or boto3.client(
            "dynamodb",
            endpoint_url="http://localhost:8000",
            region_name="local",
            aws_access_key_id="fakeMyKeyId",
            aws_secret_access_key="fakeSecretAccessKey",
        )

    def create(self, card: Card) -> Card:
        try:
            self.dynamodb.put_item(
                TableName=self.table_name, Item=card.to_dynamodb_item()
            )
            return card
        except ClientError as e:
            raise ValueError(f"Failed to create card: {str(e)}")

    def get(self, id: str) -> Optional[Card]:
        try:
            response = self.dynamodb.get_item(
                TableName=self.table_name, Key={"id": {"S": id}}
            )
            item = response.get("Item")
            return Card.from_dynamodb_item(item) if item else None
        except ClientError as e:
            raise ValueError(f"Failed to get card: {str(e)}")

    def update(self, card: Card) -> Card:
        try:
            # Check if card exists
            if not self.get(card.id):
                raise ValueError(f"Card with id {card.id} not found")

            self.dynamodb.put_item(
                TableName=self.table_name, Item=card.to_dynamodb_item()
            )
            return card
        except ClientError as e:
            raise ValueError(f"Failed to update card: {str(e)}")

    def delete(self, id: str) -> None:
        try:
            # Check if card exists
            if not self.get(id):
                raise ValueError(f"Card with id {id} not found")

            self.dynamodb.delete_item(TableName=self.table_name, Key={"id": {"S": id}})
        except ClientError as e:
            raise ValueError(f"Failed to delete card: {str(e)}")

    def list_all(self) -> List[Card]:
        try:
            response = self.dynamodb.scan(TableName=self.table_name)
            return [Card.from_dynamodb_item(item) for item in response.get("Items", [])]
        except ClientError as e:
            raise ValueError(f"Failed to list cards: {str(e)}")

    def list_by_status(self, status: str) -> List[Card]:
        try:
            response = self.dynamodb.scan(
                TableName=self.table_name,
                FilterExpression="#status = :status",
                ExpressionAttributeNames={"#status": "status"},
                ExpressionAttributeValues={":status": {"S": status}},
            )
            return [Card.from_dynamodb_item(item) for item in response.get("Items", [])]
        except ClientError as e:
            raise ValueError(f"Failed to list cards by status: {str(e)}")

    def get_key_schema(self):
        response = self.dynamodb.describe_table(TableName=self.table_name)
        return response["Table"]["KeySchema"]
