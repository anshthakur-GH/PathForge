import React, { useState } from 'react';
import { analyzeJobDescription } from '../../services/resumeGenerator';

interface JobDescriptionAnalyzerProps {
  onOptimize: (content: string) => void;
}

interface AnalysisResult {
  keywords: string[];
  requiredSkills: string[];
  suggestedImprovements: string[];
}

const JobDescriptionAnalyzer: React.FC<JobDescriptionAnalyzerProps> = ({ onOptimize }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;
    
    setLoading(true);
    setError('');
    try {
      const result = await analyzeJobDescription(jobDescription);
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing job description:', error);
      setError('Failed to analyze job description. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOptimize = () => {
    if (!jobDescription.trim()) return;
    onOptimize(jobDescription);
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-800">Job Description Analyzer</h3>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Paste Job Description
        </label>
        <textarea
          className="w-full h-32 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
        />
      </div>

      <div className="flex space-x-2">
        <button
          onClick={handleAnalyze}
          disabled={loading || !jobDescription.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
        <button
          onClick={handleOptimize}
          disabled={loading || !jobDescription.trim()}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          Use for Resume
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {analysis && (
        <div className="mt-4 space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Key Skills Required</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.requiredSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Important Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Suggested Improvements</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {analysis.suggestedImprovements.map((improvement, index) => (
                <li key={index}>{improvement}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDescriptionAnalyzer; 