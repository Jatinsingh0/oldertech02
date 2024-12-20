import { useState, useEffect } from "react";
import Text from "../../components/Text";

import { PORT } from "../../config/server";
import Cookies from "js-cookie";

export default function ProfileComponents({
  type,
  email,
  onYearDataAvailabilityChange,
}) {
  const defaultYear = "2023";
  const [selectedYear, setSelectedYear] = useState(defaultYear); // Ensure it's a string for the select value
  const [selectedMonth, setSelectedMonth] = useState("");
  const [data, setData] = useState({}); // This will hold the arranged data

  async function fetchSDGData() {
    const response = await fetch(`${PORT}/api/plan/sdg/one`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch SDG data");
    }

    const rawData = await response.json();
    const arrangedData = arrangeData(rawData.joined);

    setData(arrangedData); // Store the arranged data
    checkYearDataAvailability(selectedYear, arrangedData);
  }
  const checkYearDataAvailability = (year, data) => {
    const isAvailable = data[year] && Object.keys(data[year]).length > 1; // Checks for more than just the plans key
    onYearDataAvailabilityChange(isAvailable); // Inform parent about the data availability
  };

  useEffect(() => {
    fetchSDGData();

    const year = Cookies.get("profileYear");

    if (year) {
      setSelectedYear(year);
    } else {
      setSelectedYear(defaultYear);
    }
  }, [email]); // Fetch data on component mount and email change

  function arrangeData(dataArray) {
    let outputData = {};

    dataArray.forEach((item) => {
      const yearData = {
        plans: item.plans, // Keep the plans information for each year
      };

      const months = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
      ];

      months.forEach((month) => {
        if (
          item[month] &&
          (item[month].Benviadas > 0 || item[month].Brecibidas > 0)
        ) {
          // Only include the month if either Benviadas or Brecibidas is greater than 0
          const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1);
          yearData[formattedMonth] = {
            benviadas: item[month].Benviadas,
            brecibidas: item[month].Brecibidas,
          };
        }
      });

      // Only add the year to outputData if it has at least one month with data
      if (Object.keys(yearData).length > 1) {
        // Checks if there's more than just the plans key
        outputData[item.year] = yearData;
      }
    });

    return outputData;
  }

  const updateDataForFirstMonth = (year) => {
    const months = Object.keys(data[year] || {});
    if (months.length > 0) {
      const firstMonth = months.find(
        (month) => data[year][month].benviadas || data[year][month].brecibidas
      );
      setSelectedMonth(firstMonth);
    }
  };

  useEffect(() => {
    updateDataForFirstMonth(selectedYear);
    checkYearDataAvailability(selectedYear, data);
  }, [selectedYear, data]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    Cookies.set("profileYear", e.target.value);
  };

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
  };

  const renderDataDisplay = () => {
    if (
      !selectedMonth ||
      !data[selectedYear] ||
      !data[selectedYear][selectedMonth]
    ) {
      return (
        <>
          <img
            src="history-new.png"
            alt="pannel"
            style={{ height: "auto", width: 322 }}
          />
          ;
        </>
      );
    }

    const { benviadas, brecibidas } = data[selectedYear][selectedMonth];
    const plans = data[selectedYear].plans;

    const bothZero = benviadas === 0 && brecibidas === 0;
    const benviadasAvailable = benviadas !== 0;
    const brecibidasAvailable = brecibidas !== 0;

    if (bothZero) {
      return (
        <img
          src="history-new.png"
          alt="pannel"
          style={{ height: "auto", width: 322 }}
        />
      );
    } else {
      return (
        <>
          {benviadasAvailable && (
            <div className="bags-history">
              <div className="title-bag-history">
                <Text name="send" />
              </div>
              <div className="order-history-details">
                <div
                  className="bag-image"
                  style={{
                    backgroundImage:
                      type !== "Hair"
                        ? "url(/loreal-bag-image.png)"
                        : "url(/normal-bag.png)",
                  }}
                ></div>
                <div className="order-history-details-map">
                  <b>ClicRecycle</b>
                  <br />
                  <span>{plans}</span>
                  <br />
                  <span>Qty: {benviadas} </span>
                  <br />
                  <span>
                    Status: <b>Done</b>{" "}
                  </span>
                  <br />
                </div>
              </div>
            </div>
          )}
          {brecibidasAvailable && (
            <div className="bags-history" style={{ marginTop: 18 }}>
              <div className="title-bag-history">
                <Text name="received" />
              </div>
              <div className="order-history-details">
                <div
                  className="bag-image"
                  style={{
                    backgroundImage:
                      type !== "Hair"
                        ? "url(/loreal-bag-image.png)"
                        : "url(/normal-bag.png)",
                  }}
                ></div>
                <div className="order-history-details-map">
                  <b>ClicRecycle</b>
                  <br />
                  <span>{plans}</span>
                  <br />
                  <span>Qty: {brecibidas} </span>
                  <br />
                  <span>
                    Status: <b> Done</b>{" "}
                  </span>
                  <br />
                </div>
              </div>
            </div>
          )}
        </>
      );
    }
  };

  return (
    <div>
      {/* Year Selector */}
      <select
        className="year-select"
        value={selectedYear}
        onChange={handleYearChange}
      >
        {[2021, 2022, 2023, 2024].map((year) => (
          <option key={year} value={year}>
            <b>{year}</b>
          </option>
        ))}
      </select>

      {/* Horizontal Scroll for Months */}
      <div
        key="1"
        style={{ display: "flex", overflowX: "scroll", marginTop: "10px" }}
      >
        <button className="month-btn-selected" style={{ marginRight: "12px" }}>
          Months
        </button>
        {Object.keys(data[selectedYear] || {}).map((month) => (
          <>
            {month === "plans" ? (
              <></>
            ) : (
              <button
                key={month}
                className={
                  month === selectedMonth ? "month-btn-selected" : "month-btn"
                }
                onClick={() => handleMonthClick(month)}
                style={{ marginRight: "10px" }}
              >
                <Text name={month.toLowerCase()} />
              </button>
            )}
          </>
        ))}
      </div>

      {/* Data Display */}
      <div style={{ marginTop: "20px" }}>{renderDataDisplay()}</div>
    </div>
  );
}
