import { useCards } from "../hooks/useCards";
import { Card as CardType } from "../types";

interface CardProps {
  card: CardType;
  openDialog: () => void;
}

const Card: React.FC<CardProps> = ({ card, openDialog }) => {
  const { deleteCard, deleteCardLoading } = useCards();
  function handleDeleteCard() {
    deleteCard(card.id)
  }

  function handleEditCard() {
    history.replaceState(card, '');
    openDialog();
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 cursor-move">
      <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
      <p className="text-gray-600 mb-2">{card.description}</p>
      <p className="text-sm text-gray-500">
        Created: {new Date(card.createdAt).toLocaleDateString()}
      </p>
      <div className="flex justify-end gap-2">
        <button className="bg-red-500 text-white p-2 rounded hover:bg-red-600" onClick={handleDeleteCard} disabled={deleteCardLoading}>
          {deleteCardLoading ? "Deleting..." : "Delete"}
        </button>
        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600" onClick={handleEditCard}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default Card;
