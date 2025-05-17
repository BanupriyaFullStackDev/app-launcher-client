import { useEffect, useState } from "react";

export default function useCustom() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/apps`)
      .then((response) => response.json())
      .then((data) => {
        setApps(data);
      })
      .catch((err) => console.log(err));
  };

  return apps;
}
