export interface INewsItem {
  id: string;
  title: string;
  description: string;
  author: {
    id: string;
    fullname: string | null;
    email: string;
    avatar: string | null;
  };
  created_at: string;
  updated_at: string;
}
