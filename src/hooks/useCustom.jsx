import { useEffect, useState } from "react";

export default function useCustom() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/apps`)
      .then((response) => response.json())
      .then((data) => {
        setApps(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return { apps, loading };
}
