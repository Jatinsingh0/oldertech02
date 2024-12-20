import DelayedNavigator from "../../components/DelayedNavigator";
import SDGCheck from "../../components/SDGCheck";
import Text from "../../components/Text";
import "./new_users.css";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { PORT } from "../../config/server";
import ImageSlider from "../../components/ImageSlider";
import ProductSheet from "../../components/ProductSheet";

export default function FarmerUser() {
  const [imageHide, setImageHide] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    nif: "", // NIF/Intercommunitarian number
    salons: "",
    address: "",
    paymentMethod: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, such as sending data to a backend service
    console.log("Form data submitted:", formData);
  };

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [background, setBackground] = useState("");
  const [type, setType] = useState("");
  const [salonName, setSalonName] = useState("");
  const [availabilitySDG, SetAvailabilitySDG] = useState(undefined);

  const images = [
    "/Clicbooklet/1.png",
    "/Clicbooklet/2.png",
    "/Clicbooklet/3.png",
    "/Clicbooklet/4.png",
    "/Clicbooklet/5.png",
    "/Clicbooklet/6.png",
    "/Clicbooklet/7.png",
    "/Clicbooklet/8.png",
    "/Clicbooklet/9.png",
    "/Clicbooklet/10.png",
    "/Clicbooklet/11.png",

    // ...other images
  ];

  const shareContent = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Join the Hair Recycling Revolution with Clic Recycle!",
          text: "Check out this cool website I found!",
          url: window.location.href,
        })
        .then(() => console.log("Content shared successfully"))
        .catch((error) => console.log("Error sharing content", error));
    } else {
      console.log("Web Share API not supported in this browser.");
    }
  };

  useEffect(() => {
    async function fetchProfile() {
      // Get the email from cookies or another source
      const userEmail = Cookies.get("email");

      if (userEmail) {
        try {
          const response = await fetch(`${PORT}/api/user/user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: userEmail }),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();

          // Assuming the API returns the user's data directly
          setName(data.name);
          setAddress(data.city);
          setProfilePic(data.profilePic);
          setBackground(data.coverPic); // Assuming you meant coverPic from the schema for background
          setSalonName(data.salonName);
          setType(data.type);

          // Save the fetched data to cookies for subsequent visits
          Cookies.set("profileData", JSON.stringify(data), { expires: 7 });
          const ProfileYear = Cookies.get("profileYear");
          if (!ProfileYear) {
            Cookies.set("profileYear", new Date().getFullYear().toString(), {
              expires: 7,
            });
          }

          // expires in 7 days
        } catch (error) {
          console.error("Failed to fetch profile data:", error);
        }
      } else {
        console.log("No email found in cookies.");
      }
    }

    fetchProfile();
  }, []);

  const handleYearDataAvailabilityChange = (isDataAvailable) => {
    SetAvailabilitySDG(isDataAvailable);
  };

  return (
    <>
      <div
        style={{
          marginBottom: 67,
          display: type !== "Farmer" ? "none" : "block",
        }}
      >
        <div className="profile-container">
          <div
            className="profile-header"
            style={{ backgroundImage: `url(${background})` }}
          >
            <DelayedNavigator path="/profile/edit" color="#fff" delay={2000}>
              <div className="edit-btn">
                <Text name="edit" /> {">"}
              </div>
            </DelayedNavigator>

            <div className="profile-details" style={{ background: "#F2F2F5" }}>
              <div className="profile-container">
                <div
                  className="profile-picture"
                  style={{ backgroundImage: ` url(${profilePic})` }}
                ></div>

                <div className="profile-contents">
                  <div className="listed">
                    {type === "I'm a L´Oréal customer"
                      ? "L'Oréal: Hairstylists for the future"
                      : "ClicRecycle | Hair Salon "}
                  </div>
                  <div className="salon-name">
                    {type === "I'm a L´Oréal customer" ? salonName : salonName}
                  </div>
                  <div className="joining-details">
                    {address} | <SDGCheck email={Cookies.get("email")} />{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pannel" style={{ paddingTop: 234 }}>
          <div className="pannel-row">
            <div className="pannel-first-row">
              <div className="item">
                <div className="icon">
                  <img
                    src="/Clicbooklet/flower.png"
                    style={{ height: "auto", width: 43 }}
                  />
                </div>
              </div>

              <DelayedNavigator path="/profile/chat" delay={200}>
                <div className="item">
                  <div className="icon">
                    <svg
                      width="66"
                      height="30"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_25_4367)">
                        <path
                          d="M17.9 22.0001C13.8173 21.9948 9.90331 20.3706 7.0164 17.4837C4.12949 14.5968 2.50529 10.6828 2.5 6.60011C2.5 5.38012 2.98464 4.21009 3.84731 3.34742C4.70998 2.48476 5.88 2.00011 7.1 2.00011C7.35834 1.99815 7.61625 2.02159 7.87 2.07011C8.11531 2.10641 8.35647 2.1667 8.59 2.25011C8.75425 2.30774 8.90061 2.40725 9.01461 2.53879C9.12861 2.67033 9.2063 2.82934 9.24 3.00011L10.61 9.00011C10.6469 9.16298 10.6425 9.33249 10.5971 9.4932C10.5516 9.6539 10.4667 9.80067 10.35 9.92011C10.22 10.0601 10.21 10.0701 8.98 10.7101C9.96499 12.871 11.6932 14.6063 13.85 15.6001C14.5 14.3601 14.51 14.3501 14.65 14.2201C14.7694 14.1034 14.9162 14.0185 15.0769 13.9731C15.2376 13.9276 15.4071 13.9232 15.57 13.9601L21.57 15.3301C21.7353 15.3685 21.8881 15.4483 22.0141 15.562C22.14 15.6757 22.235 15.8196 22.29 15.9801C22.3744 16.2175 22.438 16.4617 22.48 16.7101C22.5202 16.9614 22.5403 17.2156 22.54 17.4701C22.5216 18.6849 22.0233 19.8431 21.154 20.6918C20.2847 21.5405 19.1149 22.0108 17.9 22.0001ZM7.1 4.00011C6.41125 4.00275 5.75146 4.27752 5.26443 4.76455C4.77741 5.25157 4.50263 5.91136 4.5 6.60011C4.50265 10.1532 5.91528 13.56 8.42769 16.0724C10.9401 18.5848 14.3469 19.9975 17.9 20.0001C18.5888 19.9975 19.2485 19.7227 19.7356 19.2357C20.2226 18.7487 20.4974 18.0889 20.5 17.4001V17.0701L15.86 16.0001L15.57 16.5501C15.12 17.4201 14.79 18.0501 13.95 17.7101C12.2929 17.117 10.7887 16.1621 9.54673 14.915C8.30477 13.6678 7.35622 12.1597 6.77 10.5001C6.41 9.72011 7.09 9.36011 7.95 8.91011L8.5 8.64011L7.43 4.00011H7.1Z"
                          fill="#1C1C28"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_25_4367">
                          <rect
                            width="24"
                            height="24"
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="name">
                    <Text name="chat_call" />
                  </div>
                </div>
              </DelayedNavigator>

              <DelayedNavigator path="/profile/direction">
                <div className="item">
                  <div className="icon">
                    <svg
                      width="66"
                      height="30"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.5 2C10.3921 1.99989 8.36926 2.83176 6.87124 4.31479C5.37323 5.79782 4.52108 7.81216 4.5 9.92C4.5 15.4 11.55 21.5 11.85 21.76C12.0311 21.9149 12.2616 22.0001 12.5 22.0001C12.7384 22.0001 12.9689 21.9149 13.15 21.76C13.5 21.5 20.5 15.4 20.5 9.92C20.4789 7.81216 19.6268 5.79782 18.1288 4.31479C16.6307 2.83176 14.6079 1.99989 12.5 2ZM12.5 19.65C10.83 18.06 6.5 13.65 6.5 9.92C6.5 8.3287 7.13214 6.80258 8.25736 5.67736C9.38258 4.55214 10.9087 3.92 12.5 3.92C14.0913 3.92 15.6174 4.55214 16.7426 5.67736C17.8679 6.80258 18.5 8.3287 18.5 9.92C18.5 13.62 14.17 18.06 12.5 19.65Z"
                        fill="#1C1C28"
                      />
                      <path
                        d="M12.5 6C11.8078 6 11.1311 6.20527 10.5555 6.58986C9.97993 6.97444 9.53133 7.52107 9.26642 8.16061C9.00152 8.80015 8.9322 9.50388 9.06725 10.1828C9.2023 10.8618 9.53564 11.4854 10.0251 11.9749C10.5146 12.4644 11.1383 12.7977 11.8172 12.9327C12.4961 13.0678 13.1999 12.9985 13.8394 12.7336C14.4789 12.4687 15.0256 12.0201 15.4101 11.4445C15.7947 10.8689 16 10.1922 16 9.5C16 8.57174 15.6313 7.6815 14.9749 7.02513C14.3185 6.36875 13.4283 6 12.5 6ZM12.5 11C12.2033 11 11.9133 10.912 11.6666 10.7472C11.42 10.5824 11.2277 10.3481 11.1142 10.074C11.0007 9.79994 10.9709 9.49834 11.0288 9.20736C11.0867 8.91639 11.2296 8.64912 11.4393 8.43934C11.6491 8.22956 11.9164 8.0867 12.2074 8.02882C12.4983 7.97094 12.7999 8.00065 13.074 8.11418C13.3481 8.22771 13.5824 8.41997 13.7472 8.66665C13.912 8.91332 14 9.20333 14 9.5C14 9.89782 13.842 10.2794 13.5607 10.5607C13.2794 10.842 12.8978 11 12.5 11Z"
                        fill="#1C1C28"
                      />
                    </svg>
                  </div>
                  <div className="name">
                    <Text name="directions" />
                  </div>
                </div>
              </DelayedNavigator>

              <DelayedNavigator
                path="/profile/settings"
                color="#fff"
                delay={2000}
              >
                <div className="item second-column-item">
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="36"
                      height="30"
                      viewBox="0 0 50 50"
                    >
                      <path d="M 22.199219 2 A 1.0001 1.0001 0 0 0 21.214844 2.8339844 L 20.205078 8.796875 C 19.01608 9.1476749 17.903339 9.6072866 16.835938 10.173828 L 11.875 6.6816406 A 1.0001 1.0001 0 0 0 10.59375 6.7929688 L 6.6933594 10.693359 A 1.0001 1.0001 0 0 0 6.5820312 11.974609 L 10.076172 16.939453 C 9.5032306 17.983292 9.0447681 19.109183 8.6992188 20.298828 L 2.8457031 21.212891 A 1.0001 1.0001 0 0 0 2 22.199219 L 2 27.699219 A 1.0001 1.0001 0 0 0 2.8339844 28.685547 L 8.7949219 29.693359 C 9.1451119 30.880887 9.6045402 31.990547 10.169922 33.056641 L 6.6875 37.917969 A 1.0001 1.0001 0 0 0 6.7929688 39.207031 L 10.693359 43.107422 A 1.0001 1.0001 0 0 0 11.974609 43.21875 L 16.939453 39.724609 C 17.985462 40.298683 19.114316 40.757752 20.306641 41.103516 L 21.314453 47.066406 A 1.0001 1.0001 0 0 0 22.300781 47.900391 L 27.800781 47.900391 A 1.0001 1.0001 0 0 0 28.783203 47.082031 L 29.884766 41.107422 C 31.077734 40.756262 32.193186 40.294742 33.263672 39.726562 L 38.224609 43.21875 A 1.0001 1.0001 0 0 0 39.507812 43.107422 L 43.40625 39.207031 A 1.0001 1.0001 0 0 0 43.509766 37.914062 L 39.931641 32.957031 C 40.500209 31.91951 40.957756 30.82106 41.300781 29.693359 L 47.169922 28.685547 A 1.0001 1.0001 0 0 0 48 27.699219 L 48 22.199219 A 1.0001 1.0001 0 0 0 47.166016 21.214844 L 41.199219 20.203125 C 40.855563 19.074235 40.397841 17.973827 39.828125 16.935547 L 43.318359 11.974609 A 1.0001 1.0001 0 0 0 43.207031 10.693359 L 39.306641 6.7929688 A 1.0001 1.0001 0 0 0 38.013672 6.6894531 L 33.052734 10.273438 C 32.009656 9.7017023 30.885686 9.2413677 29.697266 8.8964844 L 28.685547 2.8359375 A 1.0001 1.0001 0 0 0 27.699219 2 L 22.199219 2 z M 23.044922 4 L 26.853516 4 L 27.814453 9.7636719 A 1.0001 1.0001 0 0 0 28.556641 10.570312 C 30.07104 10.948913 31.478126 11.514935 32.675781 12.251953 A 1.0001 1.0001 0 0 0 33.785156 12.210938 L 38.494141 8.8085938 L 41.197266 11.511719 L 37.882812 16.224609 A 1.0001 1.0001 0 0 0 37.847656 17.324219 C 38.584675 18.521874 39.154586 19.937607 39.533203 21.357422 A 1.0001 1.0001 0 0 0 40.333984 22.085938 L 46 23.044922 L 46 26.857422 L 40.429688 27.814453 A 1.0001 1.0001 0 0 0 39.632812 28.542969 C 39.254196 29.962783 38.686237 31.378517 37.949219 32.576172 A 1.0001 1.0001 0 0 0 37.990234 33.685547 L 41.390625 38.394531 L 38.6875 41.097656 L 33.974609 37.78125 A 1.0001 1.0001 0 0 0 32.904297 37.732422 C 31.566632 38.496802 30.2627 39.053466 28.757812 39.429688 A 1.0001 1.0001 0 0 0 28.017578 40.21875 L 26.966797 45.900391 L 23.144531 45.900391 L 22.185547 40.232422 A 1.0001 1.0001 0 0 0 21.443359 39.429688 C 19.92896 39.051088 18.521874 38.485065 17.324219 37.748047 A 1.0001 1.0001 0 0 0 16.224609 37.78125 L 11.511719 41.097656 L 8.8066406 38.392578 L 12.113281 33.783203 A 1.0001 1.0001 0 0 0 12.167969 32.703125 C 11.403582 31.365465 10.846925 30.061529 10.470703 28.556641 A 1.0001 1.0001 0 0 0 9.6660156 27.814453 L 4 26.855469 L 4 23.056641 L 9.5546875 22.1875 A 1.0001 1.0001 0 0 0 10.371094 21.443359 C 10.749694 19.92896 11.313763 18.521874 12.050781 17.324219 A 1.0001 1.0001 0 0 0 12.017578 16.224609 L 8.7011719 11.511719 L 11.412109 8.8027344 L 16.125 12.117188 A 1.0001 1.0001 0 0 0 17.195312 12.167969 C 18.532978 11.403589 19.836909 10.846925 21.341797 10.470703 A 1.0001 1.0001 0 0 0 22.085938 9.6660156 L 23.044922 4 z M 25 17 C 20.570085 17 17 20.570085 17 25 C 17 29.429915 20.570085 33 25 33 C 29.429915 33 33 29.429915 33 25 C 33 20.570085 29.429915 17 25 17 z M 25 19 C 28.370085 19 31 21.629915 31 25 C 31 28.370085 28.370085 31 25 31 C 21.629915 31 19 28.370085 19 25 C 19 21.629915 21.629915 19 25 19 z"></path>
                    </svg>
                  </div>

                  <div className="name">
                    <Text name="settings" />
                  </div>
                </div>
              </DelayedNavigator>
            </div>

            <div className="pannel-first-row " style={{ marginTop: 18 }}></div>
          </div>
        </div>

        <div className="clic-header-title-section">
          <Text name="A_Mulch" />
          <br />
          <Text name="Saves_water" />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/farmerbooklet/image1.png"
            style={{ width: 302, height: "auto" }}
          />

          <p className="farmer-pargarph">
            <Text name="For_regenerative_agriculture" />
          </p>
          <p style={{ marginTop: 13 }} className="farmer-pargarph">
            <Text name="organic_biodegradable_alternative" />
          </p>

          <img
            src="/farmerbooklet/image2.png"
            style={{ width: 302, height: "auto", marginTop: 33 }}
          />

          <p style={{ marginTop: 33 }} className="farmer-pargarph">
            <Text name="Available_in_different" />
          </p>

          <ProductSheet />

          <button
            className="farmer-choose-btn"
            onClick={() => setImageHide(!imageHide)}
          >
            <Text name="choose_product" />

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
                    <path
                      d="M1 1L8.5 8L15.5 1"
                      stroke="white"
                      strokeWidth="2"
                    />
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
                src="/farmerbooklet/image6.png"
                style={{ height: "auto", width: 323 }}
              />
            </>
          )}

          <p style={{ marginTop: 33 }} className="farmer-pargarph">
            <Text name="Smart_Vegan" />
          </p>
          <img
            src="/farmerbooklet/image3.png"
            style={{ width: 302, height: "auto", marginTop: 33 }}
          />
          <p
            style={{ marginTop: 33, fontWeight: 300 }}
            className="farmer-pargarph"
          >
            <Text name="Product_backed_up" />
          </p>

          <button
            onClick={() =>
              (window.location.href = "mailto:info@clicrecycle.com")
            }
            className="farmer-choose-btn"
          >
            <Text name="Contact_for_a_customised" />
          </button>
        </div>
      </div>
    </>
  );
}
