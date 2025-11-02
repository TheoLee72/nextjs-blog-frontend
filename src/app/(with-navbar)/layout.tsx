import React from 'react';
import NavBarClient from './_components/NavBarClient';

export default function NavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBarClient />
      {/*계산식 안에 space있으면 오류납니다.*/}
      <div className="px-[20px] md:px-[calc((100vw-768px)/2)] pb-[20px]">
        {children}
      </div>
    </>
  );
}
