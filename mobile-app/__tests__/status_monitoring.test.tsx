import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatusDisplay from '../components/StatusDisplay';

describe('StatusDisplay Component', () => {
  test('renders correctly', () => {
    render(<StatusDisplay status="loading" />);
    expect(screen.getByText(/Status: Loading.../i)).toBeInTheDocument();
  });

  test('displays "Loading..." status', () => {
    render(<StatusDisplay status="loading" />);
    const loadingTextElement = screen.getByText('Status: Loading...');
    expect(loadingTextElement).toBeInTheDocument();
    expect(loadingTextElement.parentElement).toHaveClass('text-blue-500');
  });

  test('displays "Online" status', () => {
    render(<StatusDisplay status="online" />);
    const onlineTextElement = screen.getByText('Status: Online');
    expect(onlineTextElement).toBeInTheDocument();
    expect(onlineTextElement.parentElement).toHaveClass('text-green-500');
  });

  test('displays "Offline" status', () => {
    render(<StatusDisplay status="offline" />);
    const offlineTextElement = screen.getByText('Status: Offline');
    expect(offlineTextElement).toBeInTheDocument();
    expect(offlineTextElement.parentElement).toHaveClass('text-red-500');
  });

  test('displays "Error" status with default message', () => {
    render(<StatusDisplay status="error" />);
    const errorTextElement = screen.getByText(/Error: Failed to fetch status/i);
    expect(errorTextElement).toBeInTheDocument();
    expect(errorTextElement.parentElement).toHaveClass('text-yellow-600');
  });

  test('displays "Error" status with custom message', () => {
    const errorMessage = "Network connection lost";
    render(<StatusDisplay status="error" errorMessage={errorMessage} />);
    const customErrorTextElement = screen.getByText(`Error: ${errorMessage}`);
    expect(customErrorTextElement).toBeInTheDocument();
    expect(customErrorTextElement.parentElement).toHaveClass('text-yellow-600');
  });

  test('displays "Unknown" status for unhandled status prop', () => {
    render(<StatusDisplay status="unknown_status_type" />);
    const unknownTextElement = screen.getByText('Status: Unknown');
    expect(unknownTextElement).toBeInTheDocument();
    expect(unknownTextElement.parentElement).toHaveClass('text-gray-700');
  });
});