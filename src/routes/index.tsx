import { A } from "@solidjs/router";
import PageHeader from "../components/ui/PageHeader";
import FeatureCard from "../components/ui/FeatureCard";
import Button from "../components/ui/Button";

export default function Home() {
  const features = [
    {
      title: "Easy Purchases",
      description: "Browse and purchase in-game items with just a few clicks.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Secure Transactions",
      description: "All purchases are processed securely using blockchain technology.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Instant Delivery",
      description: "Items are delivered to your game account immediately after purchase.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <main class="container mx-auto px-4 py-8 max-w-6xl">
      <PageHeader title="Nine Chronicles Market">
        <p class="text-xl opacity-90 max-w-2xl mx-auto text-white">
          Your one-stop shop for Nine Chronicles game items, characters, and resources
        </p>
      </PageHeader>
      
      <div class="mt-8 text-center">
        <div class="flex justify-center space-x-4">
          <A href="/iap">
            <Button variant="secondary" size="lg">Browse Products</Button>
          </A>
          <A href="/about">
            <Button variant="outline" size="lg">Learn More</Button>
          </A>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {features.map(feature => (
          <FeatureCard 
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </div>
      
      <div class="text-center mt-16">
        <p class="text-gray-600">
          Built with{" "}
          <a href="https://solidjs.com" target="_blank" class="text-sky-600 hover:underline font-medium">
            SolidJS
          </a>
        </p>
      </div>
    </main>
  );
}
