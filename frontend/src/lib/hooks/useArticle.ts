import { useEffect, useState } from 'react';
import api from '../api';
import { Article, HookResult } from '../interfaces';

const useArticle: (slug: string) => HookResult<Article | undefined> = (
  slug: string
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<Article>();
  const getArticle = async () => {
    try {
      setData((await api.getArticle(slug)) as Article);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getArticle();
  }, []);

  return {
    loading,
    error,
    data,
  };
};

export default useArticle;
