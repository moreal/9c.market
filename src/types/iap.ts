export type FungibleItem = {
  sheet_item_id: number;
  fungible_item_id: string;
  amount: number;
};

export type FavItem = {
  ticker: string;
  amount: number;
};

export type NetworkPrice = {
  KRW: number;
  USD?: number;
};

// Original product data structure from API/JSON files
export type ProductData = {
  name: string;
  order: number;
  google_sku: string;
  apple_sku: string;
  apple_sku_k: string;
  product_type: string;
  daily_limit: number | null;
  weekly_limit: number | null;
  account_limit: number | null;
  active: boolean;
  buyable: boolean;
  required_level: number | null;
  mileage: number;
  mileage_price: number | null;
  purchase_count: number;
  rarity: string;
  size: string;
  discount: number;
  l10n_key: string;
  path: string;
  bg_path: string;
  popup_path_key: string;
  open_timestamp: string | null;
  close_timestamp: string | null;
  fav_list: FavItem[];
  fungible_item_list: FungibleItem[];
};

// Domain model for Product with additional price information
export type Product = ProductData & {
  networkPrice?: NetworkPrice;
};

export type Category = {
  name: string;
  order: number;
  active: boolean;
  l10n_key: string;
  path: string;
  product_list: Product[];
};
