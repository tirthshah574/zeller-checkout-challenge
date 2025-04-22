import { Checkout } from '../checkout';
import { appleTV3for2, ipadBulkDiscount } from '../catalog';

describe('Checkout', () => {
    let checkout: Checkout;

    beforeEach(() => {
        checkout = new Checkout([appleTV3for2, ipadBulkDiscount]);
    });

    test('calculates regular price for single items', () => {
        checkout.scan('vga');
        expect(checkout.total()).toBe(30.00);
    });

    test('applies 3 for 2 deal on Apple TVs', () => {
        checkout.scan('atv');
        checkout.scan('atv');
        checkout.scan('atv');
        // Should only charge for 2 Apple TVs
        expect(checkout.total()).toBe(219.00);
    });

    test('applies bulk discount on iPads', () => {
        for (let i = 0; i < 5; i++) {
            checkout.scan('ipd');
        }
        // 5 iPads at bulk discount price of 499.99 each
        expect(checkout.total()).toBe(2499.95);
    });

    test('handles mixed items correctly', () => {
        checkout.scan('atv');
        checkout.scan('ipd');
        checkout.scan('ipd');
        checkout.scan('atv');
        checkout.scan('ipd');
        checkout.scan('ipd');
        checkout.scan('ipd');
        // Example scenario from requirements:
        // 2 ATVs (2 * 109.50 = 219.00)
        // 5 iPads at bulk discount (5 * 499.99 = 2499.95)
        expect(checkout.total()).toBe(2718.95);
    });

    test('handles another mixed scenario', () => {
        checkout.scan('atv');
        checkout.scan('atv');
        checkout.scan('atv');
        checkout.scan('vga');
        // Example scenario from requirements:
        // 3 ATVs (3 for 2 deal = 219.00)
        // 1 VGA adapter (30.00)
        expect(checkout.total()).toBe(249.00);
    });

    test('throws error for invalid SKU', () => {
        expect(() => checkout.scan('xyz')).toThrow("Product with SKU 'xyz' not found");
    });
});