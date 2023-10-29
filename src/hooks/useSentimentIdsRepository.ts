import { useState, useEffect } from 'react';

export default () => {
  const [sentimentsIds, setSentimentsIds] = useState<string[]>(() => {
    const storedIds = localStorage.getItem('sentimentsIds');
    return storedIds ? JSON.parse(storedIds) : [];
  });

  useEffect(() => {
    localStorage.setItem('sentimentsIds', JSON.stringify(sentimentsIds));
  }, [sentimentsIds]);

  const add = (id: string): void => {
    setSentimentsIds((prevIds) => [...prevIds, id]);
  };

  const remove = (id: string): void => {
    setSentimentsIds((prevIds) => prevIds.filter((prevId) => prevId !== id));
  };

  const getAll = (): string[] => sentimentsIds;

  return {
    add,
    remove,
    getAll
  };
};
