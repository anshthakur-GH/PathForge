import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import careerData from '../data/careers.json';
import { Domain, SubDomain } from '../types/career';

const CareerPathPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredDomains = careerData.domains.filter(domain => 
    domain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    domain.subDomains.some(subDomain => 
      subDomain.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleDomainClick = (domain: Domain) => {
    setSelectedDomain(domain);
    setShowModal(true);
  };

  const handleSubDomainClick = (domain: Domain, subDomain: SubDomain) => {
    navigate(`/career-path/${domain.id}/${subDomain.id}`);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDomain(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Career Paths</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover and explore various career domains and their specialized paths. Find the perfect career that matches your interests and goals.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search domains or sub-domains..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </motion.div>

        {/* Domains Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredDomains.map((domain, index) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => handleDomainClick(domain)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <motion.span 
                    className="text-3xl"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {domain.icon}
                  </motion.span>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-900">{domain.name}</h3>
                    <p className="text-sm text-gray-500">{domain.subDomains.length} paths available</p>
                  </div>
                </div>
                <ChevronDown className="text-gray-400" size={20} />
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {showModal && selectedDomain && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{selectedDomain.icon}</span>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedDomain.name}</h2>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={24} className="text-gray-500" />
                  </button>
                </div>
                <div className="space-y-4">
                  {selectedDomain.subDomains.map((subDomain) => (
                    <motion.button
                      key={subDomain.id}
                      onClick={() => handleSubDomainClick(selectedDomain, subDomain)}
                      className="w-full flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 transition-colors text-left border border-gray-100"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <motion.span 
                        className="text-2xl"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {subDomain.icon}
                      </motion.span>
                      <div>
                        <h4 className="font-medium text-gray-900">{subDomain.name}</h4>
                        <p className="text-sm text-gray-500">
                          {subDomain.careers.length} career options
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CareerPathPage; 