import { useEffect, useState } from 'react';
import { getActivities } from '../helpers/getActivities';
import { ActivityInterface } from '../interfaces';

export const useFetchGetActivities = () => {
  const [activities, setActivities] = useState<ActivityInterface[]>([]);
  const getAllActivities = async () => {
    const allActivities = await getActivities();
    setActivities(allActivities);
  };
  useEffect(() => {
    getAllActivities();
  }, []);
  return { activities };
};