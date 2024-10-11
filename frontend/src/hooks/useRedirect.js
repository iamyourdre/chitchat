import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const useRedirect = () => {
  const navigate = useNavigate();

  const redirect = useCallback((url, text, success) => {
    navigate(url, { state: { text: text, success: success } });
  }, [navigate]);

  return redirect;
};

export default useRedirect;
