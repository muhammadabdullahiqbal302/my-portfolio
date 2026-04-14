import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/developer/i);
  expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument();
});
