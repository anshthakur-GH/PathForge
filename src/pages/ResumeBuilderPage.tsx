import React from 'react';
import ResumeEditor from '../components/resume/ResumeEditor';

const ResumeBuilderPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
          <p className="mt-2 text-lg text-gray-600">
            Create a professional resume that stands out
          </p>
        </div>
        <ResumeEditor />
      </div>
    </div>
  );
};

export default ResumeBuilderPage; 