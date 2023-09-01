import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { getApiLimitCount } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Montserrat } from 'next/font/google';
import { Github } from './landing-navbar';
const font = Montserrat({ weight: '600', subsets: ['vietnamese'] });

const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center ml-20">
        <div className="relative h-8 w-8 ">
          {/* <Image fill alt="Logo" src="/logo2-.png" /> */}
          <Image fill alt="Logo" src="/iconmonstr-product-3-2.png" />
        </div>
        <h1 className={cn('text-2xl font-bold text-white', font.className)}>
          ProdGPT
        </h1>
      </Link>
      <div className="flex max-w-fit items-center mr-24">
        <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-blue-600 text-white px-5 py-2 text-sm shadow-md hover:bg-blue-500 bg-blue-600 font-medium transition"
          href="https://github.com/Elsaam2y/ProdGPT"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>GitHub</p>
        </a>
      </div>
      <div className="flex justify-end mr-20">
          <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Navbar;
