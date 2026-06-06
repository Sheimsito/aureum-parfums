import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";

export type Product = {
  id: string;
  name: string;
  brand: string;
  family: string;
  price: number;
  tier: "niche" | "designer";
  image: string;
};

export const products: Product[] = [
  { id: "1", name: "Oud Nocturne", brand: "Maison Aureum", family: "Woody", price: 340, tier: "niche", image: p1 },
  { id: "2", name: "Velours Noir", brand: "Plamitra", family: "Oriental", price: 285, tier: "niche", image: p2 },
  { id: "3", name: "Ombre Solaire", brand: "Atelier Lune", family: "Amber", price: 195, tier: "designer", image: p3 },
  { id: "4", name: "Ambre Doré", brand: "Sève & Co.", family: "Amber", price: 89, tier: "designer", image: p4 },
  { id: "5", name: "Cuir Sauvage", brand: "Le Cabinet", family: "Leather", price: 410, tier: "niche", image: p5 },
  { id: "6", name: "Iris Pâle", brand: "Maison Aureum", family: "Floral", price: 260, tier: "niche", image: p6 },
];
