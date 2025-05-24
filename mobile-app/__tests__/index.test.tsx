import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';

describe('Home Page', () => {
  it('renders a heading', () => {
    render(<Home />);

    // The mvllow/next-pwa-template has a heading "Rice Bowl"
    // We will check for that as a basic rendering test.
    // If the content of pages/index.tsx changes, this test might need an update.
    const heading = screen.getByRole('heading', {
      name: /Rice Bowl/i,
    });

    expect(heading).toBeInTheDocument();
  });
});