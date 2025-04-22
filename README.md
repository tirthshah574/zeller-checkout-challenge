# Zeller Computer Store Checkout System

A TypeScript implementation of a checkout system for Zeller's computer store, featuring flexible pricing rules and special discounts.

## Features

- 3 for 2 deal on Apple TVs
- Bulk discount on Super iPads (> 4 units)
- Flexible pricing rules system
- Unit tested

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run tests:
```bash
npm test
```

## Example Usage

```typescript
const co = new Checkout([appleTV3for2, ipadBulkDiscount]);
co.scan('atv');
co.scan('ipd');
co.total();
```

## Test Scenarios

- Scenario 1: SKUs Scanned: atv, atv, atv, vga
  - Total expected: $249.00

- Scenario 2: SKUs Scanned: atv, ipd, ipd, atv, ipd, ipd, ipd
  - Total expected: $2718.95