import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactDOM from 'react-dom';

const AnimationCard = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  if (!project) return null;

  return ReactDOM.createPortal(
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ zIndex: 99999 }}
    >
      <motion.div
        className={`expanded-card project-card--${project.chartTone}`}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose} aria-label="Close">×</button>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <span className="modal-tag">Project Detail</span>
          <h2 className="modal-title">{project.title}</h2>

          <ul className="modal-desc-list">
            {project.desc.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.08 }}
              >
                {item}
              </motion.li>
            ))}
          </ul>

          <div className="modal-footer">
            <span className="modal-stack-label">Tech Stack</span>
            <p className="modal-stack-text">{project.stack}</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export default AnimationCard;
