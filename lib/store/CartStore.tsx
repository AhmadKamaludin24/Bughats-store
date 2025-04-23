import {create} from 'zustand';
import { persist } from 'zustand/middleware'


type item = {
  id: number;
  uuid: string;
  name: string;
  description: string;
  slug: string;
  image: string;
  price: number;

};

type CartStore = {
  cart: item[];
  nextId: number;
  addToCart: (item: Omit<item, 'id'>) => void;
  clearCart: () => void;
  removeItem: (id: number) => void;
  totalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      nextId: 1,
      addToCart: (item) => {
        const currentId = get().nextId;
        const isAlreadyInCart = get().cart.some(i => i.uuid === item.uuid); // true/false
        if (!isAlreadyInCart) {
          const newItem = { ...item, id: currentId, qty: 1 };
          set({
            cart: [...get().cart, newItem],
            nextId: currentId + 1,
          });
        }
      },
      clearCart: () => set({ cart: [], nextId: 1 }),
      removeItem: (id) => set({ cart: get().cart.filter(i => i.id !== id) }),
      totalPrice: () => {
        const items = get().cart;
        return items.reduce((total, item) => total + item.price, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
