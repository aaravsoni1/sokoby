// Authentication DTOs
export interface LoginDto {
  email: string;
  password: string;
}

export interface MerchantDto {
  id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface JWTTokenDto {
  type: string;
  token: string;
  merchantId?: string; 
}

// Product DTOs
export interface ProductDto {
  id?: string;
  productId?: string;
  title: string;
  storeId?: string;
  imageUrls: {
    id: string;
    imageUrl: string;
    productId: string;
  }[];
  description?: string;
  variant: {
    variantId: string;
    productId: string;
    skuCode: string;
    price: number;
    stockQuantity: number;
  }[];
  stock: number;
  status: string;
  sku: string;
  comparedPrice: number;
  price: number;
  collections: {
    id: string;
    type: string;
    storeId: string;
    vendor: string;
    products: ProductDto[] | null;
    createdAt: string;
    updatedAt: string | null;
  }[];
  createdAt?: string;
  updatedAt?: string;
}

// Product Creation DTOs
export interface ProductCreateFormData {
  title: string;
  description: string;
  price: string;
  comparedPrice: string;
  skuCode: string;
  stockQuantity: string;
  status: string;
  barcode: string;
  storeId: string;
  collection: {
    type: string;
    vendor: string;
  };
  variants: ProductVariantFormData[];
  files: File[];
}

export interface ProductVariantFormData {
  name: string;
  price: string;
  skuCode: string;
  stockQuantity: string;
}

export interface CategoryDto {
  id?: string;
  name: string;
  storeId: string;
  products?: ProductDto[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Store DTOs
export interface StoreDto {
  id?: string;
  name: string;
  domain: string;
  stripeAccountId?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  merchantId?: string;
}

// Variant DTOs
export interface VariantDto {
  id?: string;
  productId?: string;
  name: string;
  price: number;
  sku?: string;
  stockQuantity?: number;
  inventoryItemId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Inventory DTOs
export interface InventoryItemDto {
  id?: string;
  sku?: string;
  variantId?: string;
  stock?: number;
  createdAt?: Date;
}

export interface InventoryLevelDto {
  id?: string;
  inventoryItemId?: string;
  locationId?: string;
  availableQuantity?: number;
  reservedQuantity?: number;
  updatedAt?: Date;
}

// Order DTOs
export interface OrderDto {
  id?: string;
  storeId: string;
  customerId: string;
  shippingAddress: AddressDto;
  paymentId: string;
  totalAmount: number;
  discount?: DiscountDto;
  paymentMethodId?: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  orderItems?: OrderItemDto[];
  discountCode?: string;
  subtotal?: number;
  discountAmount?: number;
}

export interface OrderItemDto {
  id?: string;
  orderId: string;
  variantId: string;
  quantity: number;
  price: number;
  subtotal?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Cart DTOs
export interface CartDto {
  id?: string;
  customerId: string;
  cartItems?: CartItemDto[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartItemDto {
  id?: string;
  cartId?: string;
  variantId: string;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Payment DTOs
export interface PaymentDto {
  id?: string;
  orderId: string;
  amount: number;
  currency: string;
  stripePaymentIntentId?: string;
  status: string;
  stripeCheckoutSessionId?: string;
  createdAt?: Date;
}

export interface PaymentIntentDto {
  paymentIntentId: string;
  clientSecret: string;
  currency: string;
  amount: number;
}

// Customer DTOs
export interface CustomerDto {
  id?: string;
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  orders?: OrderDto[];
  cartId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  storeId?: string;
}

// Review DTOs
export interface ReviewDto {
  id?: string;
  orderId: string;
  customerId: string;
  productId?: string;
  variantId?: string;
  rating?: number;
  comment?: string;
  createdAt?: Date;
}

// Discount DTOs
export interface DiscountDto {
  id?: string;
  code: string;
  discountType: string;
  value: number;
  minimumOrderAmount?: number;
  validFrom?: Date;
  validUntil?: Date;
  isActive?: boolean;
  createdAt?: Date;
}

// Location DTOs
export interface LocationDto {
  id?: string;
  name: string;
  address: string;
  createdAt?: Date;
}

// Address DTO
export interface AddressDto {
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
} 