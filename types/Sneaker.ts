type Sneaker = {
  id?: string; // reserved for firestore id
  brand: string;
  name: string;
  size: number;
  color: string;
  price: number;
  image: string;
};

export default Sneaker;
