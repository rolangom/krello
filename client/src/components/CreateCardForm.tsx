import React from "react";
import { CardStatus, Card, STATUSES } from "../types";
import { useCards } from "../hooks/useCards";

interface Props {
  onClose: () => void;
  state: Partial<Card>;
}

const CreateCardForm: React.FC<Props> = ({ onClose, state }) => {
  const { createCard, updateCard, createCardLoading, updateCardLoading } = useCards();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const status = formData.get('status') as CardStatus;

    const operation = state.id
      ? () => updateCard(state.id!, title, description, status)
      : () => createCard(title, description, status);

    operation().then(() => {
      onClose();
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 bg-white p-6 rounded-lg shadow-md min-w-[400px]"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Create New Card</h2>
        <button onClick={onClose} className="text-black p-2">
          &times;
        </button>
      </div>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={state?.title}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={state?.description}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={state?.status || STATUSES.TODO}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={STATUSES.TODO}>To Do</option>
          <option value={STATUSES.IN_PROGRESS}>In Progress</option>
          <option value={STATUSES.DONE}>Done</option>
        </select>
      </div>
      <div className="flex flex-row space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-red-500 text-white p-2 rounded"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {createCardLoading || updateCardLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default CreateCardForm;
