import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side - Image with Quote */}
      <div className="md:w-1/2 bg-gradient-to-br from-primary-400 to-accent-600 flex flex-col items-center justify-center p-8 text-white">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8 animate-fade-in">
            <img
              src="https://images.pexels.com/photos/5428834/pexels-photo-5428834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Students working together"
              className="rounded-xl shadow-lg mb-8 max-w-full h-auto"
            />
          </div>
          <h2 className="text-3xl font-bold mb-4 animate-slide-up">Forge your future with clarity</h2>
          <p className="text-lg animate-slide-up">
            Navigate your educational journey with confidence and purpose. Find your path, achieve your goals.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="md:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">PathForge</h1>
            <p className="text-gray-600">Your personal guide to academic success</p>
          </div>

          {isLogin ? (
            <LoginForm onToggleForm={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onToggleForm={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;