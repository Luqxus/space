export type Board = {
  _id: string;
  authorId: string;
  authorName: string;
  imageUrl: string;
  orgId: string;
  title: string;
  _creationTime: number;
  favorite?: boolean
}
