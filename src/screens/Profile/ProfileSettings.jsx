import "./profile.css";

import { useDispatch } from "react-redux";
import { logout } from "../../actions";
import DelayedNavigator from "../../components/DelayedNavigator";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { PORT } from "../../config/server";
import Text from "../../components/Text";

import LanguageSwitch from "../../components/LanguageSwitch";

const FarmerProfile = () => {
  const dispatch = useDispatch();
  const [profilePic, setProfilePic] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [phone, setPhoneNumber] = useState("");

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
        setEmail(data.email);
        setPhoneNumber(data.phone);
        setProfilePic(data.profilePic);

        // Save the fetched data to cookies for subsequent visits
        Cookies.set("profileData", JSON.stringify(data), { expires: 7 }); // expires in 7 days
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    } else {
      console.log("No email found in cookies.");
    }
  }

  useEffect(() => {
    const profileData = Cookies.get("profileData");
    if (profileData) {
      const data = JSON.parse(profileData);
      setName(data.name);
      setEmail(data.email);
      setPhoneNumber(data.phone);
      setProfilePic(data.profilePic);
      setType(data.type);
    } else {
      fetchProfile();
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("email");
    Cookies.remove("uid");
    Cookies.remove("profileData");
    Cookies.remove("subscribe");
    Cookies.remove("bags");
    Cookies.remove("images");
    Cookies.remove("profileYear");
    dispatch(logout()); // Ensure you are calling the action creator
  };
  return (
    <>
      <div className="app">
        <header className="app-header">
          <div className="profile-section">
            <div className="alpha-banner">
              <div
                className="profile-picture"
                style={{ backgroundImage: ` url(${profilePic})` }}
              ></div>
              {/* <img src="https://images.unsplash.com/photo-1619895862022-09114b41f16f?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Profile" className="profile-picture" /> */}
              <h1>
                {name}
                <div style={{ fontSize: 8.6 }}> {email}</div>
              </h1>
              <DelayedNavigator path="/profile/edit">
                <p
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 12,
                  }}
                >
                  {" "}
                  <Text name="edit" />{" "}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_141_3562)">
                      <path
                        d="M10.6666 7.99998C10.667 8.15575 10.6127 8.30671 10.5133 8.42665L7.17998 12.4266C7.06682 12.5628 6.90421 12.6484 6.72793 12.6647C6.55165 12.6809 6.37612 12.6265 6.23998 12.5133C6.10384 12.4002 6.01822 12.2375 6.00197 12.0613C5.98571 11.885 6.04015 11.7095 6.15331 11.5733L9.13998 7.99998L6.25998 4.42665C6.2046 4.35845 6.16325 4.27999 6.13829 4.19576C6.11334 4.11154 6.10528 4.02321 6.11457 3.93586C6.12386 3.84851 6.15033 3.76385 6.19244 3.68676C6.23456 3.60967 6.2915 3.54166 6.35998 3.48665C6.42853 3.42559 6.50895 3.37935 6.59619 3.35083C6.68344 3.3223 6.77564 3.31209 6.86702 3.32086C6.9584 3.32962 7.04698 3.35716 7.12721 3.40174C7.20745 3.44633 7.27762 3.50701 7.33331 3.57998L10.5533 7.57998C10.637 7.70337 10.6769 7.85125 10.6666 7.99998Z"
                        fill="#6440FE"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_141_3562">
                        <rect
                          width="16"
                          height="16"
                          fill="white"
                          transform="translate(0 16) rotate(-90)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </p>
              </DelayedNavigator>
            </div>
          </div>
          <div className="menu-options">
            <DelayedNavigator path="/profile" delay={2000}>
              <div className="menu-item">
                <div className="menu-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="32"
                    height="32"
                    viewBox="0 0 64 64"
                  >
                    <path d="M 32 8 C 31.08875 8 30.178047 8.3091875 29.435547 8.9296875 L 8.8007812 26.171875 C 8.0357812 26.810875 7.7634844 27.925203 8.2714844 28.783203 C 8.9184844 29.875203 10.35025 30.088547 11.28125 29.310547 L 12 28.710938 L 12 47 C 12 49.761 14.239 52 17 52 L 47 52 C 49.761 52 52 49.761 52 47 L 52 28.712891 L 52.71875 29.3125 C 53.09275 29.6255 53.546047 29.777344 53.998047 29.777344 C 54.693047 29.777344 55.382672 29.416656 55.763672 28.722656 C 56.228672 27.874656 55.954891 26.803594 55.212891 26.183594 L 52 23.498047 L 52 15 C 52 13.895 51.105 13 50 13 L 48 13 C 46.895 13 46 13.895 46 15 L 46 18.484375 L 34.564453 8.9296875 C 33.821953 8.3091875 32.91125 8 32 8 z M 32 12.152344 C 32.11475 12.152344 32.228766 12.191531 32.322266 12.269531 L 48 25.369141 L 48 46 C 48 47.105 47.105 48 46 48 L 38 48 L 38 34 C 38 32.895 37.105 32 36 32 L 28 32 C 26.895 32 26 32.895 26 34 L 26 48 L 18 48 C 16.895 48 16 47.105 16 46 L 16 25.367188 L 31.677734 12.269531 C 31.771234 12.191531 31.88525 12.152344 32 12.152344 z"></path>
                  </svg>
                </div>

                <div className="menu-content">
                  <div className="menu-content-title">
                    <Text name="home" />
                  </div>
                  <div className="menu-content-info">
                    <Text name="home_page" />
                  </div>
                </div>

                <div className="button-arrow">&gt;</div>
              </div>
            </DelayedNavigator>

            {type === "Farmer" ? (
              <></>
            ) : (
              <DelayedNavigator path="" delay={2000}>
                {/* /profile/settings/subscription */}
                <div className="menu-item">
                  <div className="menu-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z"
                        stroke="#1C1C28"
                        stroke-width="2"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1 10H23"
                        stroke="#1C1C28"
                        stroke-width="2"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div className="menu-content">
                    <div className="menu-content-title">
                      <Text name="subscription" />
                    </div>
                    <div className="menu-content-info">
                      <Text name="subscription_info" />{" "}
                    </div>
                  </div>

                  <div className="button-arrow">&gt;</div>
                </div>
              </DelayedNavigator>
            )}

            {/* 
<DelayedNavigator path="/events"  delay={2000}>
          <div className="menu-item">
            <div className="menu-icon">
              <img src="/event.png" style={{height:28,width:28}}></img>
</div>

<div className='menu-content'>
<div className="menu-content-title"><Text name="events"></Text></div>
<div className="menu-content-info"><Text name="events_info"/></div>
</div>

<div className='button-arrow'>
&gt;
</div>
          </div>

</DelayedNavigator> */}

            <DelayedNavigator
              path="/profile/settings/notification"
              delay={2000}
            >
              <div className="menu-item">
                <div className="menu-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                      stroke="#1C1C28"
                      stroke-width="2"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                      stroke="#1C1C28"
                      stroke-width="2"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="menu-content">
                  <div className="menu-content-title">
                    <Text name="notification" />
                  </div>
                  <div className="menu-content-info">
                    <Text name="notification_info" />
                  </div>
                </div>

                <div className="button-arrow">&gt;</div>
              </div>
            </DelayedNavigator>

            <div className="menu-item">
              <div className="menu-icon">
                <svg
                  height="24"
                  viewBox="0 0 48 48"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h48v48h-48z" fill="none" />
                  <path d="M23.99 4c-11.05 0-19.99 8.95-19.99 20s8.94 20 19.99 20c11.05 0 20.01-8.95 20.01-20s-8.96-20-20.01-20zm13.85 12h-5.9c-.65-2.5-1.56-4.9-2.76-7.12 3.68 1.26 6.74 3.81 8.66 7.12zm-13.84-7.93c1.67 2.4 2.97 5.07 3.82 7.93h-7.64c.85-2.86 2.15-5.53 3.82-7.93zm-15.48 19.93c-.33-1.28-.52-2.62-.52-4s.19-2.72.52-4h6.75c-.16 1.31-.27 2.64-.27 4 0 1.36.11 2.69.28 4h-6.76zm1.63 4h5.9c.65 2.5 1.56 4.9 2.76 7.13-3.68-1.26-6.74-3.82-8.66-7.13zm5.9-16h-5.9c1.92-3.31 4.98-5.87 8.66-7.13-1.2 2.23-2.11 4.63-2.76 7.13zm7.95 23.93c-1.66-2.4-2.96-5.07-3.82-7.93h7.64c-.86 2.86-2.16 5.53-3.82 7.93zm4.68-11.93h-9.36c-.19-1.31-.32-2.64-.32-4 0-1.36.13-2.69.32-4h9.36c.19 1.31.32 2.64.32 4 0 1.36-.13 2.69-.32 4zm.51 11.12c1.2-2.23 2.11-4.62 2.76-7.12h5.9c-1.93 3.31-4.99 5.86-8.66 7.12zm3.53-11.12c.16-1.31.28-2.64.28-4 0-1.36-.11-2.69-.28-4h6.75c.33 1.28.53 2.62.53 4s-.19 2.72-.53 4h-6.75z" />
                </svg>
              </div>

              <div className="menu-content">
                <LanguageSwitch />
              </div>

              <div className="button-arrow">&gt;</div>
            </div>

            <DelayedNavigator path="/profile/settings/about" delay={2000}>
              <div className="menu-item">
                <div className="menu-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_141_1702)">
                      <path
                        d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z"
                        fill="#1C1C28"
                      />
                      <path
                        d="M12 9C12.5523 9 13 8.55228 13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8C11 8.55228 11.4477 9 12 9Z"
                        fill="#1C1C28"
                      />
                      <path
                        d="M12 10C11.7348 10 11.4804 10.1054 11.2929 10.2929C11.1054 10.4804 11 10.7348 11 11V16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16V11C13 10.7348 12.8946 10.4804 12.7071 10.2929C12.5196 10.1054 12.2652 10 12 10Z"
                        fill="#1C1C28"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_141_1702">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>

                <div className="menu-content">
                  <div className="menu-content-title">
                    <Text name="about" />
                  </div>
                  <div className="menu-content-info">
                    <Text name="about_info" />
                  </div>
                </div>

                <div className="button-arrow">&gt;</div>
              </div>
            </DelayedNavigator>

            <DelayedNavigator path="/login" delay={2000}>
              <div
                className="menu-item"
                style={{ color: "red" }}
                onClick={handleLogout}
              >
                <div className="menu-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 17L21 12L16 7"
                      stroke="#E63535"
                      stroke-width="2"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 12H9"
                      stroke="#E63535"
                      stroke-width="2"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                      stroke="#E63535"
                      stroke-width="2"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="menu-content">
                  <div className="menu-content-title">
                    <Text name="logout" />
                  </div>
                </div>

                <div className="button-arrow">&gt;</div>
              </div>
            </DelayedNavigator>
          </div>
        </header>
      </div>
    </>
  );
};

const PortProfile = () => {
  return (
    <>
      <>
        <div className="profile-container">
          <div
            className="profile-header"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1374&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
            }}
          >
            <DelayedNavigator
              path="/profile/settings"
              color="#fff"
              delay={2000}
            >
              <div className="edit-btn">
                Edit <div>{">"}</div>
              </div>
            </DelayedNavigator>

            <div className="profile-details">
              <div className="profile-container">
                <div
                  className="profile-picture"
                  style={{
                    backgroundImage: ` url('https://images.unsplash.com/photo-1619895862022-09114b41f16f?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                  }}
                ></div>

                <div className="profile-contents">
                  <div className="listed">
                    L'Oréal: Hairstylists for the future
                  </div>
                  <div className="salon-name"> Gavostyle SL Salon </div>
                  <div className="joining-details">
                    Eduardo | Joined 2023 | <i className="fa fa-instagram"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pannel" style={{ paddingTop: 234 }}>
          {/* <iframe src='./alpha.html'></iframe> */}

          <div className="pannel-row">
            <DelayedNavigator path="/impact-details" delay={2000}>
              <img
                src="pannel.png"
                alt="pannel"
                style={{ height: "auto", width: 362 }}
              />
            </DelayedNavigator>

            <img
              src="history.png"
              alt="pannel"
              style={{ height: "auto", width: 362 }}
            />
          </div>
        </div>
      </>
    </>
  );
};

const ClicRecycleProfile = () => {
  return <></>;
};

const LorealProfile = () => {
  return <></>;
};

const NewUser = () => {
  return <></>;
};

export default function ProfileSettings() {
  // const [userProfile]= useState(Cookies.get("email"))

  return (
    <>
      <FarmerProfile />
    </>
  );
}
