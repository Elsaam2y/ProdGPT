import Navbar from '@/components/navbar';
import { PaymentBar } from '@/components/PaymentBar';
import { checkSubscription } from '@/lib/subscription';
import { getApiLimitCount } from '@/lib/api-limit';
import '../../globalStyles.css';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className="bg-[#111827] text-white">
      <Navbar />
      <main className="pt-10 md:pl-3">
        {children}
      </main>
      <div className="p-3 bg-[#111827] mt-4 flex items-center justify-center">
        <PaymentBar isPro={isPro} apiLimitCount={apiLimitCount} />
      </div>
    </div>
  );
};

export default DashboardLayout;
