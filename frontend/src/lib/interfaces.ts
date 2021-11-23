export interface Article {
  id: string;
  title: string;
  content: string;
  date: string;
  slug: string;
  authorName: string;
}

export interface HookResult<T> {
  loading: boolean;
  error?: Error;
  data: T;
}
