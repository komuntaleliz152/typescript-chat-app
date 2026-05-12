export interface Message {
  _id: string;
  username: string;
  content: string;
  roomId: string;
  timestamp: Date;
}

export interface Room {
  _id: string;
  name: string;
  description?: string;
  createdBy: string;
  createdAt: Date;
}

export interface User {
  id: string;
  username: string;
  roomId: string;
}
