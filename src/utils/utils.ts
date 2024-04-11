import { toast } from '@/components/ui/use-toast';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const errorToast = (description: string, title?: string) =>
  toast({ title, description, variant: 'destructive' });

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sentenceCase(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
