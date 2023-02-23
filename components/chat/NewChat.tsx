'use client';

import { db } from '@/lib/firebase';
import { PlusIcon } from '@heroicons/react/24/outline';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function NewChat() {
  const router = useRouter();
  const { data: session } = useSession();

  const createNewChat = async () => {
    console.log('고고고');
    const doc = await addDoc(
      collection(db, 'users', session?.user?.email!, 'chats'),
      {
        userId: session?.user?.email,
        createdAt: serverTimestamp(),
      },
    );

    console.log('doc: ', doc);

    router.push(`/chat/${doc.id}`);
  };

  // TODO: 버튼으로 만들어야되지 않나?
  return (
    <div onClick={createNewChat} className="chatRow border border-gray-700">
      <PlusIcon className="h-4 w-4" />
      <p>New Chat</p>
    </div>
  );
}
