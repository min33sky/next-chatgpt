import Chat from '@/components/chat/Chat';
import ChatInput from '@/components/chat/ChatInput';
import React from 'react';

interface Props {
  params: {
    id: string;
  };
}

export default function ChatDetailPage({ params: { id } }: Props) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Chat chatId={id} />
      <ChatInput chatId={id} />
    </div>
  );
}
