import { products } from './data/products';
const p1 = products.find(p => p.category === "Laptops");
const p2 = products.find(p => p.category === "Gaming");
const p3 = products.find(p => p.category === "CCTV");
const p4 = products.find(p => p.category === "Desktops");

console.log(p1?.id, p1?.name);
console.log(p2?.id, p2?.name);
console.log(p3?.id, p3?.name);
console.log(p4?.id, p4?.name);
