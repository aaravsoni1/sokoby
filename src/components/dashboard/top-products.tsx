'use client';

import { ProductDto } from '@/services/types';

interface TopProductsProps {
  products: ProductDto[];
}

export function TopProducts({ products }: TopProductsProps) {
  return (
    <div className="space-y-8">
      {products.map((product) => (
        <div key={product.id} className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {product.title}
            </p>
            <p className="text-sm text-muted-foreground">
              {product.description?.slice(0, 50)}...
            </p>
          </div>
          <div className="ml-auto font-medium">
            ${product.price.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
} 