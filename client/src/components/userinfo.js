import React, { useState,useEffect,useRef } from 'react'
import {useFormik} from 'formik'
import * as isoCountries from 'i18n-iso-countries';
import { useLocation } from 'react-router-dom';
import './userinfo.css'
import Multiselect from 'multiselect-react-dropdown';
import skillswapimg from './images/skillswapimg.png'
import group12 from './images/group-12.svg'
import camera from './images/camera.svg'
import rectangle from './images/rectangle-11@2x.png'
import rectanglebg from './images/rectanglebg.jpg'
import group13 from './images/group-13.svg'
import { useNavigate } from "react-router-dom";
import Navbar from './navigation/NavigationBar';
import convertToBase64 from './helper/convert';

// Initialize the i18n-iso-countries library with the 'en' locale
isoCountries.registerLocale(require("i18n-iso-countries/langs/en.json"));
// Get an array of all country codes
const countryCodes = Object.keys(isoCountries.getAlpha2Codes());
const genderOptions = ['Male', 'Female', 'Other']; // Define your gender options here



function Userinfo() {
  const [image, setImage] = useState();
  const inputRef=useRef(null);
 
  const [showProfileSetup, setShowProfileSetup] = useState(true);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Show the "Let's setup your profile" div initially
    setShowProfileSetup(true);

    // Set a timer to hide the div and remove the component after 2 seconds
    const timer = setTimeout(() => {
      setShowProfileSetup(false);

      // Wait for a brief moment to allow the animation to complete
      setTimeout(() => {
        // Remove the component by setting showProfileSetup to false
        setShowProfileSetup(false);
      }, 800); // Adjust this duration based on your animation time
    }, 1700); // 2000 milliseconds = 2 seconds

    // Clear the timer when the component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
  fetchUserProfile();
}, []);

  const navigate=useNavigate();
  // const location=useLocation();
  // const Token=location.state.props;
  //console.log('in userinfo token',Token);
  const userString = localStorage.getItem("userLoginInfo");
  const userLogin = userString ? JSON.parse(userString) : null;
  const Token = userLogin && userLogin.token ? userLogin.token : null; 
  const userId = userLogin && userLogin.user ? userLogin.user._id : null; 
  const handleMainClick = () => {
    navigate("/");
};
const handlematch = () => {
  navigate("/matching");
};

const fetchUserProfile = async () => {
  try {
    const response = await fetch(`http://localhost:8000/api/v1/profile/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.getUserProfile[0]);
      setProfileData(data.getUserProfile[0]);
    } else {
      console.error('Failed to fetch user profile');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};





const getrequests = async () => {
  try {
    // Make an HTTP GET request to your server
    const response = await fetch('http://localhost:8000/api/v1/chat-request/getAllRequest', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Pending Requests:', data);
      // Handle the data as needed, such as updating state or displaying in the UI
    } else {
      console.error('Failed to fetch pending requests');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

  const skills=[
      { name: 'ReactJs', id: 1 },
      { name: 'HTML', id: 2 },
      { name: 'CSS', id: 3 },
      { name: 'JavaScript', id: 4 },
      { name: 'NodeJs', id: 5 },
      { name: 'MongoDb', id: 6 },
      { name: 'SQL', id: 7 },
      { name: 'CPP', id: 8 },
      { name: 'C', id: 9 },
      { name: 'Java', id: 10 },
      { name: 'Python', id: 11 },
      { name: 'Machine Learning', id: 12 },
      { name: 'Blockchain', id: 13 },
      { name: 'Artificial Intelligence', id: 14 },
      { name: 'ExpressJs', id: 15 },
      { name: 'Golang', id: 16 },
      { name: 'Typescript', id: 17 },
      { name: 'Angular.js', id: 18 },
      { name: 'PostgreSQL', id: 19 },
      { name: 'Django', id: 20 },
      // Add more skill options as needed
    ];
    const interests=[
      { name: 'ReactJs', id: 1 },
      { name: 'HTML', id: 2 },
      { name: 'CSS', id: 3 },
      { name: 'JavaScript', id: 4 },
      { name: 'NodeJs', id: 5 },
      { name: 'MongoDb', id: 6 },
      { name: 'SQL', id: 7 },
      { name: 'CPP', id: 8 },
      { name: 'C', id: 9 },
      { name: 'Java', id: 10 },
      { name: 'Python', id: 11 },
      { name: 'Machine Learning', id: 12 },
      { name: 'Blockchain', id: 13 },
      { name: 'Artificial Intelligence', id: 14 },
      { name: 'ExpressJs', id: 15 },
      { name: 'Golang', id: 16 },
      { name: 'Typescript', id: 17 },
      { name: 'Angular.js', id: 18 },
      { name: 'PostgreSQL', id: 19 },
      { name: 'Django', id: 20 },
      // Add more interest options as needed
    ];
    const [selectedSkills, setSelectedSkills] = React.useState([]);
  const [selectedInterests, setSelectedInterests] = React.useState([]);
  const [myskills,setskills]=React.useState([]);
  const [myinterests,setinterests]=React.useState([]);

  const [activepanel,setactivepanel]=useState('personal');
  const handlefirstnextClick = () => {
    setactivepanel('linksocials')
  }
  const handlesecondnextClick = () => {
    setactivepanel('bio')
  }
  console.log("hey");
  const formik= useFormik({
    initialValues:{
      name:'',               //done
      username:'',          //done
      nationality:'',   //done
      city:'',    //done
      contacts:[
        { type: 'Phone', value: '' },
      { type: 'Github', value: '' },
      { type: 'LinkedIn', value: '' },
      ],
      skills:[],
      interests:[],
      bio:'',
      gender:'',   //done
      pic:''
    },
    // onSubmit:values=>{
    //    console.log('form data',values)
    //  }
    onSubmit: async (values) => {
      try {
        console.log("hey2");
       
        const contacts = values.contacts.filter((contact) => contact.value);
        const profileData = {
          name: values.name,
          username: values.username,
          nationality: values.nationality,
          city:values.city,
          contacts, // Assuming contacts is an array of objects with type and value properties
          skills:myskills,
          interests:myinterests,
          bio: values.bio,
          gender: values.gender,
          // You can add other properties if needed
          pic:image,
        };
        // Make an HTTP POST request to your server
        const response = await fetch('http://localhost:8000/api/v1/profile', {
          
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${Token}`,
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":"*",
            
          },
          body: JSON.stringify(profileData),
          
        });

        if (response.ok) {
          // console.log(profileData);
          console.log('Form data submitted successfully');
          alert("Profile Created Successfully");
          navigate("/dashboard");
        } else {
          // console.log(profileData);
          console.error('Failed to submit form data');
          alert("Kindly Enter All Fields!");
        }
      } catch (error) {
        // console.log(image);
        console.error('An error occurred:', error);
        alert("Kindly Enter All Fields!");
      }
    },


  })
  //console.log('form  values',formik.values)
  const handleImageClick=()=>{
    inputRef.current.click();
  }

  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    console.log(base64);
    setImage(base64);
  }

  const getContactValue = (contacts, contactType) => {
    const githubContact = contacts.find(contact => contact.type.toLowerCase() === contactType.toLowerCase());
    return githubContact ? githubContact.value : '';
  };
  
  return (
   <>
    {showProfileSetup && (
        <div className="register-3 show-profile-setup" id="register3Container">
          <b className="lets-setup-your1">Let's setup your profile</b>
        </div>
      )}
   {profileData ? (
      <div>




{activepanel === 'personal' && (
  // Render the content for 'personal-details' tab
  <div class="profile">
    <div class="container">
        <div class="rectangle"></div>
        <div class="setup-profile">Setup Profile</div>
      </div>
      <div class="form1">
        <div class="form2">
          <div class="city">
            <div class="city1">City</div>
            <div class="city-child">
              {profileData.city}
            </div>
           
          </div>
          <div class="nationality">
            <div class="city1">Country</div>
            <div class="nationality-child">
            {profileData.nationality}
            </div>
   
            
          </div>
          <div class="contact">
            <div class="city1">Username</div>
            <div class="contact-child">
           {profileData.username}
            </div>
            
          </div>

          
          <div class="gender">
            <div class="city1">Gender</div>
            <div class="nationality-child mygender">
            <div>
           {profileData.gender}
          </div>

              </div>
            
          </div>



          <div class="name">
            <div class="city1">Name</div>
            <div class="nationality-child">
           {profileData.name}
            </div>
           
          </div>
        </div>
        <div class="nextbutton">
          <div class="nextbutton-child"></div>
          <div class="next1"><button onClick={handlefirstnextClick} className='mybutton'>Next</button></div>
        </div>


        <div class="profilepicture">
          
       <img className="getimage" src={profileData.pic} alt=""/>
        </div>


      </div>
      <div class="sidepanel">
        <img class="sidepanel-child" alt=""  src={rectanglebg}/>

        <div class="tabs">
          {/* <div class="delete-account">Delete Account</div> */}  
          <div class="bio" onClick={() => setactivepanel('bio')}>Bio</div>
          <div class="link-socials" onClick={() => setactivepanel('linksocials')}>Link Socials</div>
          <div class="activetab" onClick={() => setactivepanel('personal')}>
            <div class="activetab-child"></div>
            <div class="activetabtext">
              <div class="personal-details">Personal Details</div>
              <div class="activetabtext-child"></div>
              <img class="activetabtext-item" alt="" src={group13}/>
            </div>
          </div>
        </div>
        <div class="progressbar">
          <div class="ellipse-parent">
            <div class="group-child"></div>
            <div class="group-item"></div>
            <div class="div1">1</div>
          </div>
          <div class="first-step-done">First step!</div>
        </div>
      </div>
   
      <Navbar/>

      
    </div>
    )}





    {/* link socials */}
    {activepanel === 'linksocials' && (
  // Render the content for 'personal-details' tab
  <div class="profile">
    <div class="container">
        <div class="rectangle"></div>
        <div class="setup-profile">Setup Profile</div>
      </div>
      <div class="form1">
        <div class="form2">
        
          
          
          
          <div class="name">
            <div class="city1">Contact</div>
            {/* <div class="nationality-child"></div> */}
            <div class="delhi">
            
            {profileData.contacts.map((contact, index) => (
    <div key={index}>
      <p className="mycontactsinfo contact-text">
        {contact.type}: {contact.value}
      </p>
    </div>
  ))}
          



            </div>
          </div>
        </div>
        <div class="nextbutton">
          <div class="nextbutton-child"></div>
          <div class="next1"><button onClick={handlesecondnextClick} className='mybutton'>Next</button></div>
        </div>
        <div class="profilepicture">
          
       <img className="getimage" src={profileData.pic} alt=""/>
        </div>
      </div>
      <div class="sidepanel">
        <img class="sidepanel-child" alt=""  src={rectanglebg}/>

        <div class="tabs">
          {/* <div class="delete-account">Delete Account</div> */}
          <div class="bio" onClick={() => setactivepanel('bio')}>Bio</div>
          <div class="link-socials" onClick={() => setactivepanel('personal')}>Personal Details</div>
          <div class="activetab" onClick={() => setactivepanel('linksocials')}>
            <div class="activetab-child"></div>
            <div class="activetabtext">
              <div class="personal-details">Link Socials</div>
              <div class="activetabtext-child"></div>
              <img class="activetabtext-item" alt="" src={group13}/>
            </div>
          </div>
        </div>
        <div class="progressbar">
          <div class="ellipse-parent">
            <div class="group-child"></div>
            <div class="group-item"></div>
            <div class="div1">2</div>
          </div>
          <div class="first-step-done">Second step!</div>
        </div>
      </div>
      <Navbar/>
      
    </div>
    )}






{/* bio */}
{activepanel === 'bio' && (
  // Render the content for 'personal-details' tab
  <div class="profile">
    <div class="container">
        <div class="rectangle"></div>
        <div class="setup-profile">Setup Profile</div>
      </div>
      <div class="form1">
        <div class="form2">
        
          
        <div class="nationality">
            <div class="city1">Interests<span className='myskillspan'> (Select 3 interests)</span></div>
            <div class="nationality-child">
            {profileData.interests.map((interest, index) => (
    <span key={index}>
      {interest}{index < profileData.interests.length - 1 ? ', ' : ''}
    </span>
  ))}
        
</div>
       </div>


          
          
          
        <div class="contact">
            <div class="city1">Skills <span className='myskillspan'> (Select 3 skills)</span></div>
            <div class="contact-child">
            {profileData.skills.map((skill, index) => (
    <span key={index}>
      {skill}{index < profileData.skills.length - 1 ? ', ' : ''}
    </span>
  ))}



            </div>
           
           
    
          </div>


          <div class="name">
            <div class="city1">Bio</div>
            <div class="nationality-child">
           {profileData.bio}
            </div>
            
          </div>

        </div>
        <div class="nextbutton">
          <div class="nextbutton-child"></div>
          <div class="next1"><button type='submit' className='mybutton'>Submit</button></div>
        </div>
        <div class="profilepicture">
          
          <img className="getimage" src={profileData.pic} alt=""/>
           </div>
      </div>
      <div class="sidepanel">
        <img class="sidepanel-child" alt=""  src={rectanglebg}/>

        <div class="tabs">
          {/* <div class="delete-account">Delete Account</div> */}
          <div class="bio" onClick={() => setactivepanel('linksocials')}>Link Socials</div>
          <div class="link-socials" onClick={() => setactivepanel('personal')}>Personal Details</div>
          <div class="activetab" onClick={() => setactivepanel('bio')}>
            <div class="activetab-child"></div>
            <div class="activetabtext">
              <div class="personal-details">Bio</div>
              <div class="activetabtext-child"></div>
              <img class="activetabtext-item" alt="" src={group13}/>
            </div>
          </div>
        </div>
        <div class="progressbar">
          <div class="ellipse-parent">
            <div class="group-child"></div>
            <div class="group-item"></div>
            <div class="div1">3</div>
          </div>
          <div class="first-step-done">Last Step!</div>
        </div>
      </div>
      <Navbar/>
      
    </div>
    )}





      </div>

   ):(//my og input form
    <form onSubmit={formik.handleSubmit}>
    {/* <div className={`register-3 ${showProfileSetup ? 'show-profile-setup' : ''}`} id="register3Container">
        <b className="lets-setup-your1">Let's setup your profile</b>
      </div> */}
     
    {activepanel === 'personal' && (
  // Render the content for 'personal-details' tab
  <div class="profile">
    <div class="container">
        <div class="rectangle"></div>
        <div class="setup-profile">Setup Profile</div>
      </div>
      <div class="form1">
        <div class="form2">
          <div class="city">
            <div class="city1">City</div>
            <div class="city-child">
              <input className='mycity' type='text' id='city' name='city' onChange={formik.handleChange} value={formik.values.city}/>
            </div>
           
          </div>
          <div class="nationality">
            <div class="city1">Country</div>
            <div class="nationality-child">
            <select id='nationality'
          name='nationality'
          onChange={formik.handleChange}
          value={formik.values.nationality}
          className='mycountry'
        >
        
          <option value=''>Select nationality</option>
          {countryCodes.map((countryCode) => (
            <option key={countryCode} value={countryCode}>
              {isoCountries.getName(countryCode, 'en')}
            </option>
          ))}
        </select>
            </div>
   
            
          </div>
          <div class="contact">
            <div class="city1">Username</div>
            <div class="contact-child">
            <input className='myusername' type='text' id='username' name='username' onChange={formik.handleChange} value={formik.values.username}/>
            </div>
            
          </div>

          
          <div class="gender">
            <div class="city1">Gender</div>
            <div class="nationality-child mygender">
            <div>
            {genderOptions.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="gender"
                  value={option} // Use lowercase for consistency
                  checked={formik.values.gender === option}
                  onChange={formik.handleChange}
                  className='gender-style'
                />
                {option}
              </label>
            ))}
          </div>

              </div>
            
          </div>



          <div class="name">
            <div class="city1">Name</div>
            <div class="nationality-child">
            <input className='myname' type='text' id='name' name='name' onChange={formik.handleChange} value={formik.values.name}/>
            </div>
           
          </div>
        </div>
        <div class="nextbutton">
          <div class="nextbutton-child"></div>
          <div class="next1"><button onClick={handlefirstnextClick} className='mybutton'>Next</button></div>
        </div>


        <div class="profilepicture">
          
        {image ? <img src={image} alt="" className='img-display-after'/>:<img
            class="profilepicture-child img-display-before"
            alt=""
            src={group12}
            onClick={handleImageClick}
          />}

          <div class="choose-parent">
            {/* <div class="choose">Choose</div>
            <img class="camera-icon" alt="" src={camera} /> */}
            <input type="file" onChange={onUpload} ref={inputRef} style={{display:"none"}}/>
          </div>
        </div>


      </div>
      <div class="sidepanel">
        <img class="sidepanel-child" alt=""  src={rectanglebg}/>

        <div class="tabs">
          {/* <div class="delete-account">Delete Account</div> */}  
          <div class="bio" onClick={() => setactivepanel('bio')}>Bio</div>
          <div class="link-socials" onClick={() => setactivepanel('linksocials')}>Link Socials</div>
          <div class="activetab" onClick={() => setactivepanel('personal')}>
            <div class="activetab-child"></div>
            <div class="activetabtext">
              <div class="personal-details">Personal Details</div>
              <div class="activetabtext-child"></div>
              <img class="activetabtext-item" alt="" src={group13}/>
            </div>
          </div>
        </div>
        <div class="progressbar">
          <div class="ellipse-parent">
            <div class="group-child"></div>
            <div class="group-item"></div>
            <div class="div1">1</div>
          </div>
          <div class="first-step-done">First step!</div>
        </div>
      </div>
   
      <Navbar/>

      
    </div>
    )}





    {/* link socials */}
    {activepanel === 'linksocials' && (
  // Render the content for 'personal-details' tab
  <div class="profile">
    <div class="container">
        <div class="rectangle"></div>
        <div class="setup-profile">Setup Profile</div>
      </div>
      <div class="form1">
        <div class="form2">
        
          
          
          
          <div class="name">
            <div class="city1">Contact</div>
            {/* <div class="nationality-child"></div> */}
            <div class="delhi">
            
            {formik.values.contacts.map((contact, index) => (
              <div key={index}>
              
                <input
                className='mycontactsinfo'
                  type="text"
                  name={`contacts[${index}].value`}
                  placeholder={`Enter ${contact.type} value`}
                  onChange={formik.handleChange}
                  value={contact.value}
                />
               
              </div>
            ))}
          



            </div>
          </div>
        </div>
        <div class="nextbutton">
          <div class="nextbutton-child"></div>
          <div class="next1"><button onClick={handlesecondnextClick} className='mybutton'>Next</button></div>
        </div>
      
      </div>
      <div class="sidepanel">
        <img class="sidepanel-child" alt=""  src={rectanglebg}/>

        <div class="tabs">
          {/* <div class="delete-account">Delete Account</div> */}
          <div class="bio" onClick={() => setactivepanel('bio')}>Bio</div>
          <div class="link-socials" onClick={() => setactivepanel('personal')}>Personal Details</div>
          <div class="activetab" onClick={() => setactivepanel('linksocials')}>
            <div class="activetab-child"></div>
            <div class="activetabtext">
              <div class="personal-details">Link Socials</div>
              <div class="activetabtext-child"></div>
              <img class="activetabtext-item" alt="" src={group13}/>
            </div>
          </div>
        </div>
        <div class="progressbar">
          <div class="ellipse-parent">
            <div class="group-child"></div>
            <div class="group-item"></div>
            <div class="div1">2</div>
          </div>
          <div class="first-step-done">Second step!</div>
        </div>
      </div>
      <Navbar/>
      
    </div>
    )}






{/* bio */}
{activepanel === 'bio' && (
  // Render the content for 'personal-details' tab
  <div class="profile">
    <div class="container">
        <div class="rectangle"></div>
        <div class="setup-profile">Setup Profile</div>
      </div>
      <div class="form1">
        <div class="form2">
        
          
        <div class="nationality">
            <div class="city1">Interests<span className='myskillspan'> (Select 3 interests)</span></div>
            <div class="nationality-child">
            <Multiselect className='myinterests'
          options={interests}
          selectedValues={selectedInterests}
          onSelect={(selectedList) => {
            // Extract the names from selected skills and update myskills
            const interestNames = selectedList.map((skill) => skill.name);
            setinterests(interestNames);
          }}
            onRemove={(selectedList) => {
              // Extract the names from selected skills and update myskills
              const interestNames = selectedList.map((skill) => skill.name);
              setinterests(interestNames);
            }}
          displayValue="name"
          placeholder="Select Interests"
        />
        
</div>
       </div>


          
          
          
        <div class="contact">
            <div class="city1">Skills <span className='myskillspan'> (Select 3 skills)</span></div>
            <div class="contact-child">
            <Multiselect className='myskills'
          options={skills}
          selectedValues={selectedSkills}
          onSelect={(selectedList) =>{
            // Extract the names from selected skills and update myskills
            const skillNames = selectedList.map((skill) => skill.name);
            setskills(skillNames);
          }}
            onRemove={(selectedList) => {
              // Extract the names from selected skills and update myskills
              const skillNames = selectedList.map((skill) => skill.name);
              setskills(skillNames);
            }}
          displayValue="name"
          placeholder="Select Skills"
        />



            </div>
           
           
    
          </div>


          <div class="name">
            <div class="city1">Bio</div>
            <div class="nationality-child">
            <input className='mybio' type='text' id='bio' name='bio' onChange={formik.handleChange} value={formik.values.bio}/>
            </div>
            
          </div>

        </div>
        <div class="nextbutton">
          <div class="nextbutton-child"></div>
          <div class="next1"><button type='submit' className='mybutton'>Submit</button></div>
        </div>
       
      </div>
      <div class="sidepanel">
        <img class="sidepanel-child" alt=""  src={rectanglebg}/>

        <div class="tabs">
          {/* <div class="delete-account">Delete Account</div> */}
          <div class="bio" onClick={() => setactivepanel('linksocials')}>Link Socials</div>
          <div class="link-socials" onClick={() => setactivepanel('personal')}>Personal Details</div>
          <div class="activetab" onClick={() => setactivepanel('bio')}>
            <div class="activetab-child"></div>
            <div class="activetabtext">
              <div class="personal-details">Bio</div>
              <div class="activetabtext-child"></div>
              <img class="activetabtext-item" alt="" src={group13}/>
            </div>
          </div>
        </div>
        <div class="progressbar">
          <div class="ellipse-parent">
            <div class="group-child"></div>
            <div class="group-item"></div>
            <div class="div1">3</div>
          </div>
          <div class="first-step-done">Last Step!</div>
        </div>
      </div>
      <Navbar/>
      
    </div>
    )}


      
    </form>
   )}
    </>
  )
}

export default Userinfo;

