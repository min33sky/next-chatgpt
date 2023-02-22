import React from 'react';
import NewChat from '../chat/NewChat';

export default function Sidebar() {
  return (
    <div className="flex h-screen flex-col p-2">
      <div className="flex-1">
        <div>
          {/* New Chat */}
          <NewChat />

          <div>{/* ModelSelection */}</div>

          {/* Map through the ChatRows */}
        </div>
      </div>
    </div>
  );
}
