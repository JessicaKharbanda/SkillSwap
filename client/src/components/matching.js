import React from "react";
import { useEffect, useState } from "react";
import { useToken } from "./TokenContext";
import "./matching.css";


function Allprofiles() {
  const userString = localStorage.getItem("userLoginInfo");
  // Parse the string to convert it back to a JavaScript object
  const userLogin = userString ? JSON.parse(userString) : null;
  // Access the _id value
  const userId = userLogin && userLogin.user ? userLogin.user._id : null; //this is logged in user id

  const { token } = useToken();
  const [profiles, setprofiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleViewProfileClick = (profile) => {
    setSelectedProfile(profile);
  };

  const handleCloseProfile = () => {
    setSelectedProfile(null);
  };

  const handleMatching = () => {
    console.log({ token });
    fetch("http://localhost:8000/api/v1/matching/match", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        setprofiles(data);
        console.log(data); // Update the state with the received data
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });
  };

  const handleMatchClick = (profileId) => {
    console.log(userId);
    console.log(profileId);
    // Call the /sendRequest endpoint
    fetch("http://localhost:8000/api/v1/chat-request/sendRequest", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: userId, //logged is user
        receiver: profileId, //jiska match button is clicked
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Chat request sent:", data);
      })
      .catch((error) => {
        console.error("Error sending chat request:", error);
      });

    // Call the /express-interest endpoint
    fetch("http://localhost:8000/api/v1/send/express-interest", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        targetUserId: profileId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Interest expressed and notifications sent:", data);
      })
      .catch((error) => {
        console.error("Error expressing interest:", error);
      });
  };

  useEffect(() => {
    if (token) {
      // If token is available, trigger the API call
      handleMatching();
    }
  }, [token]);

  return (
    <div style={{ color: "black" }}>
      {/* <button onClick={handleMatching}>match</button> */}
      <div className="container-page">
        <div className="heading">YOUR MATCHED PROFILES</div>
        <div className="test">
          {profiles.map((profile) => (
            <div className="container_card">
              <div className="mybox">
                <div key={profile.id} className="forflex">
                  <div className="profile-name">{profile.name}</div>
                  <div>{profile.bio}</div>
                  <div
                    class="anchor"
                    onClick={() => handleViewProfileClick(profile)}
                  >
                    View Profile
                  </div>
                  <button onClick={() => handleMatchClick(profile.createdBy)}>
                    match
                  </button>

                  {/* <img src={decodeURIComponent(profile.profilePictureUrl)} alt="ProfilePicture" /> */}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="space"></div>
      </div>
      {/* {selectedProfile && (
                <div>
                  hi
                  </div>

            )} */}
    </div>
  );
}

export default Allprofiles;
