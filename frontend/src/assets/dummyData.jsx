
import Apples from '../assets/Apples.png'; // ← Replace with your actual image path
import Bananas from "../assets/Bananas.png"
import Strawberries from "../assets/Strawberries.png"
import Orange from "../assets/Oranges.png"
import Grapes from "../assets/Grapes.png"
import Spinach from "../assets/Spinach.png"
import BellPeppers from "../assets/BellPeppers.png"
import Tomato from "../assets/Tomatoes.png"
import Papaya from "../assets/Papaya.png"
import DragonFruit from '../assets/Dragon Fruit.png'
import Kiwi from "../assets/Kiwi.png"
import Potato from "../assets/Potato.png"
import LadyFinger from "../assets/LadyFinger.png"
import Cucumber from "../assets/Cucumber.png"
import Onion from "../assets/Onion.png"
import Garlic from "../assets/Garlic.png"
import Yogurt from "../assets/Yogurt.png"
import Ghee from "../assets/Ghee.png"
import CheddarCheese from "../assets/CheddarCheese.png"
import Butter from "../assets/Butter.png"
import Milk from "../assets/Milk.png"
import Cream from "../assets/SourCream.png"
import Paneer from "../assets/Paneer.png"
import IceCream from "../assets/IceCream.png"
import Water from "../assets/Water.png"
import OrangeJuice from "../assets/OrangeJuice.png"
import Coffee from "../assets/Coffee.png"
import Tea from "../assets/Tea.png"
import EnergyDrink from "../assets/EnergyDrink.png"
import CoconutWater from "../assets/CoconutWater.png"
import Cola from "../assets/Cola.png"
import Lassi from "../assets/Lassi.png"
import Cookies from "../assets/Cookies.png"
import Chips from "../assets/PotatoChips.png"
import Nuts from "../assets/MixedNuts.png"
import Granola from "../assets/GranolaBars.png"
import Popcorn from "../assets/Popcorn.png"
import ChocolateBar from "../assets/Chocolate Bar.png"
import TrailMix from "../assets/TrailMix.png"
import Pretzels from "../assets/Pretzels.png"
import Lobster from "../assets/Lobster.png"
import Crab from "../assets/Crab.png"
import Scallops from "../assets/Scallops.png"
import Mussels from "../assets/Mussels.png"
import Oysters from "../assets/Oysters.png"
import KingCrab from "../assets/KingCrab.png"
import Anchovies from "../assets/Anchovies.png"
import SmokehouseMackerel from "../assets/SmokehouseMackerel.png"
import Sourdough from "../assets/SourdoughLoaf.png"
import Brioche from "../assets/BriocheBun.png"
import Baguette from "../assets/Baguette.png"
import BananaBread from "../assets/BananaBread.png"
import ChocolateDonut from "../assets/ChocolateDonut.png"
import Eclair from "../assets/Eclair.png"
import PoundCake from "../assets/PoundCake.png"
import FocacciaBread from "../assets/Focaccia.png"
import LambChops from "../assets/Lamb Chops.png"
import TurkeyBreast from "../assets/Turkey Breast.png"
import VealCutlet from "../assets/Veal Cutlet.png"
import BeefSteak from "../assets/Beef Steak.png"
import DuckBreast from "../assets/Duck Breast.png"
import Ham from "../assets/Ham.png"
import MeatBalls from "../assets/Meatballs.png"
import PorkRibs from "../assets/Pork Ribs.png"
// Categories data
import {
  GiHairStrands,
  GiFaceToFace,
  GiBodyBalance,
  GiLipstick
} from 'react-icons/gi';

export const categories = [
  {
    name: 'Haircare',
    icon: <GiHairStrands className="text-pink-500 text-2xl" />
  },
  {
    name: 'Skincare',
    icon: <GiFaceToFace className="text-blue-500 text-2xl" />
  },
  {
    name: 'Bodycare',
    icon: <GiBodyBalance className="text-green-500 text-2xl" />
  },
  {
    name: 'Lip & Bath',
    icon: <GiLipstick className="text-red-500 text-2xl" />
  }
];


// Products data with more items
export const products = [
  // Haircare
  { id: 1, name: 'Aloe Vera Shampoo', price: 150, category: 'Haircare', image: Apples },
  { id: 2, name: 'Hibiscus Shampoo', price: 160, category: 'Haircare', image: Bananas },
  { id: 3, name: 'Moringa & Neem Shampoo', price: 170, category: 'Haircare', image: Strawberries },
  { id: 4, name: 'Transparent Shampoo', price: 140, category: 'Haircare', image: Orange },
  { id: 5, name: 'Peppermint Shampoo', price: 155, category: 'Haircare', image: Grapes },
  { id: 6, name: 'Rosemary Shampoo', price: 165, category: 'Haircare', image: DragonFruit },
  { id: 7, name: 'Argan Hair Conditioner', price: 180, category: 'Haircare', image: Kiwi },
  { id: 8, name: 'Hibiscus Hair Conditioner', price: 175, category: 'Haircare', image: Papaya },
  { id: 9, name: 'Amla Hair Conditioner', price: 185, category: 'Haircare', image: Spinach },
  { id: 10, name: 'Tea Tree Hair Conditioner', price: 190, category: 'Haircare', image: BellPeppers },
  { id: 11, name: 'Hair Serum', price: 200, category: 'Haircare', image: Tomato },
  { id: 12, name: 'Hair Mask', price: 220, category: 'Haircare', image: Potato },
  { id: 13, name: 'Hair Butter', price: 210, category: 'Haircare', image: LadyFinger },
  { id: 14, name: 'Creamy Hair Butter', price: 230, category: 'Haircare', image: Cucumber },
  { id: 15, name: 'Herbal Hair Oil', price: 240, category: 'Haircare', image: Onion },
  { id: 16, name: 'Hair Growth Oil', price: 250, category: 'Haircare', image: Garlic },
  { id: 17, name: 'Herbal Shampoo Powder', price: 135, category: 'Haircare', image: Yogurt },
  { id: 18, name: 'Herbal Hair Pack', price: 195, category: 'Haircare', image: Ghee },
  { id: 19, name: 'Herbal Hair Dye', price: 260, category: 'Haircare', image: CheddarCheese },

  // Skincare
  { id: 20, name: 'Face Cleanser', price: 120, category: 'Skincare', image: Butter },
  { id: 21, name: 'Face Scrub', price: 130, category: 'Skincare', image: Milk },
  { id: 22, name: 'Face Mask', price: 140, category: 'Skincare', image: Cream },
  { id: 23, name: 'Face Toner', price: 110, category: 'Skincare', image: Paneer },
  { id: 24, name: 'Face Mist', price: 100, category: 'Skincare', image: IceCream },
  { id: 25, name: 'Face Serum', price: 300, category: 'Skincare', image: Water },
  { id: 26, name: 'Herbal Face Cream', price: 250, category: 'Skincare', image: OrangeJuice },
  { id: 27, name: 'Saffron Night Cream', price: 350, category: 'Skincare', image: Coffee },

  // Bodycare
  { id: 28, name: 'Herbal Body Lotion', price: 180, category: 'Bodycare', image: Tea },
  { id: 29, name: 'Henna Body Lotion', price: 190, category: 'Bodycare', image: EnergyDrink },
  { id: 30, name: 'Licorice Body Lotion', price: 185, category: 'Bodycare', image: CoconutWater },
  { id: 31, name: 'Green Tea Body Lotion', price: 175, category: 'Bodycare', image: Cola },
  { id: 32, name: 'Lavender & Rose Body Lotion', price: 200, category: 'Bodycare', image: Lassi },
  { id: 33, name: 'Herbal Moisturizer', price: 170, category: 'Bodycare', image: Cookies },

  // Lip & Bath
  { id: 34, name: 'Lip Balm', price: 80, category: 'Lip & Bath', image: Chips },
  { id: 35, name: 'Lip Scrub', price: 90, category: 'Lip & Bath', image: Nuts },
  { id: 36, name: 'Lip Gloss', price: 100, category: 'Lip & Bath', image: Granola },
  { id: 37, name: 'Herbal Bath Salt', price: 150, category: 'Lip & Bath', image: Popcorn },
  { id: 38, name: 'Foot Soak Salt', price: 160, category: 'Lip & Bath', image: ChocolateBar },
  { id: 39, name: 'Body Scrub', price: 140, category: 'Lip & Bath', image: TrailMix },
  { id: 40, name: 'Herbal Body Wash', price: 130, category: 'Lip & Bath', image: Pretzels },
];

export const orders = [
    {
      id: "ORD-78901",
      userId: "user-12345",
      date: "2023-06-15",
      deliveryDate: "2023-06-20",
      status: "Delivered",
      paymentStatus: "Paid",
      paymentMethod: "Credit Card",
      total: 124.95,
      customer: {
        name: "Alex Johnson",
        phone: "+1 (555) 123-4567",
        email: "alex.johnson@example.com",
        address: "123 Main Street, Apt 4B, New York, NY 10001"
      },
      items: [
        {
          id: "item-001",
          name: "Premium Wireless Headphones",
          price: 89.99,
          quantity: 1,
          image: ""
        },
        {
          id: "item-002",
          name: "Phone Case",
          price: 24.99,
          quantity: 2,
          image: ""
        }
      ],
      notes: "Please leave package at the front desk if I'm not home"
    },
    {
      id: "ORD-78902",
      userId: "user-12345",
      date: "2023-06-20",
      deliveryDate: "2023-06-25",
      status: "Processing",
      paymentStatus: "Paid",
      paymentMethod: "PayPal",
      total: 67.50,
      customer: {
        name: "Alex Johnson",
        phone: "+1 (555) 123-4567",
        email: "alex.johnson@example.com",
        address: "123 Main Street, Apt 4B, New York, NY 10001"
      },
      items: [
        {
          id: "item-003",
          name: "Smart Watch Band",
          price: 19.99,
          quantity: 1,
          image: ""
        },
        {
          id: "item-004",
          name: "Screen Protector",
          price: 11.99,
          quantity: 4,
          image: ""
        }
      ]
    },
    {
      id: "ORD-78903",
      userId: "user-12345",
      date: "2023-06-25",
      deliveryDate: "2023-06-30",
      status: "Shipped",
      paymentStatus: "Paid",
      paymentMethod: "Credit Card",
      total: 42.25,
      customer: {
        name: "Alex Johnson",
        phone: "+1 (555) 123-4567",
        email: "alex.johnson@example.com",
        address: "123 Main Street, Apt 4B, New York, NY 10001"
      },
      items: [
        {
          id: "item-005",
          name: "USB-C Charging Cable",
          price: 14.99,
          quantity: 2,
          image: ""
        },
        {
          id: "item-006",
          name: "Portable Power Bank",
          price: 29.99,
          quantity: 1,
          image: ""
        }
      ]
    }
  ];