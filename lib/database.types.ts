// Supabase database types (profiles table).
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
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
