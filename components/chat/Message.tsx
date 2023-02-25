import { DocumentData } from 'firebase/firestore';
import React from 'react';

interface Props {
  message: DocumentData;
}

/**
 * 채팅 메세지 컴포넌트
 */
export default function Message({ message }: Props) {
  const isChatGPT = message.user.name === 'ChatGPT';

  return (
    <div className={`py-5 text-white ${isChatGPT && 'bg-[#434654]'} `}>
      <div className="mx-auto flex max-w-2xl space-x-5 px-10">
        <img
          src={message.user.avatar}
          alt={message.user.name}
          className="h-8 w-8"
        />
        <p className="pt-1 text-sm">{message.text}</p>
      </div>
    </div>
  );
}
