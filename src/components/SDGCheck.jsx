import { useState, useEffect } from "react";
import Text from "./Text";
import Cookies from "js-cookie";
import { PORT } from "../config/server";

const SDGCheck = ({ email }) => {
  const [joinedYear, setJoinedYear] = useState("");

  function getTranslation(key, lang = "en") {
    const translations = {
      en: { joined: "Joined" },
      es: { joined: "Se unió" },
      pt: { joined: "Ingressou" },
      fr: { joined: "Rejoint" },
      nl: { joined: "Toegetreden" },
    };

    return translations[lang][key];
  }
  const joinedText = getTranslation("joined", Cookies.get("language"));

  useEffect(() => {
    const fetchSDGData = async () => {
      try {
        const response = await fetch(`${PORT}/api/plan/sdg/one`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Check if there is any SDG data associated with the email
        if (data && data.joined && data.joined.length > 0) {
          // Find the earliest year from the joined array
          const years = data.joined.map((entry) => entry.year);
          const pastYear = Math.min(...years);
          setJoinedYear(`${joinedText}: ${pastYear}`);
        } else {
          // If no SDG data is found, default to showing the current year
          const currentYear = new Date().getFullYear();
          setJoinedYear(`${joinedText}:${currentYear}`);
        }
      } catch (error) {
        console.error("Failed to fetch SDG data:", error);
        // Handle error or show default joined year
        const currentYear = new Date().getFullYear();
        setJoinedYear(`${joinedText}: ${currentYear}`);
      }
    };

    fetchSDGData();
  }, [email]);

  return <>{joinedYear}</>;
};

export default SDGCheck;
