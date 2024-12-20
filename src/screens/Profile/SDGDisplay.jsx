import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { PORT } from "../../config/server";
import Text from "../../components/Text";

function ImageGallery() {
  // State to keep track of the selected image src
  const [selectedImgSrc, setSelectedImgSrc] = useState(null);

  // Handler for clicking an image
  const handleImageClick = (src) => {
    setSelectedImgSrc(src);
  };

  // Close the popup
  const handleClose = () => {
    setSelectedImgSrc(null);
  };

  return (
    <div>
      {/* Image elements with onClick handlers */}
      {[
        "/3-sdg.png",
        "/6-sdg.png",
        "/11-sdg.png",
        "/12-sdg.png",
        "/13-sdg.png",
        "/14-sdg.png",
        "/15-sdg.png",
      ].map((src) => (
        <img
          key={src}
          src={src}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={() => handleImageClick(src)}
        />
      ))}

      {/* Popup for displaying the selected image */}
      {selectedImgSrc && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000, // Ensure it's above other content
          }}
          onClick={handleClose}
        >
          <img
            src={selectedImgSrc}
            alt="Selected"
            style={{
              width: "223px",
              maxHeight: "80%",
            }}
          />
        </div>
      )}
    </div>
  );
}

// Extracts numeric values from the data strings
const extractNumericValue = (str) => {
  if (typeof str !== "string") return 0;
  return parseFloat(str.replace(/[^0-9.]/g, "")) || 0;
};

// Transforms the data for charting
const getChartData = (yearData) => {
  // Accumulate each relevant field into the chart data
  const chartData = Object.keys(yearData).reduce((acc, key) => {
    if (key !== "total" && typeof yearData[key] === "string") {
      acc.push({ name: key, Value: extractNumericValue(yearData[key]) });
    }
    return acc;
  }, []);
  return chartData;
};

export default function SDGDisplay() {
  const defaultYear = "2023";
  const [selectedYear, setSelectedYear] = useState(2021);
  const [sdgData, setSdgData] = useState({});

  const handleYearChange = (e) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
  };

  useEffect(() => {
    const year = Cookies.get("profileYear");

    if (year) {
      setSelectedYear(year);
    } else {
      setSelectedYear(defaultYear);
    }
  }, []);

  const calculateEnvironmentalMetrics = (totalkg) => {
    // const kg = parseInt(totalkg)
    return {
      Kilomensuales: totalkg / 12,
      CO2: totalkg,
      Litrosagua: totalkg * 200,
      LitrosM3: totalkg / 1000,
      AceiteLitros: totalkg * 8,
      Metals: (totalkg * 230) / 1000,
      M2Mantillo: (totalkg * 0.56) / 10,
    };
  };

  const calculateTotals = (data) => {
    let totalBenviadas = 0;
    let totalBrecibidas = 0;

    [
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
    ].forEach((month) => {
      if (data[selectedYear]?.[month]) {
        // Correctly access the month within the selected year
        totalBenviadas += Number(data[selectedYear]?.[month].Benviadas);
        totalBrecibidas += Number(data[selectedYear]?.[month].Brecibidas);
      }
    });

    return { totalBenviadas, totalBrecibidas };
  };

  const reconstructData = (data) => {
    const reconstructed = data.joined.reduce((acc, item) => {
      const year = item.year;
      acc[year] = {
        total: {
          Benviadas: item.total.Benviadas,
          Brecibidas: item.total.Brecibidas,
        },
        totalkg: item.totalkg,
        Kilosmensuales: calculateEnvironmentalMetrics(item.totalkg)
          .Kilomensuales,
        CO2annual: calculateEnvironmentalMetrics(item.totalkg).CO2,
        Litrosagua: calculateEnvironmentalMetrics(item.totalkg).Litrosagua,
        LitrosM3: calculateEnvironmentalMetrics(item.totalkg).LitrosM3,
        AceiteLitros: calculateEnvironmentalMetrics(item.totalkg).AceiteLitros,
        Metales: calculateEnvironmentalMetrics(item.totalkg).Metals,
        M2mantillo: calculateEnvironmentalMetrics(item.totalkg).M2Mantillo,
        SDGTotal: item.SDGTotal,
        january: item.january,
        february: item.february,
        march: item.march,
        april: item.april,
        may: item.may,
        june: item.june,
        july: item.july,
        august: item.august,
        september: item.september,
        october: item.october,
        november: item.november,
        december: item.december,
        // SDGNumber: item.SDGNumbers, // Ensure this matches your schema (SDGNumbers or SDGNumber)
      };
      return acc;
    }, {});

    return reconstructed;
  };

  const fetchData = async () => {
    const email = Cookies.get("email"); // Retrieve email from cookies
    if (!email) {
      console.log("Email cookie is not set");
      return;
    }

    try {
      const response = await fetch(`${PORT}/api/plan/sdg/one`, {
        // Assuming PORT is defined elsewhere or not needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Send email as a parameter
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      const formattedData = reconstructData(data);

      // Transform the fetched data
      setSdgData(formattedData); // Set the transformed data to state
    } catch (error) {
      console.error("Failed to fetch SDG data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

  const data = sdgData[selectedYear] || {
    total: { Benviadas: 0, Brecibidas: 0 },
    totalkg: "0",
    Kilosmensuales: "0",
    CO2annual: "0",
    Litrosagua: "0",
    LitrosM3: "0",
    AceiteLitros: "0",
    Metales: "0",
    M2mantillo: "0",
    SDGTotal: "0",
    SDGNumber: "0",
  };
  // const [data, setData] = useState(sdgData[selectedYear] );

  function extractValues(data) {
    // Extract and convert the necessary values
    const totalkgValue = parseInt(data.totalkg, 10); // Convert to integer
    const CO2annualValue = parseInt(data.CO2annual, 10); // Convert to integer
    const LitrosM3Value = Math.round(data.Kilosmensuales, 10); // Convert to liters per cubic meter and round

    // Construct the result array
    const result = [
      { name: "Total Kg", Value: totalkgValue },
      { name: "CO2 Annual", Value: CO2annualValue },
      { name: "(Kg) Pelo mensuales", Value: LitrosM3Value },
    ];

    return result;
  }
  const chartData = extractValues(data);
  const yearData = sdgData || { year: "Loading.." };
  const typeCheck = JSON.parse(Cookies.get("profileData"));

  return (
    <div>
      <div className="sdg-front-view">
        {typeCheck.type === "loreal" ? (
          <div className="loreal-sdg-logo">
            <img src="/loreal.png" />
          </div>
        ) : (
          <></>
        )}

        <select
          className="sdg-year-selection"
          value={selectedYear}
          onChange={handleYearChange}
        >
          <option value="2025">Choose Year</option>
          {Object.keys(yearData).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
          {/* {console.log(sdgData)}
        {[2021, 2022, 2023, 2024].map(year => (
          <option key={year} value={year}>{year}</option>
        ))} */}
        </select>

        <ResponsiveContainer
          className="sdg-year-chart"
          width="100%"
          height={300}
        >
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 62, left: -15, bottom: 12 }}
          >
            <CartesianGrid strokeDasharray="3 3 3" />
            <XAxis dataKey="name" style={{ fontSize: 11 }} />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
            <Line
              type="monotone"
              dataKey="Value"
              stroke="#260cbc"
              strokeWidth="1"
              activeDot={{ r: 10 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Responsive container for the chart */}

      {/* Data Display */}
      <div style={{ backgroundColor: "#f1f5f8", paddingBottom: 83 }}>
        <div className="row-sdg">
          <div className="sdg-data-box">
            <div className="sdg-box-title">
              <Text name="bags_sent" />
            </div>
            <div className="sdg-box-result">
              {" "}
              {calculateTotals(sdgData).totalBenviadas.toString()}{" "}
              <span>total</span>
            </div>
          </div>

          <div className="sdg-data-box">
            <div className="sdg-box-title">
              <Text name="bags_recieved" />
            </div>
            <div className="sdg-box-result">
              {calculateTotals(sdgData).totalBrecibidas.toString()}{" "}
              <span>total</span>
            </div>
          </div>
        </div>

        <div className="row-sdg">
          <div className="sdg-data-box">
            <div className="sdg-box-title">
              <Text name="bags_weight" />
            </div>
            <div className="sdg-box-result">
              {" "}
              {data.totalkg}
              <span> Kg</span>
            </div>
          </div>

          <div className="sdg-data-box">
            <div className="sdg-box-title">
              <Text name="kilo_mensuales" />
            </div>
            <div className="sdg-box-result">
              {String(data.Kilosmensuales).slice(0, 4)}
              <span> Kg</span>
            </div>
          </div>
        </div>

        <div className="row-sdg">
          <div className="sdg-data-box">
            <div className="sdg-box-title">
              <Text name="CO2_annual" />
            </div>
            <div className="sdg-box-result">
              {data.CO2annual}
              <span> Kg</span>
            </div>
          </div>

          <div className="sdg-data-box">
            <div className="sdg-box-title">
              <Text name="Litros_agua" />
            </div>
            <div className="sdg-box-result">
              {data.Litrosagua}
              <span> L</span>
            </div>
          </div>
        </div>

        <div className="row-sdg">
          <div className="sdg-data-box">
            <div className="sdg-box-title">
              <Text name="Litros_m3" />
            </div>
            <div className="sdg-box-result">
              {data.LitrosM3}
              <span>m3</span>
            </div>
          </div>

          <div className="sdg-data-box">
            <div className="sdg-box-title">
              <Text name="Aceite_litros" />{" "}
            </div>
            <div className="sdg-box-result">
              {data.AceiteLitros} <span>L</span>
            </div>
          </div>
        </div>

        <div className="row-sdg">
          <div className="sdg-data-box">
            <div className="sdg-box-title">
              <Text name="Metales" />{" "}
            </div>
            <div className="sdg-box-result">
              {data.Metales}
              <span>g</span>
            </div>
          </div>

          <div className="sdg-data-box">
            <div className="sdg-box-title">
              <Text name="Mantillo" />{" "}
            </div>
            <div className="sdg-box-result">
              {String(data.M2mantillo).slice(0, 4)}
              <span> m2</span>
            </div>
          </div>
        </div>

        <div className="row-sdg">
          <div className="sdg-data-box">
            <div className="sdg-box-title">SDG principal</div>
            <div className="sdg-box-result">{data.SDGTotal}</div>
          </div>

          <div className="sdg-data-box">
            <div className="sdg-box-title">SDG Numbers:</div>
            <div className="sdg-box-result">3,6,11,12, 13,14,15</div>
          </div>
        </div>
        {sdgData ? (
          <div className="sdg-image-numbers">
            <ImageGallery />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
