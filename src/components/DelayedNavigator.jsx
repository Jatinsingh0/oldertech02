import { useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";

const DelayedNavigator = ({ path, delay, children, color }) => {
  const [loading, setLoading] = useState(0);
  const navigate = useNavigate();

  const handleDelayedNavigation = () => {
    // Increment the loading progress every 100 milliseconds
    const intervalId = setInterval(() => {
      setLoading((prevLoading) => {
        const nextLoading = prevLoading + 10;
        if (nextLoading >= 100) {
          // Stop the interval when loading reaches 100
          clearInterval(intervalId);
        }
        return Math.min(nextLoading, 100); // Increment by 10, max 100
      });
    }, 100);

    // Delay the navigation
    setTimeout(() => {
      setLoading(0); // Reset loading progress
      navigate(path); // Navigate after delay
    }, delay);
  };

  return (
    <div onClick={handleDelayedNavigation}>
      <LoadingBar
        height={5}
        color={color ? color : "#2f4541"}
        progress={loading}
        onLoaderFinished={() => setLoading(0)}
      />
      {children}
    </div>
  );
};

export default DelayedNavigator;
