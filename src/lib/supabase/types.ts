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
      articles: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          content: string;
          category: string;
          cover_image: string | null;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt: string;
          content: string;
          category?: string;
          cover_image?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          excerpt?: string;
          content?: string;
          category?: string;
          cover_image?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          slug: string;
          title: string;
          brand: string | null;
          category: string;
          short_description: string;
          description: string | null;
          image_url: string | null;
          gallery: string[] | null;
          unit: string | null;
          min_order: number | null;
          featured: boolean;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          brand?: string | null;
          category: string;
          short_description: string;
          description?: string | null;
          image_url?: string | null;
          gallery?: string[] | null;
          unit?: string | null;
          min_order?: number | null;
          featured?: boolean;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          brand?: string | null;
          category?: string;
          short_description?: string;
          description?: string | null;
          image_url?: string | null;
          gallery?: string[] | null;
          unit?: string | null;
          min_order?: number | null;
          featured?: boolean;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      realisations: {
        Row: {
          id: string;
          slug: string;
          title: string;
          category: string;
          category_id: string;
          description: string | null;
          image_url: string;
          featured: boolean;
          display_order: number | null;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          category: string;
          category_id: string;
          description?: string | null;
          image_url: string;
          featured?: boolean;
          display_order?: number | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          category?: string;
          category_id?: string;
          description?: string | null;
          image_url?: string;
          featured?: boolean;
          display_order?: number | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      leads: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          phone: string | null;
          source: string;
          message: string | null;
          product_id: string | null;
          metadata: Json;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          phone?: string | null;
          source?: string;
          message?: string | null;
          product_id?: string | null;
          metadata?: Json;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          phone?: string | null;
          source?: string;
          message?: string | null;
          product_id?: string | null;
          metadata?: Json;
          status?: string;
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

/* ---------- Helpers de commodité ---------- */

export type Article = Database["public"]["Tables"]["articles"]["Row"];
export type ArticleInsert = Database["public"]["Tables"]["articles"]["Insert"];
export type ArticleUpdate = Database["public"]["Tables"]["articles"]["Update"];

export type Product = Database["public"]["Tables"]["products"]["Row"];
export type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];
export type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];

export type Realisation = Database["public"]["Tables"]["realisations"]["Row"];
export type RealisationInsert =
  Database["public"]["Tables"]["realisations"]["Insert"];
export type RealisationUpdate =
  Database["public"]["Tables"]["realisations"]["Update"];

export type Lead = Database["public"]["Tables"]["leads"]["Row"];
export type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"];
export type LeadUpdate = Database["public"]["Tables"]["leads"]["Update"];