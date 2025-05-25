export interface Post {
  title: string;
  content: string;
  tag?: TAG;
  img?: string;
  created_at?: string;
}

enum TAG {
  life = 1,
  code = 2,
  reactjs = 3,
  php = 4,
  javascript = 5,
}
