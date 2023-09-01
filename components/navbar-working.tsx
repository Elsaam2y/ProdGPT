import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { getApiLimitCount } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className="flex items-center p-4">
      <div className="flex items-center">
        <div className="relative h-12 w-12 mr-4">
          <Image fill alt="Logo" src="/iconmonstr-product-3-2.png" className="h-full w-full" />
        </div>
        <a href="https://github.com/Elsaam2y/ProdGPT" target="_blank" rel="noopener noreferrer" className="text-3xl font-bold">ProdGPT</a>
      </div>
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>

  );
};

export default Navbar;
