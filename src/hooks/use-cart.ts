import {create} from 'zustand'
import {Product} from "@/payload-types";
import {persist,createJSONStorage} from "zustand/middleware";

type CartItems = {
  product:Product
}

type CartState = {
  items: CartItems[]
  addItem: (product:Product) => void
  removeItem: (productId:string) => void
  clearCart: () => void
}

export const useCart = create<CartState>()(
    persist((set)=>({
      items: [],
      addItem: (product) => set((state)=>{
          return {
            items: [...state.items, {product}]
          }
      }),
        removeItem:(productId) => set((state)=>({
            items: state.items.filter((item)=>item.product.id !== productId),
        })),
        clearCart: () => set({items: []})
    }), {name: 'cart-storage',storage:createJSONStorage(() => localStorage)})
)