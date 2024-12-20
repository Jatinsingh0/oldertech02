import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./signup.css";
import Text from "../../components/Text";
import DelayedNavigator from "../../components/DelayedNavigator";
import Cookies from "js-cookie";
import { db, storage } from "../../config/firebase";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { PORT } from "../../config/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

function ProfileEdit() {
  const navigate = useNavigate();
  const [id] = Cookies.get("uid");
  const [showProgress, setShowProgress] = useState(false);
  const [showProfilePicProgress, setShowProfilePicProgress] = useState(false);
  const [
    showProfileCoverPicProgress,
    setShowProfileCoverPicProgress,
  ] = useState(false);
  const [type, setType] = useState("");

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Address: "",
    Phonenumber: "",
    city: "",
    salonName: "",
  });

  const hiddenFileInput = useRef(null);
  const hiddenFileInputBackground = useRef(null);

  const handleClickBackgroundPic = () => {
    hiddenFileInputBackground.current.click();
  };
  const handleClickProfilePic = () => {
    hiddenFileInput.current.click();
  };

  const [profilePic, setProfilePic] = useState(
    "https://images.unsplash.com/photo-1619895862022-09114b41f16f?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );

  const [BackgroundPic, setBackgroundPic] = useState(
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1374&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setShowProfilePicProgress(true);

    const profileData = Cookies.get("profileData");
    if (!profileData) {
      alert("Error: Profile data not found.");
      setShowProfilePicProgress(false);
      return;
    }

    const data = JSON.parse(profileData);
    const userId = data._id; // Assuming the ID is stored in the _id field

    // Create an S3 client
    const s3 = new S3Client({
      region: "eu-west-3", // Your bucket region
      credentials: {
        accessKeyId: "AKIAZ3BWCQBESZMI2FO3",
        secretAccessKey: "L2na/QR4ShbbqnBQ5339jZG1egQ3XyNRhBSuXmnj",
      },
    });

    const uploadParams = {
      Bucket: "clicrecycle-public", // Your bucket name
      Key: `profile_pictures/${userId}/${file.name}`, // File path and name in your bucket
      Body: file,
      // ACL: 'public-read' // Adjust as needed
    };

    try {
      // Upload the file to S3
      const command = new PutObjectCommand(uploadParams);
      const uploadResult = await s3.send(command);
      const photoURL = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;

      // Update the user profile with the new image URL using your API
      const updateResponse = await fetch(
        `${PORT}/api/user/update-profile/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ profilePic: photoURL }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Error updating profile");
      }

      setProfilePic(photoURL); // Update the profile pic state
      setShowProfilePicProgress(false);
      alert("Image uploaded and profile updated successfully!");
    } catch (error) {
      console.error("Error during image upload and profile update:", error);
      setShowProfilePicProgress(false);
      alert("Error uploading image: " + error.message);
    }
  };

  const handleBImageUpload = async (event) => {
    const file = event.target.files[0];
    setShowProfileCoverPicProgress(true);

    const profileData = Cookies.get("profileData");
    if (!profileData) {
      alert("Error: Cover Pic data not found.");
      setShowProfileCoverPicProgress(false);
      return;
    }

    const data = JSON.parse(profileData);
    const userId = data._id; // Assuming the ID is stored in the _id field

    // Create an S3 client
    const s3 = new S3Client({
      region: "eu-west-3", // Your bucket region
      credentials: {
        accessKeyId: "AKIAZ3BWCQBESZMI2FO3",
        secretAccessKey: "L2na/QR4ShbbqnBQ5339jZG1egQ3XyNRhBSuXmnj",
      },
    });

    const uploadParams = {
      Bucket: "clicrecycle-public", // Your bucket name
      Key: `cover_pictures/${userId}/${file.name}`, // File path and name in your bucket
      Body: file,
      // ACL: 'public-read' // Adjust as needed
    };

    try {
      // Upload the file to S3
      const command = new PutObjectCommand(uploadParams);
      const uploadResult = await s3.send(command);

      const photoURL = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;

      const updateResponse = await fetch(
        `${PORT}/api/user/update-profile/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ coverPic: photoURL }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Error updating profile");
      }

      setBackgroundPic(photoURL); // Update the cover pic state
      setShowProfileCoverPicProgress(false);
      alert("Cover Image updated successfully!");
    } catch (error) {
      console.error("Error during image upload and profile update:", error);
      setShowProfileCoverPicProgress(false);
      alert("Error uploading image: " + error.message);
    }
  };

  useEffect(() => {
    async function fetchProfile() {
      const userId = Cookies.get("uid");

      // Check if profile data is available in cookies
      const profileData = Cookies.get("profileData");
      if (profileData) {
        const data = JSON.parse(profileData);
        setFormData({
          Name: data.name,
          Email: data.email,
          Address: data.address,
          Phonenumber: data.phone,
          city: data.city,
          salonName: data.salonName,
          // ... any other fields ...
        });
        setType(data.type);
        setProfilePic(data.profilePic);
        setBackgroundPic(data.coverPic);
      } else {
        // If not in cookies, fetch from Firestore
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            Name: data.name,
            Email: data.email,
            Address: data.address,
            Phonenumber: data.phone,
            city: data.city,
            salonName: data.salonName,
            // ... any other fields ...
          });
          setType(data.type);
          setProfilePic(data.profilePic);
          setBackgroundPic(data.BackgroundPic);

          // Optionally, store the fetched data in cookies for next time
          Cookies.set("profileData", JSON.stringify(data));
        } else {
          console.log("No such document!");
        }
      }
    }

    fetchProfile();
  }, [db]);

  const handleSave = async () => {
    setShowProgress(true);

    // Retrieve the user's ID from the saved profile data in cookies
    const profileData = Cookies.get("profileData");
    if (!profileData) {
      alert("Error: Profile data not found.");
      setShowProgress(false);
      return;
    }

    const data = JSON.parse(profileData);
    const userId = data._id; // Assuming the ID is stored in the _id field

    if (!userId) {
      alert("Error: User ID not found.");
      setShowProgress(false);
      return;
    }

    // Check if any of the required inputs are blank
    if (
      !formData.Name ||
      !formData.Email ||
      !formData.Address ||
      !formData.Phonenumber ||
      !formData.city ||
      !formData.salonName
    ) {
      alert("Please fill in all the fields.");
      setShowProgress(false);
      return;
    }

    try {
      const response = await fetch(
        `${PORT}/api/user/update-profile/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.Name,
            email: formData.Email,
            address: formData.Address,
            phone: formData.Phonenumber,
            city: formData.city,
            salonName: formData.salonName || formData.Name,
            // Add other fields if necessary
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Assuming the server sends a success message or updated profile data
      const updatedData = await response.json();
      // Update cookies or local state as needed
      Cookies.set("profileData", JSON.stringify(updatedData), { expires: 7 }); // Update with the new profile data

      setShowProgress(false);
      alert("Profile updated successfully");
      // Redirect or perform other actions after successful update
      navigate("/profile");
    } catch (error) {
      setShowProgress(false);
      alert("Error updating profile: ", error);
    }
  };

  const variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const inputDelay = 0.1;
  const increment = 0.1;

  return (
    <>
      <div
        className="header-signup"
        onClick={handleClickBackgroundPic}
        style={{
          height: 193,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundImage: `url(${BackgroundPic})`,
        }}
      >
        <input
          type="file"
          ref={hiddenFileInputBackground}
          onChange={handleBImageUpload}
          style={{ display: "none" }} // Hide the file input
        />
      </div>

      <div className="loreal-logo" style={{ backgroundImage: "none" }}>
        <div
          className="profile-picture"
          onClick={handleClickProfilePic}
          style={{
            height: 105,
            width: 105,
            marginTop: -59,
            cursor: "pointer",
            backgroundImage: ` url(${profilePic})`,
            marginLeft: "57%",
          }}
        >
          {showProfilePicProgress === true ? (
            <div className="loader"></div>
          ) : (
            <></>
          )}
        </div>
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleImageUpload}
          style={{ display: "none" }} // Hide the file input
        />
      </div>
      <p style={{ textAlign: "center", fontFamily: "DM Sans", opacity: 0.6 }}>
        <Text name="profile_pic_edit" />
      </p>

      {showProfileCoverPicProgress === true ? (
        <p style={{ textAlign: "center", fontFamily: "DM Sans", opacity: 0.6 }}>
          Cover Pic Uploading...
        </p>
      ) : (
        <></>
      )}

      <div className="form-signup">
        <>
          <motion.label
            initial="hidden"
            animate="visible"
            transition={{ ease: "easeIn", duration: 1, delay: inputDelay }}
            variants={variants}
          >
            <Text name="name" />*
          </motion.label>
          <motion.input
            initial="hidden"
            animate="visible"
            transition={{
              ease: "easeIn",
              duration: 1,
              delay: inputDelay + increment,
            }}
            variants={variants}
            className="input"
            value={formData.Name}
            onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
          />

          <motion.label
            initial="hidden"
            animate="visible"
            transition={{
              ease: "easeIn",
              duration: 1,
              delay: inputDelay + increment * 2,
            }}
            variants={variants}
          >
            <Text name="salon_name" /> *
          </motion.label>
          <motion.input
            initial="hidden"
            animate="visible"
            transition={{
              ease: "easeIn",
              duration: 1,
              delay: inputDelay + increment * 3,
            }}
            variants={variants}
            className="input"
            value={formData.salonName}
            onChange={(e) =>
              setFormData({ ...formData, salonName: e.target.value })
            }
          />

          <motion.label
            initial="hidden"
            animate="visible"
            transition={{
              ease: "easeIn",
              duration: 1,
              delay: inputDelay + increment * 4,
            }}
            variants={variants}
          >
            <Text name="email" /> *
          </motion.label>
          <motion.input
            initial="hidden"
            animate="visible"
            transition={{
              ease: "easeIn",
              duration: 1,
              delay: inputDelay + increment * 5,
            }}
            variants={variants}
            className="input"
            value={formData.Email}
            onChange={(e) =>
              setFormData({ ...formData, Email: e.target.value })
            }
          />

          <motion.label
            initial="hidden"
            animate="visible"
            transition={{
              ease: "easeIn",
              duration: 1,
              delay: inputDelay + increment * 6,
            }}
            variants={variants}
          >
            <Text name="phone_number" />*
          </motion.label>
          <motion.input
            initial="hidden"
            animate="visible"
            transition={{
              ease: "easeIn",
              duration: 1,
              delay: inputDelay + increment * 7,
            }}
            variants={variants}
            className="input"
            value={formData.Phonenumber}
            onChange={(e) =>
              setFormData({ ...formData, Phonenumber: e.target.value })
            }
          />

          <motion.label
            initial="hidden"
            animate="visible"
            transition={{
              ease: "easeIn",
              duration: 1,
              delay: inputDelay + increment * 8,
            }}
            variants={variants}
          >
            <Text name="address" /> *
          </motion.label>
          <motion.input
            initial="hidden"
            animate="visible"
            transition={{
              ease: "easeIn",
              duration: 1,
              delay: inputDelay + increment * 9,
            }}
            variants={variants}
            className="input"
            value={formData.Address}
            onChange={(e) =>
              setFormData({ ...formData, Address: e.target.value })
            }
          />

          <motion.label
            initial="hidden"
            animate="visible"
            transition={{
              ease: "easeIn",
              duration: 1,
              delay: inputDelay + increment * 10,
            }}
            variants={variants}
          >
            <Text name="city" />*
          </motion.label>
          <motion.input
            initial="hidden"
            animate="visible"
            transition={{
              ease: "easeIn",
              duration: 1,
              delay: inputDelay + increment * 11,
            }}
            variants={variants}
            className="input"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </>

        <motion.button
          initial="hidden"
          animate="visible"
          transition={{
            ease: "easeIn",
            duration: 1,
            delay: inputDelay + increment * 18,
          }} // adjust delay to control when button appears
          variants={buttonVariants}
          className="button"
          style={{ marginBottom: 13 }}
          onClick={handleSave}
        >
          {showProgress === true ? (
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <Text name="save" />
          )}
        </motion.button>

        <DelayedNavigator path="/profile" color="#fff" delay={2000}>
          <motion.button
            initial="hidden"
            animate="visible"
            transition={{
              ease: "easeIn",
              duration: 1,
              delay: inputDelay + increment * 18,
            }} // adjust delay to control when button appears
            variants={buttonVariants}
            className="button"
            style={{ marginBottom: 123, background: "#fff", color: "#2f4541" }}
          >
            <Text name="cancel" />
          </motion.button>
        </DelayedNavigator>
      </div>
    </>
  );
}

export default ProfileEdit;
