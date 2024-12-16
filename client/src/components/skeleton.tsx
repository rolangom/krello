
function Skeleton() {
  return <div className="flex space-x-4 overflow-x-auto pb-4">
    <div className="bg-gray-200 p-4 rounded-lg shadow-md w-80 min-h-[500px]">
      <h3 className="text-lg font-semibold mb-4 text-center text-gray-500 animate-pulse">Loading...</h3>
    </div>
  </div>;
}

export default Skeleton;