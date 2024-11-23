import { Dispatch, SetStateAction } from 'react';

export interface BankPickerProps {
  selectedIndex: number | null;
  onChange: Dispatch<SetStateAction<number | null>>;
}
