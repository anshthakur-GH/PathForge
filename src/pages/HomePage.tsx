import React from 'react';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/home/HeroSection';
import SectionGrid from '../components/home/SectionGrid';
import { sections } from '../utils/constants';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSection />
        <SectionGrid sections={sections} />
      </div>
    </div>
  );
};

export default HomePage;