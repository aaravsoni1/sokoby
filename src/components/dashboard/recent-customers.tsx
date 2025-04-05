'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CustomerDto } from '@/services/types';

interface RecentCustomersProps {
  customers: CustomerDto[];
}

export function RecentCustomers({ customers }: RecentCustomersProps) {
  return (
    <div className="space-y-8">
      {customers.map((customer) => (
        <div key={customer.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(customer.name)}`} alt={customer.name} />
            <AvatarFallback>
              {customer.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {customer.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {customer.email}
            </p>
          </div>
          <div className="ml-auto font-medium">
            {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'N/A'}
          </div>
        </div>
      ))}
    </div>
  );
} 