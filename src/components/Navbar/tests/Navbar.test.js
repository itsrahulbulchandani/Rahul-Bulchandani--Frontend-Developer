import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../Navbar'; 

describe('Navbar Component', () => {
  test('renders the Navbar with a logo, search bar, and search icon', () => {
    render(<Navbar />);

    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThanOrEqual(2); // 2 images (logo and search icon)

    // Check for the search input by placeholder text
    const searchInput = screen.getByPlaceholderText(/search for restaurant and food/i);
    expect(searchInput).toBeInTheDocument();
  });
});
