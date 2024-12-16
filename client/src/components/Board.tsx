import React, { useMemo, useState } from "react";
import {
  Card,
  CardStatus,
  STATUSES,
  statusesLabels,
} from "../types";
import Column from "./Column";
import CreateCardForm from "./CreateCardForm";
import { useCards } from "../hooks/useCards";
import Skeleton from "./skeleton";

interface BoardProps {
  status: CardStatus;
  openDialog: (state: Partial<Card>) => void;
}

const Board: React.FC<BoardProps> = ({ status, openDialog }) => {
  const { cards } = useCards();
  const cardsFiltered = useMemo(
    () => cards.filter((card) => card.status === status),
    [cards, status]
  );
  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md w-80">
      <h2 className="text-lg font-semibold mb-4">{statusesLabels[status]}</h2>
      <Column
        key={status}
        status={status}
        cards={cardsFiltered}
        openDialog={openDialog}
      />
    </div>
  );
};

function Boards() {
  const { loading } = useCards();
  const [cardState, setCardState] = useState<Partial<Card>|undefined>(undefined);

  const handleNewItem = () => {
    setCardState({});
  };

  const closeDialog = () => {
    setCardState(undefined);
  };

  if (loading) return <Skeleton />;

  return (
    <>
      {cardState && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <CreateCardForm state={cardState} onClose={closeDialog} />
        </div>
      )}
      <div className="flex flex-col space-y-4">
        <div className="flex justify-end">
          <button
            onClick={handleNewItem}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Item
          </button>
        </div>
        <div className="flex flex-row space-x-4 overflow-x-auto pb-4">
          {Object.values(STATUSES).map((status) => (
            <Board key={status} status={status} openDialog={setCardState} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Boards;
