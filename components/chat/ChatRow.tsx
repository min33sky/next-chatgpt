import { db } from '@/lib/firebase';
import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import { collection, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

interface Props {
  id: string; // 채팅방의 id
}

/**
 * 채팅방 목록에서 각 채팅방을 나타내는 컴포넌트
 */
export default function ChatRow({ id }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false); //? 채팅방이 활성화 되었는지 여부 (URL의 채팅방 id와 일치)

  //* id에 해당하는 채팅방의 메세지들을 가져온다.
  const [messages] = useCollection(
    collection(db, 'users', session?.user?.email!, 'chats', id, 'messages'),
  );

  /**
   * 활성화 된 채팅방인지 확인
   */
  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(id));
  }, [pathname]);

  /**
   * 채팅방 삭제
   */
  const removeChatRoom = useCallback(async () => {
    await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id));
    router.replace('/');
  }, []);

  return (
    <Link
      href={`/chat/${id}`}
      aril-label="Chat Room Link"
      title="채팅방으로 이동"
      className={`chatRow justify-center ${active && 'bg-gray-500/20'}`}
    >
      <ChatBubbleLeftIcon className="h-5 w-5" />

      <p className="hidden flex-1 truncate md:inline-flex">
        {messages?.docs[messages?.docs.length - 1]?.data().text || 'New Chat'}
      </p>

      <TrashIcon
        aria-label="Delete Chat Room"
        title="채팅방 삭제"
        onClick={removeChatRoom}
        className="h-5 w-5 text-gray-500 hover:text-red-700"
      />
    </Link>
  );
}
