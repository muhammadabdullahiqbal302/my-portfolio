// jest-dom adds custom matchers for asserting on DOM nodes.
import '@testing-library/jest-dom';

// Framer Motion: render plain elements in Jest (avoids layout / motion DOM edge cases).
jest.mock('framer-motion', () => {
  const React = require('react');

  const stripMotion = (props) => {
    const next = { ...props };
    const drop = [
      'initial',
      'animate',
      'exit',
      'variants',
      'transition',
      'whileHover',
      'whileTap',
      'whileInView',
      'viewport',
      'layout',
      'layoutId',
    ];
    drop.forEach((k) => delete next[k]);
    return next;
  };

  const make = (tag) =>
    React.forwardRef(({ children, ...props }, ref) =>
      React.createElement(tag, { ...stripMotion(props), ref }, children)
    );

  return {
    motion: {
      div: make('div'),
      section: make('section'),
      header: make('header'),
      aside: make('aside'),
      footer: make('footer'),
      ul: make('ul'),
      li: make('li'),
      a: make('a'),
      p: make('p'),
      h1: make('h1'),
    },
    useInView: () => true,
    useReducedMotion: () => false,
  };
});
