'use client';

import { db } from '@/lib/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import Message from './Message';

interface Props {
  chatId: string;
}

/**
 * 채팅방 메세지 뷰
 */
export default function Chat({ chatId }: Props) {
  const { data: session } = useSession();

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          'users',
          session?.user?.email!,
          'chats',
          chatId,
          'messages',
        ),
        orderBy('createdAt', 'asc'),
      ),
  );

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {messages?.docs.map((message) => (
        <Message key={message.id} message={message.data()} />
      ))}
    </div>
  );
}
