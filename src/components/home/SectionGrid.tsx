import React from 'react';
import SectionCard from './SectionCard';
import { Section } from '../../types';

interface SectionGridProps {
  sections: Section[];
}

const SectionGrid: React.FC<SectionGridProps> = ({ sections }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {sections.map((section, index) => (
        <SectionCard key={section.id} section={section} index={index} />
      ))}
    </div>
  );
};

export default SectionGrid;