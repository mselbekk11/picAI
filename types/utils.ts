import { Database } from './supabase';

export type TypeQrCodeGeneration = Database['public']['Tables']['qr_code_generations']['Row'];
