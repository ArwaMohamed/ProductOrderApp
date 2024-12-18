import { Product } from "./product.model";
import { User } from "./user.model";

export interface Order {
  OrderId: number;
  OrderDate: string;
  UserId: string;
  Products: OrderProduct[];
  PaymentType: string;
}

export interface OrderProduct {
  ProductId: number;
  Quantity: number;
}
