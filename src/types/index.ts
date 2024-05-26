export type Pet = {
  createdAt: string;
  id: string;
  imageUrl: string;
  publishedAt: string;
  updated_at: string;
  tags: Tag[];
};

export type Tag = {
  photoId: string;
  tagId: string;
  tag: {
    createdAt: string;
    id: string;
    name: string;
    updated_at: string;
  };
};
