export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      content_creations: {
        Row: {
          created_at: string;
          id: string;
          results: Json | null;
          style: string;
          topic: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          results?: Json | null;
          style: string;
          topic: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          results?: Json | null;
          style?: string;
          topic?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'content_creations_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      image_generations: {
        Row: {
          created_at: string;
          error: string | null;
          guidance: string;
          id: string;
          image_urls: string[] | null;
          inference: string;
          model: string;
          negative_prompt: string | null;
          no_of_outputs: string;
          prediction_id: string;
          prompt: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          error?: string | null;
          guidance: string;
          id?: string;
          image_urls?: string[] | null;
          inference: string;
          model: string;
          negative_prompt?: string | null;
          no_of_outputs: string;
          prediction_id: string;
          prompt: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          error?: string | null;
          guidance?: string;
          id?: string;
          image_urls?: string[] | null;
          inference?: string;
          model?: string;
          negative_prompt?: string | null;
          no_of_outputs?: string;
          prediction_id?: string;
          prompt?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'image_generations_user_id_fkey';
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
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      voice_transcriptions: {
        Row: {
          created_at: string;
          id: string;
          summary: string;
          transcription: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          summary: string;
          transcription: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          summary?: string;
          transcription?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'voice_transcriptions_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      youtube_chats: {
        Row: {
          chat: Json | null;
          created_at: string;
          id: string;
          transcription: Json;
          url: string;
          user_id: string;
        };
        Insert: {
          chat?: Json | null;
          created_at?: string;
          id?: string;
          transcription: Json;
          url: string;
          user_id: string;
        };
        Update: {
          chat?: Json | null;
          created_at?: string;
          id?: string;
          transcription?: Json;
          url?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'youtube_chats_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
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
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
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