'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

/**
 * 로그인 컴포넌트
 */
export default function Login() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#11A37F] text-center">
      <Image
        src="https://links.papareact.com/2i6"
        width={300}
        height={300}
        alt="Logo"
      />
      <button
        aria-label="Sign In Button"
        title="로그인 버튼"
        onClick={() => signIn('google')}
        className="animate-pulse text-3xl font-bold text-white"
      >
        Sign In to use ChatGPT
      </button>
    </div>
  );
}
