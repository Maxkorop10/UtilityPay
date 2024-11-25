'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { useState } from 'react';
import { InternetPaymentData, internetPaymentSchema } from './schema/schema';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/src/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { providers } from '@/src/lib/providers';
import { cn } from '@/src/lib/utils';
import { BankPicker } from '../bank-picker/picker';
import { UpdateTransactions } from '@/src/lib/actions';

export default function InternetForm() {
  const [open, setOpen] = useState(false);
  const [comboValue, setComboValue] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const {
    trigger,
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InternetPaymentData>({
    resolver: zodResolver(internetPaymentSchema),
  });

  const onSubmit = async (data: InternetPaymentData) => {
    console.log('Дані для оплати Інтернету:', {
      ...data,
    });
    const response = await fetch('/api/internet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        totalPrice: data.amount,
      }),
    });
    console.log(data);
    if (!response.ok) {
      console.error('Error happend');
    }
    await UpdateTransactions();
    reset();
  };

  return (
    <div className="w-[400px] p-6 bg-white rounded-lg shadow-md">
      <h1 className="font-bold text-2xl text-gray-800 text-left">
        Оплата інтернету
      </h1>
      <p className="text-sm text-gray-500 text-left mt-[6px]">
        Оберіть спосіб оплати
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <BankPicker selectedIndex={selectedIndex} onChange={setSelectedIndex} />
        <div>
          <Label htmlFor="accountNumber" className="text-gray-700">
            Провайдер
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={`w-full justify-between ${errors.provider ? 'border-red-500' : ''}`}
              >
                {comboValue
                  ? providers.find((provider) => provider === comboValue)
                  : 'Обрати провайдера...'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[352px] p-0">
              <Command>
                <CommandInput placeholder="Пошук провайдера..." />
                <CommandList>
                  <CommandEmpty>Провайдера не знайдено</CommandEmpty>
                  <CommandGroup>
                    {providers.map((provider, index) => (
                      <CommandItem
                        key={index}
                        value={provider}
                        className="hover:cursor-pointer"
                        onSelect={(currentValue) => {
                          setValue('provider', currentValue);
                          trigger('provider');
                          setComboValue(
                            currentValue === comboValue ? '' : currentValue
                          );
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            comboValue === provider
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {provider}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {errors.provider && (
            <p className="mt-1 text-sm text-red-600">
              {errors.provider.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="accountNumber" className="text-gray-700">
            Особовий рахунок
          </Label>
          <Input
            id="accountNumber"
            type="text"
            placeholder="Введіть номер рахунку"
            {...register('accountNumber')}
            className={errors.accountNumber ? 'border-red-500' : ''}
          />
          {errors.accountNumber && (
            <p className="mt-1 text-sm text-red-600">
              {errors.accountNumber.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="amount" className="text-gray-700">
            Сума
          </Label>
          <Input
            id="amount"
            type="text"
            placeholder="100.00"
            {...register('amount')}
            className={errors.amount ? 'border-red-500' : ''}
          />
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full bg-black hover:bg-gray-800"
          disabled={selectedIndex === null}
        >
          Оплатити
        </Button>
      </form>
    </div>
  );
}
