import { useEffect, useState } from 'react';
import { getPrice } from '../helpers/getPrice';
import { GetOrderPriceItem } from '../interfaces';

export const useFetchGetPriceOrder = (items: GetOrderPriceItem[]) => {
  const [price, setPrice] = useState();
  useEffect(() => {
    const getTotalPrice = async () => {
      const priceOrderResponse = await getPrice({
        items,
      });
      setPrice(priceOrderResponse);
    };
    if (items.length) {
      getTotalPrice();
    }
  }, [items]);
  if (!items.length) {
    return {
      price: 0
    };
  }
  return { price };
};