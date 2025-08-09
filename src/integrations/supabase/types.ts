export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      assets: {
        Row: {
          category: string | null
          created_at: string
          currency: string
          dao_id: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          owner_id: string | null
          owner_type: string | null
          price: number
          status: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          currency?: string
          dao_id?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          owner_id?: string | null
          owner_type?: string | null
          price: number
          status?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          currency?: string
          dao_id?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          owner_id?: string | null
          owner_type?: string | null
          price?: number
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assets_dao_id_fkey"
            columns: ["dao_id"]
            isOneToOne: false
            referencedRelation: "daos"
            referencedColumns: ["id"]
          },
        ]
      }
      bids: {
        Row: {
          asset_id: string | null
          created_at: string
          created_by: string | null
          currency: string
          current_price: number | null
          description: string | null
          end_date: string
          id: string
          starting_price: number
          status: string | null
          title: string
          updated_at: string
          winner_id: string | null
        }
        Insert: {
          asset_id?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          current_price?: number | null
          description?: string | null
          end_date: string
          id?: string
          starting_price: number
          status?: string | null
          title: string
          updated_at?: string
          winner_id?: string | null
        }
        Update: {
          asset_id?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          current_price?: number | null
          description?: string | null
          end_date?: string
          id?: string
          starting_price?: number
          status?: string | null
          title?: string
          updated_at?: string
          winner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bids_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          category: string | null
          created_at: string
          creator_id: string | null
          creator_type: string | null
          currency: string
          dao_id: string | null
          description: string | null
          end_date: string | null
          id: string
          image_url: string | null
          raised_amount: number | null
          status: string | null
          target_amount: number
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          creator_id?: string | null
          creator_type?: string | null
          currency?: string
          dao_id?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          raised_amount?: number | null
          status?: string | null
          target_amount: number
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          creator_id?: string | null
          creator_type?: string | null
          currency?: string
          dao_id?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          raised_amount?: number | null
          status?: string | null
          target_amount?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_dao_id_fkey"
            columns: ["dao_id"]
            isOneToOne: false
            referencedRelation: "daos"
            referencedColumns: ["id"]
          },
        ]
      }
      dao_members: {
        Row: {
          dao_id: string | null
          id: string
          joined_at: string
          role: string | null
          user_id: string | null
        }
        Insert: {
          dao_id?: string | null
          id?: string
          joined_at?: string
          role?: string | null
          user_id?: string | null
        }
        Update: {
          dao_id?: string | null
          id?: string
          joined_at?: string
          role?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dao_members_dao_id_fkey"
            columns: ["dao_id"]
            isOneToOne: false
            referencedRelation: "daos"
            referencedColumns: ["id"]
          },
        ]
      }
      daos: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          image_url: string | null
          member_count: number | null
          name: string
          treasury_balance: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          member_count?: number | null
          name: string
          treasury_balance?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          member_count?: number | null
          name?: string
          treasury_balance?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          id: string
          is_admin: boolean | null
          mobile: string | null
          updated_at: string
          user_id: string
          username: string | null
          wallet_address: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_admin?: boolean | null
          mobile?: string | null
          updated_at?: string
          user_id: string
          username?: string | null
          wallet_address?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_admin?: boolean | null
          mobile?: string | null
          updated_at?: string
          user_id?: string
          username?: string | null
          wallet_address?: string | null
        }
        Relationships: []
      }
      proposal_votes: {
        Row: {
          created_at: string
          id: string
          proposal_id: string | null
          vote_type: string
          voter_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          proposal_id?: string | null
          vote_type: string
          voter_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          proposal_id?: string | null
          vote_type?: string
          voter_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "proposal_votes_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      proposals: {
        Row: {
          amount: number | null
          created_at: string
          currency: string | null
          dao_id: string | null
          description: string | null
          end_date: string | null
          id: string
          proposal_type: string
          proposer_id: string | null
          status: string | null
          target_asset_id: string | null
          target_campaign_id: string | null
          title: string
          updated_at: string
          votes_abstain: number | null
          votes_against: number | null
          votes_for: number | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          currency?: string | null
          dao_id?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          proposal_type: string
          proposer_id?: string | null
          status?: string | null
          target_asset_id?: string | null
          target_campaign_id?: string | null
          title: string
          updated_at?: string
          votes_abstain?: number | null
          votes_against?: number | null
          votes_for?: number | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          currency?: string | null
          dao_id?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          proposal_type?: string
          proposer_id?: string | null
          status?: string | null
          target_asset_id?: string | null
          target_campaign_id?: string | null
          title?: string
          updated_at?: string
          votes_abstain?: number | null
          votes_against?: number | null
          votes_for?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "proposals_dao_id_fkey"
            columns: ["dao_id"]
            isOneToOne: false
            referencedRelation: "daos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposals_target_asset_id_fkey"
            columns: ["target_asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposals_target_campaign_id_fkey"
            columns: ["target_campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
