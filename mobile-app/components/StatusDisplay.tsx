import React from 'react';

interface StatusDisplayProps {
  status: string;
  errorMessage?: string;
}

const StatusDisplay: React.FC<StatusDisplayProps> = ({ status, errorMessage }) => {
  let displayText = '';
  let textColor = 'text-gray-700'; // Default text color

  switch (status) {
    case 'loading':
      displayText = 'Status: Loading...';
      textColor = 'text-blue-500';
      break;
    case 'online':
      displayText = 'Status: Online';
      textColor = 'text-green-500';
      break;
    case 'offline':
      displayText = 'Status: Offline';
      textColor = 'text-red-500';
      break;
    case 'error':
      displayText = `Error: ${errorMessage || 'Failed to fetch status'}`;
      textColor = 'text-yellow-600';
      break;
    default:
      displayText = 'Status: Unknown';
  }

  return (
    <div className={`p-2 border rounded ${textColor}`}>
      <p>{displayText}</p>
    </div>
  );
};

export default StatusDisplay;