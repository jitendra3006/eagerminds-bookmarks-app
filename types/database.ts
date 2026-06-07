export type Profile = {
  id: string;
  email: string;
  handle: string;
  full_name: string | null;
  created_at: string;
};

export type Bookmark = {
  id: string;
  user_id: string;
  title: string;
  url: string;
  description: string | null;
  is_public: boolean;
  created_at: string;
};

type ProfilesTable = {
  Row: Profile;
  Insert: {
    id: string;
    email: string;
    handle: string;
    full_name?: string | null;
    created_at?: string;
  };
  Update: {
    email?: string;
    handle?: string;
    full_name?: string | null;
  };
  Relationships: [];
};

type BookmarksTable = {
  Row: Bookmark;
  Insert: {
    id?: string;
    user_id: string;
    title: string;
    url: string;
    description?: string | null;
    is_public?: boolean;
    created_at?: string;
  };
  Update: {
    title?: string;
    url?: string;
    description?: string | null;
    is_public?: boolean;
  };
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      profiles: ProfilesTable;
      bookmarks: BookmarksTable;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
