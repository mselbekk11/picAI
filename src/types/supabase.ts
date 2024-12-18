export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      headshot_generations: {
        Row: {
          created_at: string;
          generation_id: string;
          id: string;
          image_urls: string[] | null;
          model_id: string;
          negative_prompt: string | null;
          prompt: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          generation_id: string;
          id?: string;
          image_urls?: string[] | null;
          model_id: string;
          negative_prompt?: string | null;
          prompt: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          generation_id?: string;
          id?: string;
          image_urls?: string[] | null;
          model_id?: string;
          negative_prompt?: string | null;
          prompt?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'headshot_generations_model_id_fkey';
            columns: ['model_id'];
            isOneToOne: false;
            referencedRelation: 'headshot_models';
            referencedColumns: ['model_id'];
          },
          {
            foreignKeyName: 'headshot_generations_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      headshot_models: {
        Row: {
          created_at: string;
          eta: string;
          expires_at: string | null;
          id: string;
          images: string[];
          model_id: string;
          name: string;
          status: Database['public']['Enums']['headshotmodelstatus'];
          trained_at: string | null;
          type: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          eta: string;
          expires_at?: string | null;
          id?: string;
          images: string[];
          model_id: string;
          name: string;
          status?: Database['public']['Enums']['headshotmodelstatus'];
          trained_at?: string | null;
          type: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          eta?: string;
          expires_at?: string | null;
          id?: string;
          images?: string[];
          model_id?: string;
          name?: string;
          status?: Database['public']['Enums']['headshotmodelstatus'];
          trained_at?: string | null;
          type?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'headshot_models_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      subscriptions: {
        Row: {
          active: boolean | null;
          amount: number | null;
          created_at: string;
          id: string;
          interval: Database['public']['Enums']['billingcycle'] | null;
          start_date: string | null;
          subscription_id: string | null;
          type: Database['public']['Enums']['subscriptiontype'];
          user_email: string;
          user_id: string;
        };
        Insert: {
          active?: boolean | null;
          amount?: number | null;
          created_at?: string;
          id?: string;
          interval?: Database['public']['Enums']['billingcycle'] | null;
          start_date?: string | null;
          subscription_id?: string | null;
          type?: Database['public']['Enums']['subscriptiontype'];
          user_email: string;
          user_id: string;
        };
        Update: {
          active?: boolean | null;
          amount?: number | null;
          created_at?: string;
          id?: string;
          interval?: Database['public']['Enums']['billingcycle'] | null;
          start_date?: string | null;
          subscription_id?: string | null;
          type?: Database['public']['Enums']['subscriptiontype'];
          user_email?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'subscriptions_user_email_fkey';
            columns: ['user_email'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['email'];
          },
          {
            foreignKeyName: 'subscriptions_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          email: string;
          full_name: string | null;
          id: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          email: string;
          full_name?: string | null;
          id: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          email?: string;
          full_name?: string | null;
          id?: string;
        };
        Relationships: [];
      };
      user_credits: {
        Row: {
          id: string;
          user_id: string;
          model_credits: number;
          image_credits: number;
          last_reset_date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          model_credits?: number;
          image_credits?: number;
          last_reset_date?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          model_credits?: number;
          image_credits?: number;
          last_reset_date?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_credits_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      deduct_image_credit: {
        Args: { user_id: string };
        Returns: boolean;
      };
      deduct_model_credit: {
        Args: { user_id: string };
        Returns: boolean;
      };
      add_model_credits: {
        Args: {
          user_id: string;
          amount: number;
        };
        Returns: void;
      };
      add_image_credits: {
        Args: {
          user_id: string;
          amount: number;
        };
        Returns: void;
      };
    };
    Enums: {
      billingcycle: 'month' | 'year';
      headshotmodelstatus: 'processing' | 'finished';
      subscriptiontype: 'free' | 'standard' | 'premium';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes'] | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
