import { Suspense } from 'react';
import MarketPage from './MarketPage';

export default function Page() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="w-6 h-6 rounded-full border-2 border-[#00F5D4]/30 border-t-[#00F5D4] animate-spin"/>
      </div>
    }>
      <MarketPage />
    </Suspense>
  );
}
