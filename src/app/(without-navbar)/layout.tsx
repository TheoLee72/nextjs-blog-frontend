import Link from 'next/link';
export default function NoNavBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-[20px] md:px-[calc((100vw-768px)/2)] ">
      <Link href="/">
        <div className="font-semibold text-[32px] mt-[calc((100vh-532px)/2)] h-[72px] flex flex-col justify-center">
          Theo Lee&apos;s Blog
        </div>
      </Link>
      {children}
    </div>
  );
}
