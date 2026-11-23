export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3"
  }
  public: {
    Tables: {
      articles: {
        Row: {
          created_at: string
          id: number
          image: string | null
          introduction: string | null
          tags: string[] | null
          text: string | null
          title: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          image?: string | null
          introduction?: string | null
          tags?: string[] | null
          text?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          image?: string | null
          introduction?: string | null
          tags?: string[] | null
          text?: string | null
          title?: string | null
        }
        Relationships: []
      }
      faq: {
        Row: {
          answer: string
          created_at: string
          id: number
          question: string
          type: string
        }
        Insert: {
          answer?: string
          created_at?: string
          id?: number
          question?: string
          type?: string
        }
        Update: {
          answer?: string
          created_at?: string
          id?: number
          question?: string
          type?: string
        }
        Relationships: []
      }
      filters: {
        Row: {
          categories: string[]
          created_at: string
          developers: string[]
          id: number
          publishers: string[]
        }
        Insert: {
          categories?: string[]
          created_at?: string
          developers?: string[]
          id?: number
          publishers?: string[]
        }
        Update: {
          categories?: string[]
          created_at?: string
          developers?: string[]
          id?: number
          publishers?: string[]
        }
        Relationships: []
      }
      games: {
        Row: {
          category: string
          cover: string
          created_at: string
          description: string | null
          developer: string
          id: number
          players: number
          publisher: string
          release_date: string
          rom: boolean
          title: string
        }
        Insert: {
          category: string
          cover: string
          created_at?: string
          description?: string | null
          developer: string
          id?: number
          players: number
          publisher: string
          release_date: string
          rom?: boolean
          title: string
        }
        Update: {
          category?: string
          cover?: string
          created_at?: string
          description?: string | null
          developer?: string
          id?: number
          players?: number
          publisher?: string
          release_date?: string
          rom?: boolean
          title?: string
        }
        Relationships: []
      }
      newsletter: {
        Row: {
          created_at: string
          email: string
          id: number
        }
        Insert: {
          created_at?: string
          email?: string
          id?: number
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          bio: string | null
          birth_date: string | null
          created_at: string
          first_name: string | null
          full_name: string | null
          id: number
          image: string | null
          last_name: string | null
          phone: string | null
          user_id: string
        }
        Insert: {
          bio?: string | null
          birth_date?: string | null
          created_at?: string
          first_name?: string | null
          full_name?: string | null
          id?: number
          image?: string | null
          last_name?: string | null
          phone?: string | null
          user_id?: string
        }
        Update: {
          bio?: string | null
          birth_date?: string | null
          created_at?: string
          first_name?: string | null
          full_name?: string | null
          id?: number
          image?: string | null
          last_name?: string | null
          phone?: string | null
          user_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string
          date: string
          game_id: number | null
          heading: string | null
          id: number
          rating: number
          review: string | null
          reviewer_id: string | null
          reviewer_name: string
        }
        Insert: {
          created_at?: string
          date?: string
          game_id?: number | null
          heading?: string | null
          id?: number
          rating: number
          review?: string | null
          reviewer_id?: string | null
          reviewer_name?: string
        }
        Update: {
          created_at?: string
          date?: string
          game_id?: number | null
          heading?: string | null
          id?: number
          rating?: number
          review?: string | null
          reviewer_id?: string | null
          reviewer_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          created_at: string
          expires_at: string | null
          id: number
          token_value: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: number
          token_value: string
          user_id?: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: number
          token_value?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      developers: { Args: never; Returns: string[] }
      games: {
        Args: {
          filter_category: string
          filter_developer: string
          filter_publisher: string
          filter_title: string
        }
        Returns: {
          category: string
          cover: string
          created_at: string
          description: string | null
          developer: string
          id: number
          players: number
          publisher: string
          release_date: string
          rom: boolean
          title: string
        }[]
        SetofOptions: {
          from: "*"
          to: "games"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      publishers: { Args: never; Returns: string[] }
    }
    Enums: {
      competition: "Triathlon" | "Olympiskt Triathlon"
      faq_type: "general" | "account" | "games"
      role: "admin" | "regular"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      competition: ["Triathlon", "Olympiskt Triathlon"],
      faq_type: ["general", "account", "games"],
      role: ["admin", "regular"],
    },
  },
} as const
