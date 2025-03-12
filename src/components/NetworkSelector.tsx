import { createSignal, For } from "solid-js";
import { NETWORKS, useNetwork } from "../contexts/NetworkContext";
import Button from "./ui/Button";

export default function NetworkSelector() {
  const { network, setNetwork } = useNetwork();
  const [isOpen, setIsOpen] = createSignal(false);
  
  const toggleDropdown = () => setIsOpen(!isOpen());
  
  const selectNetwork = (selectedNetwork: string) => {
    setNetwork(selectedNetwork as typeof NETWORKS[number]);
    setIsOpen(false);
  };
  
  return (
    <div class="relative ml-auto">
      <button
        class="flex items-center px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
        onClick={toggleDropdown}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="mr-1 text-gray-200">Network:</span>
        <span class="font-medium text-white">{network()}</span>
        <svg
          class="w-4 h-4 ml-2 text-sky-300 transition-transform duration-200"
          style={{ transform: isOpen() ? 'rotate(180deg)' : 'rotate(0)' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      
      <div 
        class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg z-10 transform origin-top-right transition-all duration-200"
        style={{
          opacity: isOpen() ? 1 : 0,
          visibility: isOpen() ? 'visible' : 'hidden',
          transform: isOpen() ? 'scale(1)' : 'scale(0.95)'
        }}
      >
        <For each={NETWORKS}>
          {(networkOption) => (
            <button
              class={`block px-4 py-2 text-sm w-full text-left transition-colors duration-150 ${
                network() === networkOption
                  ? "bg-gradient-to-r from-sky-50 to-indigo-50 text-indigo-700 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => selectNetwork(networkOption)}
            >
              <div class="flex items-center">
                {network() === networkOption && (
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                )}
                <span class={network() === networkOption ? "ml-0" : "ml-6"}>
                  {networkOption}
                </span>
              </div>
            </button>
          )}
        </For>
      </div>
    </div>
  );
}
