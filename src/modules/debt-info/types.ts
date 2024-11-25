export interface DebtInfoProps {
  debts: {
    id: number;
    addressId: number;
    availableServiceId: number;
    price: number;
    availableService: {
      name: string;
    };
    address: {
      address: string;
    };
  }[];
}
