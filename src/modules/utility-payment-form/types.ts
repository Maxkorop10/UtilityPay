export interface PaymentInfoProps {
  totalPrice: number;
  address: string;

  type: 'debts' | 'cart/pay';
}
