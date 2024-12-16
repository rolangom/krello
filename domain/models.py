from dataclasses import dataclass, field
from datetime import datetime
import uuid
from enum import Enum


class CardStatus(Enum):
    TODO = "TODO"
    IN_PROGRESS = "IN_PROGRESS"
    DONE = "DONE"


@dataclass
class Card:
    title: str
    description: str
    status: str
    id: str = field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = field(default_factory=lambda: datetime.now().isoformat())
    updated_at: str = field(default_factory=lambda: datetime.now().isoformat())

    def to_dynamodb_item(self) -> dict:
        """Convert the card to DynamoDB item format"""
        return {
            "id": {"S": self.id},
            "created_at": {"S": self.created_at},
            "updated_at": {"S": self.updated_at},
            "title": {"S": self.title},
            "description": {"S": self.description},
            "status": {"S": self.status},
        }

    @classmethod
    def from_dynamodb_item(cls, item: dict) -> "Card":
        """Create a Card instance from a DynamoDB item"""
        return cls(
            id=item["id"]["S"],
            created_at=item["created_at"]["S"],
            updated_at=item["updated_at"]["S"],
            title=item["title"]["S"],
            description=item["description"]["S"],
            status=item["status"]["S"],
        )
