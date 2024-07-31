/* typescript definitions */
import { ReactNode } from "react";

export interface Item {
  _id: number; // Auto unique ID (assuming it's a number)
  name: string;
  description: string;
  price: number; // Number or double for price
  size: number | string; // Assuming size is a number
  images: string[]; // Array of image filenames (assuming strings)
  storeId: number; // ID of the store (assuming it's a number)
  storeName: string; // Name of the store
  category: number; // ID of the category (assuming it's a number)
  email: string;
};

export interface Itemv2 {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[]; // Array of image URLs or Base64 strings
}

export interface CartItem {
  _id: string;
  quantity: number;
  item: Itemv2;
  totalPrice: number; // Add totalPrice field
}

export interface CardProps {
  item: Itemv2;
  quantity: number;
  totalPrice: number; // Add totalPrice to props
  onIncrease: () => void;
  onDecrease: () => void;
}

export type User = {
  id: string;
  location: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  storeName: string;
};

export interface ItemPageProps {
  item: Item;
  handleDelete: (itemId: number, itemEmail: string) => void;
}

export type Review = {_id: string, rating: number, itemId: string}

export interface LayoutProps {
  children: ReactNode;
}