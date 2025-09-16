export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export interface Todos {
    id: number;
    title: string;
    completed: boolean;
    userId: number
}

export  interface Comment {
  postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface Album {
  userId: number;
  id: number;
  title: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}
