import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, ExternalLink, Bookmark, GitCompare } from 'lucide-react';
import careerData from '../data/careers.json';
import { Career, Domain, SubDomain } from '../types/career';

const CareerPathDetailPage: React.FC = () => {
  const { domainId, subDomainId } = useParams<{ domainId: string; subDomainId: string }>();
  const navigate = useNavigate();
  const [career, setCareer] = useState<Career | null>(null);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  useEffect(() => {
    // Find the career data based on the URL parameters
    const domain = careerData.domains.find((d: Domain) => d.id === domainId);
    const subDomain = domain?.subDomains.find((sd: SubDomain) => sd.id === subDomainId);
    const careerInfo = subDomain?.careers[0]; // For now, we'll show the first career
    if (careerInfo) {
      setCareer(careerInfo);
      // Load completed steps from localStorage
      const savedSteps = localStorage.getItem(`career-${careerInfo.id}-completed`);
      if (savedSteps) {
        setCompletedSteps(JSON.parse(savedSteps));
      }
    }
  }, [domainId, subDomainId]);

  const handleStepComplete = (stepTitle: string) => {
    const newCompletedSteps = completedSteps.includes(stepTitle)
      ? completedSteps.filter(step => step !== stepTitle)
      : [...completedSteps, stepTitle];
    
    setCompletedSteps(newCompletedSteps);
    localStorage.setItem(`career-${career?.id}-completed`, JSON.stringify(newCompletedSteps));
  };

  const handleBookmark = () => {
    const bookmarkedPaths = JSON.parse(localStorage.getItem('bookmarkedPaths') || '[]');
    if (career && !bookmarkedPaths.includes(career.id)) {
      bookmarkedPaths.push(career.id);
      localStorage.setItem('bookmarkedPaths', JSON.stringify(bookmarkedPaths));
      // Show toast notification (you can implement this with your preferred toast library)
    }
  };

  if (!career) {
    return <div>Loading...</div>;
  }

  const progress = (completedSteps.length / career.roadmap.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{career.title}</h1>
              <p className="text-gray-600">{career.overview}</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleBookmark}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-primary-600 bg-primary-50 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <Bookmark size={16} className="mr-2" />
                Save
              </button>
              <button
                onClick={() => setShowCompareModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-primary-600 bg-primary-50 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <GitCompare size={16} className="mr-2" />
                Compare
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Your Progress</h2>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Roadmap */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Learning Roadmap</h2>
          <div className="space-y-6">
            {career.roadmap.map((step, index) => (
              <div
                key={step.title}
                className="flex items-start space-x-4 p-4 rounded-lg border border-gray-100 hover:border-primary-200 transition-colors"
              >
                <button
                  onClick={() => handleStepComplete(step.title)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    completedSteps.includes(step.title)
                      ? 'border-primary-600 bg-primary-50 text-primary-600'
                      : 'border-gray-300'
                  }`}
                >
                  {completedSteps.includes(step.title) && <Check size={14} />}
                </button>
                <div className="flex-grow">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <div className="space-y-2">
                    {step.resources.map((resource) => (
                      <a
                        key={resource.title}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-primary-600 hover:text-primary-700"
                      >
                        {resource.title}
                        <ExternalLink size={14} className="ml-1" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools & Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Tools */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Tools Used</h2>
            <div className="space-y-4">
              {career.tools.map((tool) => (
                <div key={tool.name} className="flex items-center space-x-3">
                  <span className="text-2xl">{tool.icon}</span>
                  <span className="text-gray-900">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Projects to Build</h2>
            <div className="space-y-4">
              {career.projects.map((project) => (
                <div key={project.title} className="p-4 rounded-lg border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Job Roles */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Job Roles & Salary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {career.roles.map((role) => (
              <div key={role.title} className="p-4 rounded-lg border border-gray-100">
                <h3 className="font-medium text-gray-900 mb-2">{role.title}</h3>
                <p className="text-primary-600 font-medium">{role.salary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compare Modal (to be implemented) */}
      {showCompareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Compare Career Paths</h2>
            {/* Add comparison content here */}
            <button
              onClick={() => setShowCompareModal(false)}
              className="mt-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerPathDetailPage; 