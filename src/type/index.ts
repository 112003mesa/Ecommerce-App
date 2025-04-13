export type ImageGarareyProps = {
    img: string;
  }

export type LinksGarareyProps = {
     id: string;
    img: string;
    title: string;
    link: string;
}
export type MyComponentProps = {
  MyComp: React.ReactNode;
}
// Product Type
export type Product = {
  id: string;
  img: string;
  title: string;
  categere: string;
  priceUs: number;
  priceKwd: number;
  maxQuantity: number;
  imgs: string[];
}
export interface CartItem extends Product {
  quantity: number;
}