import React, { useState } from 'react';
import ResumePrompt from './ResumePrompt';
import JobDescriptionAnalyzer from './JobDescriptionAnalyzer';
import ResumePDF from './ResumePDF';
import { ResumeData } from '../../types/resume';

const ResumeEditor: React.FC = () => {
  const [showJobAnalyzer, setShowJobAnalyzer] = useState(false);
  const [activeTab, setActiveTab] = useState('prompt');
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleResumeGenerated = (resume: ResumeData) => {
    setResumeData(resume);
    setShowPreview(true);
  };

  const handleOptimizeContent = (content: string) => {
    setShowJobAnalyzer(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Resume Builder</h1>
        <div className="space-x-2">
          <button
            onClick={() => setShowJobAnalyzer(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Add Job Description
          </button>
          {resumeData && (
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
          )}
        </div>
      </div>

      {showJobAnalyzer && (
        <div className="mb-6">
          <JobDescriptionAnalyzer onOptimize={handleOptimizeContent} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex space-x-4 border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('prompt')}
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'prompt'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Create Resume
            </button>
            {resumeData && (
              <button
                onClick={() => setActiveTab('edit')}
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === 'edit'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Edit Resume
              </button>
            )}
          </div>

          {activeTab === 'prompt' && (
            <ResumePrompt onResumeGenerated={handleResumeGenerated} />
          )}

          {activeTab === 'edit' && resumeData && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Resume</h2>
              {/* Add resume editing form here */}
              <p className="text-gray-600">Resume editing functionality coming soon...</p>
            </div>
          )}
        </div>

        {showPreview && resumeData && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Resume Preview</h2>
            <div className="h-[800px]">
              <ResumePDF data={resumeData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeEditor; 