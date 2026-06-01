// Supabase database types (profiles, assets tables).
// Regenerate with: npx supabase gen types typescript --project-id <id>

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          role: string;
          tagline: string;
          bio: string;
          skills: string;
          avatar: string;
          username: string | null;
          is_published: boolean;
          links: Json;
          projects: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string;
          role?: string;
          tagline?: string;
          bio?: string;
          skills?: string;
          avatar?: string;
          username?: string | null;
          is_published?: boolean;
          links?: Json;
          projects?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          role?: string;
          tagline?: string;
          bio?: string;
          skills?: string;
          avatar?: string;
          username?: string | null;
          is_published?: boolean;
          links?: Json;
          projects?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      assets: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          slug: string | null;
          data: Json;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          title: string;
          slug?: string | null;
          data?: Json;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: string;
          title?: string;
          slug?: string | null;
          data?: Json;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_username_available: {
        Args: {
          p_username: string;
          p_user_id?: string;
        };
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
