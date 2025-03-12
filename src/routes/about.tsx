import { A } from "@solidjs/router";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";

export default function About() {
  return (
    <main class="container mx-auto px-4 py-8 max-w-6xl">
      <PageHeader title="About Nine Chronicles Market">
        <p class="text-lg opacity-90 max-w-3xl mx-auto text-white leading-relaxed">
          Discover the story behind the Nine Chronicles marketplace and how we're making it easier to enhance your gaming experience.
        </p>
      </PageHeader>
      
      <div class="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p class="text-gray-700 leading-relaxed mb-6">
            Nine Chronicles Market was created to provide a seamless interface for players to browse and purchase in-game items, 
            resources, and bonuses. Our platform integrates directly with the Nine Chronicles game ecosystem, 
            ensuring secure and instant delivery of all purchased items.
          </p>
          
          <h2 class="text-2xl font-bold text-gray-800 mb-4">How It Works</h2>
          <ol class="list-decimal list-inside space-y-3 text-gray-700 mb-6">
            <li>Browse our extensive collection of in-game items and resources</li>
            <li>Select the items you want to purchase</li>
            <li>Complete the secure payment process</li>
            <li>Receive your items instantly in your game inventory</li>
          </ol>
          
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Technologies</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            Our marketplace is built using modern web technologies to ensure a fast, secure, and responsive experience:
          </p>
          <div class="flex flex-wrap gap-2 mb-6">
            <span class="px-3 py-1 bg-sky-100 text-sky-800 rounded-full">SolidJS</span>
            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">TypeScript</span>
            <span class="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">TailwindCSS</span>
            <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">Blockchain</span>
          </div>
        </div>
      </div>
      
      <div class="text-center">
        <A href="/">
          <Button variant="primary" class="mr-4">Return to Home</Button>
        </A>
        <A href="/iap">
          <Button variant="secondary">Browse Products</Button>
        </A>
      </div>
    </main>
  );
}
