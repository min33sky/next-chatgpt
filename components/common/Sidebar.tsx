'use client';

import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import NewChat from '../chat/NewChat';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ChatRow from '../chat/ChatRow';

export default function Sidebar() {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, 'users', session?.user?.email!, 'chats'),
        orderBy('createdAt', 'asc'),
      ),
  );

  console.log('chats: ', chats);

  return (
    <div className="flex h-screen flex-col p-2">
      <div className="flex-1">
        <div>
          {/* New Chat */}
          <NewChat />

          <div>{/* ModelSelection */}</div>

          {/* Map through the ChatRows */}
          {chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} />
          ))}
        </div>
      </div>

      {/* 로그인 한 유저 이미지 */}
      {session && (
        <img
          aria-label="Logout Button"
          onClick={() => signOut()}
          src={session.user?.image!}
          alt="Profile pic"
          title="로그아웃하기"
          className="mx-auto mb-2 h-12 w-12 cursor-pointer rounded-full hover:opacity-50"
        />
      )}
    </div>
  );
}
