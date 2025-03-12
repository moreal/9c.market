import { Product, ProductData, NetworkPrice } from "../types/iap";

// Format price from FavItem or mileage
export function formatPrice(product: Product): string {
  // Check first for network price in KRW if available
  if (product.networkPrice?.KRW) {
    return `${product.networkPrice.KRW.toLocaleString()} KRW`;
  }
  
  // Use mileage price if product is mileage type
  if (product.product_type === "MILEAGE" && product.mileage_price !== null) {
    return `${product.mileage_price} Mileage`;
  }

  // If mileage is available, use it
  if (product.mileage) {
    return `${product.mileage} Mileage`;
  }

  if (product.product_type === "FREE") {
    return "FREE"
  }
  
  // Default when no price info is available
  return "Unknown USD";
}

// Attach network prices to products
export async function attachNetworkPrices(
  products: ProductData[], 
  network: string
): Promise<Product[]> {
  try {
    const response = await fetch(`/data/${network.toLowerCase()}.prices.json`);
    if (!response.ok) {
      console.error(`Failed to fetch ${network} prices data`);
      return products as Product[];
    }
    
    const pricesData: Record<string, NetworkPrice> = await response.json();
    
    // Enhance each product with its network price if available
    return products.map(product => {
      const networkPrice = pricesData[product.name] || undefined;
      return {
        ...product,
        networkPrice
      };
    });
    
  } catch (error) {
    console.error(`Error fetching ${network} price data:`, error);
    return products as Product[];
  }
}

// Calculate average price per unit for specific item types
export function calculateAveragePrice(
  products: Product[], 
  itemType: string
): { averagePrice: number; amount: number } | null {
  let productWithHighestAmount: Product | null = null;
  
  // Find products of the specified type with the highest amount
  for (const product of products) {
    // Skip products without network price
    if (!product.networkPrice?.KRW) continue;
    
    // Check if the product name contains the item type
    if (product.name.includes(itemType)) {
      // Get the amount from the first fungible item (assuming it's the main item)
      const amount = product.fungible_item_list[0]?.amount || 0;
      
      // Update if this is the first match or has higher amount than previous match
      if (!productWithHighestAmount || amount > productWithHighestAmount.fungible_item_list[0]?.amount) {
        productWithHighestAmount = product;
      }
    }
  }
  
  if (productWithHighestAmount && productWithHighestAmount.networkPrice?.KRW) {
    const amount = productWithHighestAmount.fungible_item_list[0]?.amount || 0;
    if (amount > 0) {
      const averagePrice = Number((productWithHighestAmount.networkPrice.KRW / amount).toFixed(2));
      return { averagePrice, amount };
    }
  }
  
  return null;
}

// Get the product rarity color class
export function getRarityColorClass(rarity: string): string {
  switch (rarity.toLowerCase()) {
    case 'legendary': return 'bg-amber-500 text-white';
    case 'epic': return 'bg-purple-600 text-white';
    case 'rare': return 'bg-blue-600 text-white';
    case 'unique': return 'bg-green-600 text-white';
    default: return 'bg-gray-500 text-white';
  }
}

// Get the product rarity text color class
export function getRarityTextClass(rarity: string): string {
  switch (rarity.toLowerCase()) {
    case 'legendary': return 'text-amber-500';
    case 'epic': return 'text-purple-600';
    case 'rare': return 'text-blue-600';
    case 'unique': return 'text-green-600';
    default: return 'text-gray-500';
  }
}
