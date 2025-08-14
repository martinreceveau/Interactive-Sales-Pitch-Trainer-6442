import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../contexts/AuthContext';

const { FiMessageSquare, FiX } = FiIcons;

const FeedbackButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const handleToggleFeedback = () => {
    // Event tracking for analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'feedback_button_clicked', {
        event_category: 'engagement',
        event_label: 'floating_feedback_button'
      });
    }
    
    setIsOpen((prev) => !prev);
  };

  const handleCloseFeedback = () => {
    setIsOpen(false);
  };

  const primaryColor = '#0ea5e9'; // Hardcoded primary color

  return (
    <>
      {/* Floating Feedback Button */}
      <motion.button
        onClick={handleToggleFeedback}
        style={{ 
          background: primaryColor,
          zIndex: 9999
        }}
        className="fixed top-[calc(50%-20px)] -right-10 flex gap-1 rounded-t-md rounded-b-none justify-end items-center px-3 text-sm leading-5 font-semibold py-2 text-white rotate-[270deg] transition-all h-9 shadow-lg hover:shadow-xl"
        whileHover={{ 
          scale: 1.05,
          x: 5
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ x: 0 }}
        animate={{ x: isOpen ? -5 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.div 
          className="w-fit h-fit rotate-90 transition-all duration-300"
          animate={{ rotate: isOpen ? 180 : 90 }}
        >
          <SafeIcon 
            icon={isOpen ? FiX : FiMessageSquare} 
            className="text-white"
          />
        </motion.div>
        <p className="text-white text-sm font-medium leading-none">
          Feedback
        </p>
      </motion.button>

      {/* Feedback Modal */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Send Feedback</h3>
              <button 
                onClick={handleCloseFeedback}
                className="text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={FiX} className="text-xl" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  What feedback do you have for us?
                </label>
                <textarea 
                  rows={4} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" 
                  placeholder="Tell us what you think about PopSales..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  How would you rate your experience?
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary-100 flex items-center justify-center"
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="pt-4">
                <button
                  type="button"
                  style={{ backgroundColor: primaryColor }}
                  className="w-full py-2 px-4 text-white rounded-md hover:opacity-90 transition-opacity"
                  onClick={handleCloseFeedback}
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default FeedbackButton;