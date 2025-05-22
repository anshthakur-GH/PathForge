interface TodoCardProps {
  onOpen: () => void;
}

const TodoCard = ({ onOpen }: TodoCardProps) => {
  return (
    <div
      onClick={onOpen}
      className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg flex flex-col h-full"
    >
      <div className="flex-1 space-y-4">
        {/* Icon and Title */}
        <div className="flex items-center gap-3">
          <span className="text-3xl" role="img" aria-label="todo list">
            📋
          </span>
          <h2 className="text-xl font-semibold text-gray-800">My Tasks</h2>
        </div>

        {/* Description */}
        <p className="text-gray-600">
          Keep track of your daily tasks and assignments. Stay organized and never miss a deadline.
        </p>
      </div>
      {/* View Button */}
      <button
        className="w-full mt-6 px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
      >
        View Tasks
      </button>
    </div>
  );
};

export default TodoCard; 