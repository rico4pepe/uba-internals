// useInactivityLogout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useInactivityLogout = (timeoutDuration = 30 * 60 * 1000) => {
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        // Clear token and redirect to sign-in
        localStorage.removeItem('token');
        navigate('/'); // Redirect to the sign-in page
      }, timeoutDuration);
    };

    const handleActivity = () => {
      resetTimer();
    };

    // Event listeners for user activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('scroll', handleActivity);

    // Start the timer
    resetTimer();

    // Cleanup the event listeners on component unmount
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
    };
  }, [navigate, timeoutDuration]);
};

export default useInactivityLogout;
