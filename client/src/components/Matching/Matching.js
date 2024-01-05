import React from "react";
import { useEffect,useState } from "react";
// import { useToken } from "./TokenContext";
import './Matching.css'
import arrow from "./img/arrow-left.svg"
import pfp from "./img/pfp.png"
import division from "./img/divisionn-1.svg"
import right from "./img/right.svg"
import bottom from "./img/bottom.svg"
import Navbar from '../navigation/NavigationBar'


function Allprofiles(){
    const userString = localStorage.getItem("userLoginInfo");
// Parse the string to convert it back to a JavaScript object
    const userLogin = userString ? JSON.parse(userString) : null;
// Access the _id value
const userId = userLogin && userLogin.user ? userLogin.user._id : null;  //this is logged in user id
const token = userLogin && userLogin.token ? userLogin.token : null; 
    // const { token } = useToken();
    const [profiles,setprofiles]=useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);

    const handleViewProfileClick = (profile) => {
      document.body.style.overflowY="hidden";
      setSelectedProfile(profile);
    };
  
    const handleCloseProfile = () => {
      console.log("yoyo");
      document.body.style.overflowY = "auto";
      setSelectedProfile(null);
    };

    const handleMatching=()=>{
       console.log({token});
        fetch("http://localhost:8000/api/v1/matching/match",{
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Accept":"application/json",
                "Access-Control-Allow-Origin":"*",
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
    }



    const handleMatchClick = (profileId) => {
     
      console.log(userId);
      console.log(profileId);
        // Call the /sendRequest endpoint
        fetch("http://localhost:8000/api/v1/chat-request/sendRequest", {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
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
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
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
            alert('Match Request Sent Successfully!🙂');
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
    
    return(
      <div>
<Navbar/>
      <span className="matchheading">Unlock Your Skill Synergy: Meet Your <span className="skillheading">SkillSwap </span>Allies</span>
      <div class="card-container">
            {profiles.map((profile)=>(
                <div class="card" key={profile.id}>
                  <div class="card-heading">Hi! I'm {profile.name}</div>
                  <div class="small-headings">
                      <div class="small-heading-1">Noida,India</div>
                      {/* <div class="small-heading-2">4.5 ⭐️</div> */}
                  </div>
                  <div class="card-text">
                  {profile.bio}
                  </div>
                  <div class="lower-section">
                      <a class="match-profile" onClick={() => handleViewProfileClick(profile)}>view full profile</a>
                      <button class="match-btn" onClick={() =>  handleMatchClick(profile.createdBy) }>Match</button>
                  </div>
              </div>
            ))}
          </div>
          {selectedProfile && (
            <div className="landing">
        <div class="ipad-mini">
        <div class="overlap">
          <div class="profilebanner"></div>
          <img  class="arrow-left" src={arrow} onClick={handleCloseProfile}/>
          <div class="profilebg"></div>
          <img class="pfp" src={selectedProfile.pic} />
          <div class="name">{selectedProfile.name}</div>
         
          <div class="location">{selectedProfile.city}</div>
          <p class="bio">
          {selectedProfile.bio}
          </p>
          <div class="contactdetails">
            <div class="email">
              <div class="overlap-group">
                <div class="emailplaceholder">Github</div>
                <div class="emailaddress">{selectedProfile.contacts.find(contact => contact.type === 'Github')?.value}</div>
              </div>
            </div>
            <div class="website">
              <div class="div">
                <div class="websiteplaceholder">LinkedIn</div>
                <div class="websitedotcom">{selectedProfile.contacts.find(contact => contact.type === 'LinkedIn')?.value}</div>
              </div>
            </div>
            <div class="overlap-2">
              <div class="phone">
                <div class="overlap-3">
                  <div class="phoneplaceholder">Phone number</div>
                  <div class="phonenumber">{selectedProfile.contacts.find(contact => contact.type === 'Phone')?.value}</div>
                </div>
              </div>
              <div class="contact">Contact</div>
            </div>
          </div>
          <div class="gender">
            <div class="overlap-4">
              <div class="gendertext">Gender</div>
              <div class="text-wrapper">{selectedProfile.gender[0]}</div>
            </div>
          </div>
          <div class="skills">
            <div class="overlap-5">
              <div class="text-wrapper-2">{selectedProfile.skills[0]}</div>
              <img class="divisionn" src={division} />
              <div class="NODEJS">{selectedProfile.skills[1]}</div>
              <img class="img" src={division} />
              <div class="text-wrapper-3">{selectedProfile.skills[2]}</div>
              <div class="text-wrapper-4">SKILLS</div>
            </div>
          </div>
          <div class="interests">
            <div class="overlap-6">
              <div class="text-wrapper-2">{selectedProfile.interests[0]}</div>
              <img class="divisionn" src={division}/>
              <div class="NODEJS">{selectedProfile.interests[1]}</div>
              <img class="img"src={division} />
              <div class="text-wrapper-3">{selectedProfile.interests[2]}</div>
              <div class="text-wrapper-5">INTERESTS</div>
            </div>
          </div>
          <div class="border">
            <div class="overlap-7">
              <img class="left" src={right} />
              <img class="right" src={right} />
              <img class="top" src={bottom} />
              <img class="bottom" src={bottom} />
            </div>
          </div>
        </div>
      </div>
      </div>
      )}

      </div>
    )
}

export default Allprofiles;



{/* <div class="card-container">
<div class="card">
    <div class="card-heading">Hi! I’m Samantha</div>
    <div class="small-headings">
        <div class="small-heading-1">Noida,India</div>
        <div class="small-heading-2">4.5 ⭐️</div>
    </div>
    <div class="card-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore

    </div>
    <div class="lower-section">
        <a class="profile">view full profile</a>
        <button class="match-btn">Match</button>
    </div>
</div>
<div class="card">
    <div class="card-heading">Hi! I’m Samantha</div>
    <div class="small-headings">
        <div class="small-heading-1">Noida,India</div>
        <div class="small-heading-2">4.5 ⭐️</div>
    </div>
    <div class="card-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore

    </div>
    <div class="lower-section">
        <a class="profile">view full profile</a>
        <button class="match-btn">Match</button>
    </div>
</div>
<div class="card">
    <div class="card-heading">Hi! I’m Samantha</div>
    <div class="small-headings">
        <div class="small-heading-1">Noida,India</div>
        <div class="small-heading-2">4.5 ⭐️</div>
    </div>
    <div class="card-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore

    </div>
    <div class="lower-section">
        <a class="profile">view full profile</a>
        <button class="match-btn">Match</button>
    </div>
</div>
<div class="card">
    <div class="card-heading">Hi! I’m Samantha</div>
    <div class="small-headings">
        <div class="small-heading-1">Noida,India</div>
        <div class="small-heading-2">4.5 ⭐️</div>
    </div>
    <div class="card-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore

    </div>
    <div class="lower-section">
        <a class="profile">view full profile</a>
        <button class="match-btn">Match</button>
    </div>
</div>
<div class="card">
    <div class="card-heading">Hi! I’m Samantha</div>
    <div class="small-headings">
        <div class="small-heading-1">Noida,India</div>
        <div class="small-heading-2">4.5 ⭐️</div>
    </div>
    <div class="card-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore

    </div>
    <div class="lower-section">
        <a class="profile">view full profile</a>
        <button class="match-btn">Match</button>
    </div>
</div>
</div> */}