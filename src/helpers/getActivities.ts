import { VITE_BASE_API_URL } from '../data';
import { ActivityInterface } from '../pages/Home';

export const getActivities = async () => {
  const url = `${VITE_BASE_API_URL}/activities`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const data: ActivityInterface[] = await response.json();
  return data;
};
