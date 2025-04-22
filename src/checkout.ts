import { Product, PricingRule } from './types';
import { products } from './catalog';

export class Checkout {
    private items: Product[] = [];
    private rules: PricingRule[];

    constructor(pricingRules: PricingRule[]) {
        this.rules = pricingRules;
    }

    scan(sku: string): void {
        const product = products[sku];
        if (!product) {
            throw new Error(`Product with SKU '${sku}' not found`);
        }
        this.items.push(product);
    }

    total(): number {
        let total = 0;
        const processedSkus = new Set<string>();

        // First calculate prices for items with special rules
        for (const rule of this.rules) {
            const itemsForRule = this.items.filter(item => item.sku === rule.sku);
            if (itemsForRule.length > 0) {
                total += rule.apply(itemsForRule);
                processedSkus.add(rule.sku);
            }
        }

        // Then add regular prices for remaining items
        const regularItems = this.items.filter(item => !processedSkus.has(item.sku));
        total += regularItems.reduce((sum, item) => sum + item.price, 0);

        return total;
    }
}