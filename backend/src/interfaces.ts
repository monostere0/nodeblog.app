export interface Article {
  title: string;
  content: string;
  date: string;
  authorName: string;
  slug: string;
  image: string;
}

export interface ArticleImage {
  title: string;
  content: Buffer;
}
