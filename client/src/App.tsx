import Board from "./components/Board";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-5xl sm:mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Kanban Board
        </h1>
        <Board />
      </div>
    </div>
  );
}

export default App;
