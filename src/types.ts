export interface Product {
    sku: string;
    name: string;
    price: number;
}

export interface PricingRule {
    sku: string;
    apply: (items: Product[]) => number;
}

export interface CartItem {
    product: Product;
    quantity: number;
}