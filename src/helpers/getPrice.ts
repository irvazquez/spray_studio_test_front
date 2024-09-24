import { VITE_BASE_API_URL } from '../data';
import { OrderInterface } from '../interfaces';

export const getPrice = async (order: OrderInterface) => {
    const url = `${VITE_BASE_API_URL}/orders`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });
  const data = await response.json();
  return data;
};
