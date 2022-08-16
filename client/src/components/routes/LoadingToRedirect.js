import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(3);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => (--currentCount))
      if (count === 0) {
        navigate("/");
      }
    }, 1000)
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div className='container p-5 text-center'>
      <p>Redirect in {count} seconds</p>
    </div>
  )
}

export default LoadingToRedirect;