import Sidebar from '@/components/common/Sidebar';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <div className="flex">
          <aside className="h-screen max-w-xs overflow-y-scroll bg-[#202123] md:min-w-[20rem]">
            <Sidebar />
          </aside>
          {/* ClientProvider - Notification */}
          <main className="flex-1 bg-[#343541]">{children}</main>
        </div>
      </body>
    </html>
  );
}
