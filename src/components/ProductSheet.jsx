import { useState } from "react";
import Text from "./Text";

export default function ProductSheet() {
  const [imageHide, setImageHide] = useState(true);

  return (
    <>
      <button
        className="farmer-choose-btn"
        onClick={() => setImageHide(!imageHide)}
      >
        <Text name="product_sheet" />

        <div className="arrow">
          {imageHide === true ? (
            <>
              <svg
                width="10"
                height="17"
                viewBox="0 0 10 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 15.5L8 8L0.999999 1"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            </>
          ) : (
            <>
              <svg
                width="17"
                height="10"
                viewBox="0 0 17 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1L8.5 8L15.5 1" stroke="white" strokeWidth="2" />
              </svg>
            </>
          )}
        </div>
      </button>

      {imageHide === true ? (
        <></>
      ) : (
        <>
          <img
            className="farmer-product-sheet"
            src="/farmerbooklet/image4.png"
          />
          <img
            className="farmer-product-sheet"
            src="/farmerbooklet/image5.png"
          />
        </>
      )}
    </>
  );
}
