export interface ProfileProps {
  profileInfo: {
    fullname: string;
    phone: string;
    addresses: {
      address: string;
      id: number;
      userId: number;
    }[];
  };
}
