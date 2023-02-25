'use client';

import { db } from '@/lib/firebase';
import { Message } from '@/types/chat';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  chatId: string;
}

/**
 * 채팅 입력 컴포넌트
 */
export default function ChatInput({ chatId }: Props) {
  const [text, setText] = useState('');
  const { data: session } = useSession();
  const toastId = useRef<string>();

  // TODO: useSWR to get model
  const model = 'text-davinci-003';

  /**
   * 메세지 전송 핸들러
   */
  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text || !text.trim()) return;

    const message: Message = {
      text,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name!}`,
      },
    };

    //* Firestore에 메세지 저장
    await addDoc(
      collection(
        db,
        'users',
        session?.user?.email!,
        'chats',
        chatId,
        'messages',
      ),
      message,
    );

    toastId.current = toast.loading('ChatGPT is thinking...');

    // call ChatGPT API
    await fetch('/api/askQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      toast.success('ChatGPT has responded!', {
        id: toastId.current,
      });
      setText('');
    });
  };

  return (
    <div className="rounded-lg bg-gray-700/50 text-sm text-gray-400">
      <form onSubmit={sendMessage} className="flex space-x-5 p-5">
        <input
          type="text"
          disabled={!session}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border-b border-b-slate-600 bg-transparent outline-none
                      disabled:cursor-not-allowed disabled:text-gray-300"
          placeholder="Type your message here..."
          autoFocus
        />
        <button
          type="submit"
          title="Send Message"
          aria-label="Send Message"
          disabled={!session || !text}
          className="rounded bg-[#11A37F] px-4 py-2 font-bold text-white hover:opacity-50
                      disabled:cursor-not-allowed disabled:bg-gray-500"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>
    </div>
  );
}
