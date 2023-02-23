'use client';

import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import NewChat from '../chat/NewChat';

export default function Sidebar() {
  const { data: session } = useSession();

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
