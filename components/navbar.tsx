import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { getApiLimitCount } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Montserrat } from 'next/font/google';

const font = Montserrat({ weight: '600', subsets: ['vietnamese'] });

const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          {/* <Image fill alt="Logo" src="/logo2-.png" /> */}
          <Image fill alt="Logo" src="/iconmonstr-product-3-2.png" />
        </div>
        <h1 className={cn('text-2xl font-bold text-white', font.className)}>
          ProdGPT
        </h1>
      </Link>
      <div className="flex w-full justify-end">
          <UserButton afterSignOutUrl="/" />
      </div>
    </nav>

  );
};

export default Navbar;
