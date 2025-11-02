'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function EmailButton() {
  const [tooltipText, setTooltipText] = useState('Click to copy');

  const handleCopy = async () => {
    await navigator.clipboard.writeText('endolpin72@gmail.com');
    setTooltipText('Copied!');
  };
  return (
    <>
      <Image
        src="/gmail.svg"
        alt="gmail"
        width={46}
        height={46}
        onClick={handleCopy}
        onMouseLeave={() => setTooltipText('Click to copy')}
        className="cursor-pointer"
      ></Image>
      <div>{tooltipText}</div>
    </>
  );
}
