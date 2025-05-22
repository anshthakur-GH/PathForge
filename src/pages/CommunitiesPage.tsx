import React, { useState, useEffect } from 'react';
import CommunityCard from '../components/communities/CommunityCard';

interface Community {
  domain: string;
  reddit: string;
  discord: string;
}

const CommunitiesPage: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await fetch('/data/communities-list.json');
        if (!response.ok) {
          throw new Error('Failed to fetch communities data');
        }
        const data = await response.json();
        // Handle both array and {communities: array} formats
        const communitiesArray = Array.isArray(data) ? data : (Array.isArray(data.communities) ? data.communities : []);
        setCommunities(communitiesArray);
      } catch (err) {
        setError('Failed to load communities data');
        console.error('Error loading communities:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCommunities();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600">{error}</h2>
            <p className="mt-2 text-gray-600">Please try refreshing the page</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join Peer Communities
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with like-minded peers, share knowledge, and grow together in your chosen domain.
            Join our vibrant communities on Reddit and Discord to start your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((community) => (
            <CommunityCard
              key={community.domain}
              domain={community.domain}
              reddit={community.reddit}
              discord={community.discord}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunitiesPage; 