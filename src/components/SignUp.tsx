import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { BookOpen, Zap, CreditCard } from 'lucide-react';

const SignUp: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    subject: '',
    plan: '',
  });
  const [showPayment, setShowPayment] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const subjects = [
    { id: 'biology', name: 'Biology', icon: '🧬' },
    { id: 'physics', name: 'Physics', icon: '⚛️' },
    { id: 'chemistry', name: 'Chemistry', icon: '⚗️' },
  ];

  const plans = [
    { id: 'basic', name: 'Basic', price: 29, features: ['Basic materials', 'Progress tracking', 'Email support'] },
    { id: 'premium', name: 'Premium', price: 59, features: ['All Basic', '1-on-1 tutoring', 'Advanced resources'] },
    { id: 'pro', name: 'Pro', price: 99, features: ['All Premium', 'Unlimited tutoring', 'Expert consultation'] },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!formData.email || !formData.password || !formData.username) {
        toast.error('Please fill in all fields');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.subject) {
        toast.error('Please select a subject');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!formData.plan) {
        toast.error('Please select a plan');
        return;
      }
      setShowPayment(true);
    }
  };

  const handlePayment = async (method: 'zelle' | 'venmo') => {
    console.log('=== PAYMENT HANDLER CALLED ===');
    console.log('Payment method:', method);
    console.log('Form data:', formData);
    
    setLoading(true);
    try {
      console.log('Attempting to create account with:', {
        email: formData.email,
        username: formData.username,
        subject: formData.subject,
        plan: formData.plan
      });
      
      await signUp(formData.email, formData.password, formData.username, formData.subject, formData.plan);
      console.log('Signup completed successfully');
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      if (error.message?.includes('Invalid API key') || error.message?.includes('supabaseUrl')) {
        toast.error('Please connect to Supabase first using the button in the top right corner');
      } else {
        toast.error(`Error creating account: ${error.message || 'Please try again.'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Add debugging for form submission
  const handleSubmitDebug = (e: React.FormEvent) => {
    console.log('=== FORM SUBMIT CALLED ===');
    console.log('Current step:', step);
    console.log('Form data:', formData);
    handleSubmit(e);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">Create Your Account</h2>
            <p className="text-gray-600">Step {step} of 3</p>
          </div>

          {step === 1 && (
            <form onSubmit={handleSubmitDebug} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Continue
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 text-center">Choose Your Subject</h3>
              <div className="grid grid-cols-1 gap-4">
                {subjects.map((subject) => (
                  <button
                    key={subject.id}
                    onClick={() => setFormData({ ...formData, subject: subject.id })}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      formData.subject === subject.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{subject.icon}</span>
                      <span className="font-medium text-gray-900">{subject.name}</span>
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={handleSubmitDebug}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 text-center">Select Your Plan</h3>
              <div className="space-y-4">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setFormData({ ...formData, plan: plan.id })}
                    className={`w-full p-4 rounded-lg border-2 transition-colors ${
                      formData.plan === plan.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                        <p className="text-sm text-gray-600">${plan.price}/month</p>
                      </div>
                      {plan.id === 'premium' && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                          Popular
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={handleSubmitDebug}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Continue to Payment
              </button>
            </div>
          )}
        </motion.div>

        {showPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <div className="bg-white rounded-xl p-6 max-w-sm w-full">
              <div className="text-center mb-6">
                <CreditCard className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900">Choose Payment Method</h3>
                <p className="text-gray-600">Complete your subscription to {formData.plan} plan</p>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={() => handlePayment('zelle')}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Zap className="h-5 w-5" />
                  <span>{loading ? 'Processing...' : 'Pay with Zelle'}</span>
                </button>
                
                <button
                  onClick={() => handlePayment('venmo')}
                  disabled={loading}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>{loading ? 'Processing...' : 'Pay with Venmo'}</span>
                </button>
              </div>
              
              <button
                onClick={() => setShowPayment(false)}
                className="w-full mt-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SignUp;