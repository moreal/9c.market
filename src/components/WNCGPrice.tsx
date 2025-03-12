// filepath: /Users/moreal/github/moreal/9c-market/src/components/WNCGPrice.tsx
import { createResource, Show } from "solid-js";
import { fetchCryptoPrice } from "../utils/crypto-utils";

export default function WNCGPrice() {
  // Fetch WNCG price data
  const [priceData, { refetch }] = createResource(() => fetchCryptoPrice('WNCG', 'KRW'));
  
  // Set up automatic refresh every 5 minutes
  setInterval(() => {
    refetch();
  }, 5 * 60 * 1000);
  
  return (
    <div class="bg-white rounded-md shadow-sm px-4 py-3 flex flex-col">
      <div class="text-center mb-1">
        <span class="font-medium text-gray-700">WNCG Price</span>
      </div>
      
      <Show when={!priceData.loading && priceData()} fallback={
        <div class="text-center py-1">
          <div class="animate-pulse bg-gray-200 h-5 w-24 mx-auto rounded"></div>
        </div>
      }>
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <img 
              src="/images/wncg-icon.png" 
              alt="WNCG" 
              class="w-5 h-5 mr-1"
              onError={(e) => {
                // Fallback if image doesn't exist
                e.currentTarget.style.display = 'none';
              }}
            />
            <span class="text-sm text-gray-600">WNCG</span>
          </div>
          
          <div class="text-right">
            <div class="text-semibold text-gray-900">
              {priceData()?.toFixed(2)} KRW
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}
