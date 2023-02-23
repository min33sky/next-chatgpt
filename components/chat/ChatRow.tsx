import { db } from '@/lib/firebase';
import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import { collection, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

interface Props {
  id: string; // 채팅방의 id
}

export default function ChatRow({ id }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  //* id에 해당하는 채팅방의 메세지들을 가져온다.
  //? 가장 최신 메세지를 화면에 보여줘야함
  const [messages] = useCollection(
    query(
      collection(db, 'users', session?.user?.email!, 'chats', id, 'messages'),
      orderBy('createdAt', 'asc'),
    ),
  );

  return (
    <Link href={`/chat/${id}`} className="chatRow justify-center">
      <ChatBubbleLeftIcon className="h-5 w-5" />
      <p className="hidden flex-1 truncate md:inline-flex">
        {messages?.docs[messages?.docs.length - 1]?.data().text || 'New Chat'}
      </p>
      <TrashIcon className="h-5 w-5 text-gray-700 hover:text-red-700" />
    </Link>
  );
}
