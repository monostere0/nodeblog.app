import { useEffect, useState } from 'react';
import api from '../api';
import { Article, HookResult } from '../interfaces';

const useArticles: () => HookResult<Article[]> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<Article[]>([]);
  const getArticles = async () => {
    try {
      setData((await api.getArticles()) as Article[]);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getArticles();
  }, []);

  return {
    loading,
    error,
    data,
  };
};

export default useArticles;
