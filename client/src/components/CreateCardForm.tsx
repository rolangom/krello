import React, { useState } from "react";
import { CardStatus, Card, STATUSES } from "../types";
import { useCards } from "../hooks/useCards";

const CreateCardForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const state = history.state as Card | undefined;
  const [title, setTitle] = useState(state?.title || "");
  const [description, setDescription] = useState(state?.description || "");
  const [status, setStatus] = useState<CardStatus>(state?.status || STATUSES.TODO);
  const { createCard, updateCard } = useCards();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state) {
      updateCard(state.id, title, description, status);
    } else {
      createCard(title, description, status);
    }
    setTitle("");
    setDescription("");
    setStatus(STATUSES.TODO);
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 bg-white p-6 rounded-lg shadow-md min-w-[400px]"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Create New Card</h2>
        <button onClick={onClose} className=" text-black p-2">
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          value={status}
          onChange={(e) => setStatus(e.target.value as CardStatus)}
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
          className=" bg-red-500 text-white p-2 rounded"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default CreateCardForm;
