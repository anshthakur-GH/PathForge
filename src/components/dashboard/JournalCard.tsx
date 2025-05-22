interface JournalCardProps {
  onOpen: () => void;
}

const JournalCard = ({ onOpen }: JournalCardProps) => {
  return (
    <div
      onClick={onOpen}
      className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg flex flex-col h-full"
    >
      <div className="flex-1 space-y-4">
        {/* Icon and Title */}
        <div className="flex items-center gap-3">
          <span className="text-3xl" role="img" aria-label="journal">
            📖
          </span>
          <h2 className="text-xl font-semibold text-gray-800">My Journal</h2>
        </div>

        {/* Description */}
        <p className="text-gray-600">
          Document your learning journey, reflect on your progress, and capture your thoughts in this digital journal.
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
        Open Journal
      </button>
    </div>
  );
};

export default JournalCard; 