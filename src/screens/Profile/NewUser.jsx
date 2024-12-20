import { useState, useEffect } from "react";
import "./profile.css";
import DelayedNavigator from "../../components/DelayedNavigator";
import Cookies from "js-cookie";

import { PORT } from "../../config/server";
import SDGCheck from "../../components/SDGCheck";
import Text from "../../components/Text";
import ProfileComponents from "./ProfileComponents";

export default function NewUser() {
  const [setName] = useState("");
  const [address, setAddress] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [background, setBackground] = useState("");
  const [type, setType] = useState("");
  const [salonName, setSalonName] = useState("");
  const [availabilitySDG, SetAvailabilitySDG] = useState(undefined);

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
          Cookies.set("profileData", JSON.stringify(data), { expires: 7 }); // expires in 7 days
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
      <>
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

            <div className="profile-details">
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
          {/* <iframe src='./alpha.html'></iframe> */}

          <div className="pannel-row">
            <div className="pannel-first-row">
              <div
                className="item"
                onClick={() => {
                  availabilitySDG === undefined
                    ? alert("SDG : 0")
                    : alert("SDG : 7");
                }}
              >
                <div className="icon">
                  {availabilitySDG === undefined ? (
                    <svg
                      width="66"
                      height="30"
                      viewBox="0 0 66 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M33.0002 20.144C32.2242 20.144 31.5602 19.964 31.0082 19.604C30.4562 19.236 30.0282 18.728 29.7242 18.08C29.4282 17.424 29.2802 16.664 29.2802 15.8C29.2802 14.944 29.4282 14.188 29.7242 13.532C30.0282 12.876 30.4562 12.368 31.0082 12.008C31.5602 11.64 32.2242 11.456 33.0002 11.456C33.7762 11.456 34.4402 11.64 34.9922 12.008C35.5442 12.368 35.9682 12.876 36.2642 13.532C36.5682 14.188 36.7202 14.944 36.7202 15.8C36.7202 16.664 36.5682 17.424 36.2642 18.08C35.9682 18.728 35.5442 19.236 34.9922 19.604C34.4402 19.964 33.7762 20.144 33.0002 20.144ZM33.0002 18.764C33.6322 18.764 34.1482 18.5 34.5482 17.972C34.9482 17.444 35.1482 16.72 35.1482 15.8C35.1482 14.88 34.9482 14.156 34.5482 13.628C34.1482 13.1 33.6322 12.836 33.0002 12.836C32.3602 12.836 31.8402 13.1 31.4402 13.628C31.0482 14.156 30.8522 14.88 30.8522 15.8C30.8522 16.72 31.0482 17.444 31.4402 17.972C31.8402 18.5 32.3602 18.764 33.0002 18.764Z"
                        fill="black"
                      />
                      <rect
                        x="0.25"
                        y="0.25"
                        width="65.5"
                        height="29.5"
                        rx="7.75"
                        stroke="#020202"
                        strokeWidth="0.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="66"
                      height="30"
                      viewBox="0 0 66 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M35.38 20L38.548 12.908H34.408V11.6H40.132V12.692L36.976 20H35.38Z"
                        fill="black"
                      />
                      <rect
                        x="0.25"
                        y="0.25"
                        width="65.5"
                        height="29.5"
                        rx="7.75"
                        stroke="#020202"
                        strokeWidth="0.5"
                      />
                    </svg>
                  )}
                </div>
                <div className="name">
                  <Text name="sdg" />
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

              <div className="item" onClick={() => shareContent()}>
                <div className="icon">
                  <svg
                    width="66"
                    height="30"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.5 12V20C4.5 20.5304 4.71071 21.0391 5.08579 21.4142C5.46086 21.7893 5.96957 22 6.5 22H18.5C19.0304 22 19.5391 21.7893 19.9142 21.4142C20.2893 21.0391 20.5 20.5304 20.5 20V12"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.5 6L12.5 2L8.5 6"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.5 2V15"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="name">
                  <Text name="share" />
                </div>
              </div>
            </div>

            <div className="pannel-first-row" style={{ marginTop: 18 }}>
              <DelayedNavigator
                path="/profile/settings"
                color="#fff"
                delay={2000}
              >
                <div className="item">
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="66"
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

              <DelayedNavigator
                path="/profile/transport"
                color="#fff"
                delay={2000}
              >
                <div className="item">
                  <div className="icon">
                    <svg
                      width="66"
                      height="30"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M640 1408q0-52-38-90t-90-38-90 38-38 90 38 90 90 38 90-38 38-90zm-384-512h384v-256h-158q-13 0-22 9l-195 195q-9 9-9 22v30zm1280 512q0-52-38-90t-90-38-90 38-38 90 38 90 90 38 90-38 38-90zm256-1088v1024q0 15-4 26.5t-13.5 18.5-16.5 11.5-23.5 6-22.5 2-25.5 0-22.5-.5q0 106-75 181t-181 75-181-75-75-181h-384q0 106-75 181t-181 75-181-75-75-181h-64q-3 0-22.5.5t-25.5 0-22.5-2-23.5-6-16.5-11.5-13.5-18.5-4-26.5q0-26 19-45t45-19v-320q0-8-.5-35t0-38 2.5-34.5 6.5-37 14-30.5 22.5-30l198-198q19-19 50.5-32t58.5-13h160v-192q0-26 19-45t45-19h1024q26 0 45 19t19 45z" />
                    </svg>
                  </div>

                  <div className="name">
                    <Text name="transport" />
                  </div>
                </div>
              </DelayedNavigator>

              <DelayedNavigator
                path="/profile/loreal-impact-details"
                color="#fff"
                delay={2000}
              >
                <div className="item">
                  <div className="icon">
                    <svg
                      viewBox="0 0 24 24"
                      width="66"
                      height="30"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="heroicon-ui"
                        d="M17 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h2V3a1 1 0 1 1 2 0v1h6V3a1 1 0 0 1 2 0v1zm-2 2H9v1a1 1 0 1 1-2 0V6H5v4h14V6h-2v1a1 1 0 0 1-2 0V6zm4 6H5v8h14v-8z"
                      />
                    </svg>
                  </div>

                  <div className="name">
                    <Text name="previous_year" />
                  </div>
                </div>
              </DelayedNavigator>

              <div
                className="item"
                style={{ opacity: 0, pointerEvents: "none" }}
              >
                <div className="icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="66"
                    height="30"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="heroicon-ui"
                      d="M17 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h2V3a1 1 0 1 1 2 0v1h6V3a1 1 0 0 1 2 0v1zm-2 2H9v1a1 1 0 1 1-2 0V6H5v4h14V6h-2v1a1 1 0 0 1-2 0V6zm4 6H5v8h14v-8z"
                    />
                  </svg>
                </div>

                <div className="name">Check previous year reports</div>
              </div>
            </div>

            {/* <DelayedNavigator path="/impact-details" delay={2000}> 
    <img src="pannel.png" alt="pannel" style={{height:"auto",width:362}}/>
    </DelayedNavigator> */}
            <div className="order-history">
              <ProfileComponents
                type={type}
                email={Cookies.get("email")}
                onYearDataAvailabilityChange={handleYearDataAvailabilityChange}
              />
            </div>
          </div>
        </div>
      </>
    </>
  );
}
