import { Product, PricingRule } from './types';

export const products: { [key: string]: Product } = {
    ipd: { sku: 'ipd', name: 'Super iPad', price: 549.99 },
    mbp: { sku: 'mbp', name: 'MacBook Pro', price: 1399.99 },
    atv: { sku: 'atv', name: 'Apple TV', price: 109.50 },
    vga: { sku: 'vga', name: 'VGA adapter', price: 30.00 }
};

// 3 for 2 deal on Apple TVs
export const appleTV3for2: PricingRule = {
    sku: 'atv',
    apply: (items: Product[]): number => {
        const atvItems = items.filter(item => item.sku === 'atv');
        const regularPrice = products.atv.price;
        const count = atvItems.length;
        const freeItems = Math.floor(count / 3);
        return count * regularPrice - (freeItems * regularPrice);
    }
};

// Bulk discount on Super iPads
export const ipadBulkDiscount: PricingRule = {
    sku: 'ipd',
    apply: (items: Product[]): number => {
        const ipadItems = items.filter(item => item.sku === 'ipd');
        const count = ipadItems.length;
        return count >= 4 ? count * 499.99 : count * products.ipd.price;
    }
};