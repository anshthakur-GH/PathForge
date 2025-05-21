import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Section } from '../../types';

interface SectionCardProps {
  section: Section;
  index: number;
}

const SectionCard: React.FC<SectionCardProps> = ({ section, index }) => {
  // Calculate delay for staggered animation
  const delay = index * 0.1;

  const ButtonContent = () => (
    <>
      {section.buttonText} <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
    </>
  );

  return (
    <div 
      className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md group animate-fade-in"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="p-6">
        <div className="text-3xl mb-4">{section.icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
          {section.title}
        </h3>
        <p className="text-gray-600 mb-6">{section.description}</p>
        {section.link ? (
          <Link
            to={section.link}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <ButtonContent />
          </Link>
        ) : (
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
            <ButtonContent />
          </button>
        )}
      </div>
      
      <div className="h-1 w-full bg-gradient-to-r from-primary-500 to-accent-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
    </div>
  );
};

export default SectionCard;