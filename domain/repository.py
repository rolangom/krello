from abc import ABC, abstractmethod
from typing import List, Optional
from domain.models import Card  # Assuming Card is in domain.py


class CardRepository(ABC):
    """Abstract base class for Card repository implementations"""

    @abstractmethod
    def create(self, card: Card) -> Card:
        """
        Create a new card

        Args:
            card: Card instance to create

        Returns:
            Created card instance
        """
        pass

    @abstractmethod
    def get(self, id: str) -> Optional[Card]:
        """
        Retrieve a card by its ID

        Args:
            id: Card ID to retrieve

        Returns:
            Card if found, None otherwise
        """
        pass

    @abstractmethod
    def update(self, card: Card) -> Card:
        """
        Update an existing card

        Args:
            card: Card instance with updated values

        Returns:
            Updated card instance

        Raises:
            ValueError: If card doesn't exist
        """
        pass

    @abstractmethod
    def delete(self, id: str) -> None:
        """
        Delete a card by its ID

        Args:
            id: Card ID to delete

        Raises:
            ValueError: If card doesn't exist
        """
        pass

    @abstractmethod
    def list_all(self) -> List[Card]:
        """
        Retrieve all cards

        Returns:
            List of all cards
        """
        pass

    @abstractmethod
    def list_by_status(self, status: str) -> List[Card]:
        """
        Retrieve all cards with a specific status

        Args:
            status: Status to filter by

        Returns:
            List of cards with the specified status
        """
        pass
