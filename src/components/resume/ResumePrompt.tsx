import React, { useState } from 'react';
import { generateResumeFromPrompt } from '../../services/resumeGenerator';
import { ResumeData } from '../../types/resume';

interface ResumePromptProps {
  onResumeGenerated: (resume: ResumeData) => void;
}

const ResumePrompt: React.FC<ResumePromptProps> = ({ onResumeGenerated }) => {
  const [targetJobTitle, setTargetJobTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setProgress('Starting resume generation...');

    try {
      setProgress('Analyzing your experience and skills...');
      const generatedResume = await generateResumeFromPrompt(prompt, targetJobTitle);
      
      setProgress('Formatting resume data...');
      // Convert the generated resume to the expected ResumeData format
      const resumeData: ResumeData = {
        contact: {
          name: generatedResume.name,
          email: '', // These fields will need to be filled in by the user
          phone: '',
          location: '',
        },
        summary: generatedResume.summary,
        experience: generatedResume.experience.map(exp => ({
          company: exp.company,
          position: exp.job_title,
          duration: exp.dates,
          description: exp.responsibilities.join('\n'),
        })),
        education: generatedResume.education.map(edu => ({
          school: edu.split(' - ')[1] || edu,
          degree: edu.split(' - ')[0] || edu,
          year: '', // This will need to be filled in by the user
          description: '',
        })),
        skills: generatedResume.skills,
        projects: generatedResume.projects.map(project => ({
          name: project.split(':')[0] || project,
          description: project.split(':')[1] || project,
          technologies: [], // This will need to be filled in by the user
        })),
        certifications: generatedResume.certifications,
      };

      setProgress('Finalizing your resume...');
      onResumeGenerated(resumeData);
      setProgress('');
    } catch (error) {
      console.error('Error generating resume:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate resume. Please try again.');
      setProgress('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Your Resume</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
            Target Job Title (Optional)
          </label>
          <input
            type="text"
            id="jobTitle"
            value={targetJobTitle}
            onChange={(e) => setTargetJobTitle(e.target.value)}
            placeholder="e.g., Senior Backend Developer"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
            Tell us about yourself
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your experience, skills, and career goals. For example: 'I'm a software engineer with 4 years of experience in React, Node.js, and AWS. I built a scalable platform and led a team.'"
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm font-medium">Error:</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        )}

        {progress && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-blue-600 text-sm">{progress}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating Resume...' : 'Create Resume'}
        </button>
      </form>

      <div className="mt-6 text-sm text-gray-600">
        <h3 className="font-medium mb-2">Tips for best results:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Include your years of experience</li>
          <li>Mention key technologies and skills</li>
          <li>Describe your major achievements</li>
          <li>Specify your education and certifications</li>
          <li>Add any relevant projects</li>
        </ul>
      </div>
    </div>
  );
};

export default ResumePrompt; 