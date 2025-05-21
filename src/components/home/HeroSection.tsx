import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 animate-fade-in">
      <div className="max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Welcome, <span className="text-primary-600">Ansh!</span>
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Let's build your future, one step at a time.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-primary-50 rounded-xl p-6 border border-primary-100 transition-transform hover:shadow-md hover:-translate-y-1">
            <div className="text-lg font-medium mb-2 flex items-center">
              <span className="text-2xl mr-2">🎓</span>
              Today's Progress
            </div>
            <p className="text-gray-600 text-sm">
              You've completed 2 assignments and had 1 counselling session.
            </p>
          </div>
          <div className="bg-secondary-50 rounded-xl p-6 border border-secondary-100 transition-transform hover:shadow-md hover:-translate-y-1">
            <div className="text-lg font-medium mb-2 flex items-center">
              <span className="text-2xl mr-2">📅</span>
              Upcoming
            </div>
            <p className="text-gray-600 text-sm">
              Career assessment due in 3 days, counselling session tomorrow.
            </p>
          </div>
          <div className="bg-accent-50 rounded-xl p-6 border border-accent-100 transition-transform hover:shadow-md hover:-translate-y-1">
            <div className="text-lg font-medium mb-2 flex items-center">
              <span className="text-2xl mr-2">🚀</span>
              Goal Progress
            </div>
            <p className="text-gray-600 text-sm">
              You're 65% of the way to your "Web Development" roadmap goal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;