import type { Product } from '../types';
import creed from '../assets/CREED.webp';
import jpg from '../assets/JPG.webp';
import savauge from '../assets/SAVAUGE.webp';
import sospiro from '../assets/SOSPIRO.webp';
import xerjof from '../assets/XERJOFF.webp';
import aqua from '../assets/AQUA.webp';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'CREED AVENTUS',
    brand: 'Creed',
    category: 'designer',
    price: 2434900,
    tags: ['frutal', 'amaderado'],
    alt: 'Botella de perfume Creed Aventus en color blanco y negro',
    image: creed,
  },
  {
    id: '2',
    name: 'LE MALE ELIXIR',
    brand: 'JPG',
    category: 'designer',
    price: 1599900,
    tags: ['oriental', 'dulce'],
    alt: 'Botella de perfume Le Male Elixir en color negro y amarillo',
    image: jpg,
  },
  {
    id: '3',
    name: 'SAVAUGE EAU DE PARFUM',
    brand: 'DIOR',
    category: 'designer',
    price: 600000,
    tags: ['amaderado', 'fresco'],
    alt: 'Botella de perfume Sauvage Eau de Parfum en color blanco y negro',
    image: savauge,
  },
  {
    id: '4',
    name: 'Sospiro Vibrato',
    brand: 'Sospiro',
    category: 'niche',
    price: 1290000,
    tags: ['cítrico', 'oriental'],
    alt: 'Botella de perfume Sospiro Vibrato en color verde',
    image: sospiro,
  },
  {
    id: '5',
    name: 'Xerjoff Erba Pura',
    brand: 'Xerjoff',
    category: 'niche',
    price: 1190000,
    tags: ['cítrico', 'oriental'],
    alt: 'Botella de perfume Xerjoff Erba Pura en color turquesa',
    image: xerjof,
  },
  {
    id: '6',
    name: 'Aqua Di Gio Profondo',
    brand: 'Giorgio Armani',
    category: 'designer',
    price: 590000,
    tags: ['amaderado', 'fresco'],
    alt: 'Botella de perfume Aqua Di Gio Profondo en color azul',
    image: aqua,
  },
];
