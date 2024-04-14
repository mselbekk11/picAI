import { Database } from './supabase';

export type TypeHeadshotModel = Database['public']['Tables']['headshot_models']['Row'];
export type TypeHeadshotGeneration = Database['public']['Tables']['headshot_generations']['Row'];
