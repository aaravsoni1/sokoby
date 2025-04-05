'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { OrderDto } from '@/services/types';

interface RecentSalesProps {
  orders: OrderDto[];
}

export function RecentSales({ orders }: RecentSalesProps) {
  return (
    <div className="space-y-8">
      {orders.map((order) => (
        <div key={order.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`https://ui-avatars.com/api/?name=Order&background=random`} alt="Order" />
            <AvatarFallback>
              O
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              Order #{order.id?.slice(-6) || 'N/A'}
            </p>
            <p className="text-sm text-muted-foreground">
              {order.status}
            </p>
          </div>
          <div className="ml-auto font-medium">
            ${order.totalAmount.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
} 