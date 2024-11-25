'use server';

import { revalidatePath } from 'next/cache';

export async function UpdateTransactions() {
  revalidatePath('/transaction-history', 'page');
}
