import { render, screen } from '@testing-library/react';
import ProjectReactJs from './ProviderApp';

test('renders learn react link', () => {
  render(<ProjectReactJs />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});