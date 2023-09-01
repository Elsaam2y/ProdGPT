'use client';

import { Montserrat } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { FreeCounter } from '@/components/free-counter';

const poppins = Montserrat({ weight: '600', subsets: ['latin'] });


export const PaymentBar = ({
  apiLimitCount = 0,
  isPro = false,
}: {
  apiLimitCount: number;
  isPro: boolean;
}) => {
  const pathname = usePathname();

  return (
<div className="bg-[#111827] text-white bg-[#0c0a09] ">
  <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
</div>

  );
};
