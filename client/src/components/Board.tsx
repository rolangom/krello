import React, { useMemo, useState } from "react";
import {
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
  openDialog: () => void;
}

const Board: React.FC<BoardProps> = ({ status, openDialog }) => {
  const { cards } = useCards();
  const cardsFiltered = useMemo(
    () => cards.filter((card) => card.status === status),
    [cards, status]
  );
  console.log("Board cards", status, cardsFiltered);
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    history.replaceState(undefined, "");
  };

  if (loading) return <Skeleton />;

  return (
    <>
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <CreateCardForm onClose={closeDialog} />
        </div>
      )}
      <div className="flex flex-col space-y-4">
        <div className="flex justify-end">
          <button
            onClick={openDialog}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Item
          </button>
        </div>
        <div className="flex flex-row space-x-4 overflow-x-auto pb-4">
          {Object.values(STATUSES).map((status) => (
            <Board key={status} status={status} openDialog={openDialog} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Boards;
