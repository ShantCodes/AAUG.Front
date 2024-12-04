import React from 'react';
import { SocialIcon } from 'react-social-icons';

const ShareToTelegram = ({ title, description }) => {
  const handleShare = async () => {
    try {
      // Construct the Telegram share URL with bold title and description
      const message = `**${title}**\n\n${description}\n\nAaug.ir`;  // Bold title using '*' syntax in Telegram
      const telegramURL = `https://t.me/share/url?url=${encodeURIComponent(message)}`;

      // Open Telegram's sharing interface in a new tab
      window.open(telegramURL, '_blank');
    } catch (error) {
      console.error('Error sharing to Telegram:', error);
      alert('Could not share to Telegram. Please try again.');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center space-x-2 text-blue-500 hover:underline"
    >
      <SocialIcon network="telegram" style={{ height: 30, width: 30 }} />
    </button>
  );
};

export default ShareToTelegram;
