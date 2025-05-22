import { useState, useEffect } from 'react';

interface JournalEntry {
  id: string;
  content: string;
  date: string;
}

interface JournalModalProps {
  onClose: () => void;
}

const JournalModal = ({ onClose }: JournalModalProps) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  // Load entries from localStorage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('pathforge_journal');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pathforge_journal', JSON.stringify(entries));
  }, [entries]);

  const saveEntry = () => {
    if (!currentEntry.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      content: currentEntry.trim(),
      date: new Date().toLocaleString(),
    };

    setEntries([newEntry, ...entries]);
    setCurrentEntry('');
  };

  const nextPage = () => {
    if (currentPage < entries.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#f4ecd8] rounded-lg shadow-2xl w-full max-w-4xl min-h-[600px] flex flex-col">
        {/* Header with close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white text-xl shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
            aria-label="Close Journal Modal"
          >
            ✖
          </button>
        </div>

        {/* Book Content */}
        <div className="flex-1 flex">
          {/* Left Page - Writing Area */}
          <div className="flex-1 p-8 border-r border-[#e5d5b7]">
            <div className="h-full flex flex-col">
              <h2 className="text-2xl font-serif mb-4 text-gray-800">New Entry</h2>
              <textarea
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
                placeholder="Write your thoughts here..."
                className="flex-1 p-4 bg-transparent border-b border-gray-400 focus:outline-none focus:border-gray-600 font-serif text-gray-800 resize-none"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(transparent, transparent 31px, #666 31px, #666 32px)',
                  lineHeight: '32px',
                  padding: '8px 10px',
                }}
              />
              <button
                onClick={saveEntry}
                className="mt-4 px-6 py-2 bg-[#8b4513] text-white rounded hover:bg-[#723a0f] transition-colors self-end font-serif"
              >
                Save Entry
              </button>
            </div>
          </div>

          {/* Right Page - Previous Entries */}
          <div className="flex-1 p-8 relative">
            <div className="h-full flex flex-col">
              <h2 className="text-2xl font-serif mb-4 text-gray-800">
                Previous Entries
              </h2>
              
              {entries.length > 0 ? (
                <>
                  <div className="flex-1 overflow-y-auto font-serif text-gray-800">
                    <div className="mb-2 text-sm text-gray-600">
                      {entries[currentPage]?.date}
                    </div>
                    <div className="whitespace-pre-wrap">
                      {entries[currentPage]?.content}
                    </div>
                  </div>
                  
                  {/* Navigation */}
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={previousPage}
                      disabled={currentPage === 0}
                      className={`px-4 py-2 ${
                        currentPage === 0
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-800 hover:text-gray-600'
                      }`}
                    >
                      ← Previous
                    </button>
                    <span className="text-gray-600">
                      Page {currentPage + 1} of {entries.length}
                    </span>
                    <button
                      onClick={nextPage}
                      disabled={currentPage >= entries.length - 1}
                      className={`px-4 py-2 ${
                        currentPage >= entries.length - 1
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-800 hover:text-gray-600'
                      }`}
                    >
                      Next →
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500 font-serif">
                  No entries yet. Start writing on the left page!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalModal; 