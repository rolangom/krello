import { DragState } from "@formkit/drag-and-drop";
import type { Card as CardType, CardStatus } from "../types";
import Card from "./Card";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { useCards } from "../hooks/useCards";
import { useEffect } from "react";

interface ColumnProps {
  status: CardStatus;
  cards: CardType[];
  openDialog: () => void;
}

const Column: React.FC<ColumnProps> = ({ status, cards, openDialog }) => {
  const { updateCardStatus } = useCards();
  const [parentRef, items, setItems] = useDragAndDrop<HTMLElement, CardType>(
    cards,
    {
      handleEnd: (state: DragState<CardType>) => {
        const id = state!.activeState!.node.data.value.id;
        updateCardStatus(id, status);
      },
      sortable: false,
      group: "kabanColumn",
    }
  );
  useEffect(() => {
    setItems(cards);
  }, [cards]);
  return (
    // @ts-ignore
    <div ref={parentRef} className="flex flex-col space-y-4 min-h-[500px]">
      {items.map((card) => (
        <Card key={card.id + card.updatedAt} card={card} openDialog={openDialog} />
      ))}
    </div>
  );
};

export default Column;
