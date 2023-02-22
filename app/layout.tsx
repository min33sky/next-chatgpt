import Login from '@/components/auth/Login';
import SessionProviderWrapper from '@/components/common/SessionProviderWrapper';
import Sidebar from '@/components/common/Sidebar';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import './globals.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  console.log('### session: ', session);

  return (
    <html lang="ko">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <SessionProviderWrapper session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              <aside className="h-screen max-w-xs overflow-y-scroll bg-[#202123] md:min-w-[20rem]">
                <Sidebar />
              </aside>
              {/* ClientProvider - Notification */}
              <main className="flex-1 bg-[#343541]">{children}</main>
            </div>
          )}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
