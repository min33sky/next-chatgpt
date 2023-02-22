'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

interface Props {
  children: React.ReactNode;
  session: Session | null;
}

/**
 * NextAuth SessionProvider Wrapper
 * @param session Next Auth Session
 */
export default function SessionProviderWrapper({ children, session }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
