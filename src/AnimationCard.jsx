import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimationCard = ({ project, onClose }) => {
  // Background scroll lock karne ke liye
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!project) return null;

  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className={`expanded-card project-card--${project.chartTone}`}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()} 
      >
        <button className="close-btn" onClick={onClose}>×</button>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="modal-tag">Project Detail</span>
          <h2 className="modal-title">{project.title}</h2>
          
          <div className="expanded-content">
            <ul className="modal-desc-list">
              {project.desc.map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (index * 0.1) }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
            <div className="modal-footer">
              <span className="modal-stack-label">Tech Stack:</span>
              <p className="modal-stack-text">{project.stack}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AnimationCard;