import { parseISO } from "date-fns";

export const getMonthlyData = (products) => {
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const monthlyData = months.map((month) => ({
    month,
    Electronics: 0,
    Furniture: 0,
    "Home Appliances": 0,
    Others: 0,
    Published: 0,
    Draft: 0,
    Inactive: 0,
    quantity: 0,
    price: 0,
  }));

  products.forEach((p) => {
    const idx = parseISO(p.createdAt).getMonth();
    const monthObj = monthlyData[idx];

    // Category count
    if (monthObj[p.category] !== undefined) monthObj[p.category] += 1;

    // Status count
    if (monthObj[p.status] !== undefined) monthObj[p.status] += 1;

    // Quantity & Price
    monthObj.quantity += p.quantityInStock;
    monthObj.price += p.price;
  });

  return monthlyData;
};
