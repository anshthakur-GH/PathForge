import React from 'react';
import StudentProfile from '../components/dashboard/StudentProfile';
import TodoCard from '../components/dashboard/TodoCard';
import JournalCard from '../components/dashboard/JournalCard';
import TodoModal from '../components/modals/TodoModal';
import JournalModal from '../components/modals/JournalModal';

const StudentDashboard = () => {
  const [isTodoModalOpen, setIsTodoModalOpen] = React.useState(false);
  const [isJournalModalOpen, setIsJournalModalOpen] = React.useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Section */}
      <StudentProfile />

      {/* Cards Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <TodoCard onOpen={() => setIsTodoModalOpen(true)} />
        <JournalCard onOpen={() => setIsJournalModalOpen(true)} />
      </div>

      {/* Modals */}
      {isTodoModalOpen && <TodoModal onClose={() => setIsTodoModalOpen(false)} />}
      {isJournalModalOpen && <JournalModal onClose={() => setIsJournalModalOpen(false)} />}
    </div>
  );
};

export default StudentDashboard; 