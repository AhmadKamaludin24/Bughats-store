export type ProductTypes = {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    slug: string;
    model: string[];
    createdAt?: Date;
    updatedAt?: Date;
    onClick?: () => void
}

export type CardProductProps = {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    model: string[];
    onClick: () => void;
  };
  