import React from 'react'
import {useFormik} from 'formik'
import * as isoCountries from 'i18n-iso-countries';
import { useLocation } from 'react-router-dom';
import './userinfo.css'
import NavigationBar from "./navigation";
import Multiselect from 'multiselect-react-dropdown';

// Initialize the i18n-iso-countries library with the 'en' locale
isoCountries.registerLocale(require("i18n-iso-countries/langs/en.json"));




// Get an array of all country codes
const countryCodes = Object.keys(isoCountries.getAlpha2Codes());
const genderOptions = ['Male', 'Female', 'Other']; // Define your gender options here
// const hardcodedSkills = ['React', 'HTML', 'CSS', 'JavaScript', 'Node.js', 'C++', 'Java'];
// const hardcodedInterests = ['Music', 'Reading', 'Travel', 'Gaming', 'Sports', 'Cooking', 'Art'];


function Userinfo() {
  const location=useLocation();
  const Token=location.state.props;
  //console.log('in userinfo token',Token);
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
      { name: 'BootStrap', id: 15 },
      { name: 'JavaScript', id: 16 },
      { name: 'React', id: 17 },
      { name: 'HTML', id: 18 },
      { name: 'CSS', id: 19 },
      { name: 'JavaScript', id: 20 },
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
      { name: 'BootStrap', id: 15 },
      { name: 'JavaScript', id: 16 },
      { name: 'React', id: 17 },
      { name: 'HTML', id: 18 },
      { name: 'CSS', id: 19 },
      { name: 'JavaScript', id: 20 },
      // Add more interest options as needed
    ];
    const [selectedSkills, setSelectedSkills] = React.useState([]);
  const [selectedInterests, setSelectedInterests] = React.useState([]);
  const [myskills,setskills]=React.useState([]);
  const [myinterests,setinterests]=React.useState([]);

  
  console.log("hey");
  const formik= useFormik({
    initialValues:{
      name:'',
      username:'',
      nationality:'',
      city:'',
      contacts:[
        { type: 'Phone', value: '' },
      { type: 'Github', value: '' },
      { type: 'Facebook', value: '' },
      ],
      skills:[],
      interests:[],
      bio:'',
      gender:''
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
        };
        // Make an HTTP POST request to your server
        const response = await fetch('http://localhost:8000/api/v1/profile', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${Token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(profileData),
        });

        if (response.ok) {
          console.log('Form data submitted successfully');
        } else {
          console.error('Failed to submit form data');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    },


  })
  //console.log('form  values',formik.values)
  
  return (
    <div className='head'>
      <NavigationBar/>
      
      <div className="login-form">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' name='name' onChange={formik.handleChange} value={formik.values.name}/>

        <label htmlFor='username'>Username</label>
        <input type='text' id='username' name='username' onChange={formik.handleChange} value={formik.values.username}/>
         
        <label htmlFor='nationality'>Nationality</label>
        <select
          id='nationality'
          name='nationality'
          onChange={formik.handleChange}
          value={formik.values.nationality}
          className='nationality'
        >
        
          <option value=''>Select nationality</option>
          {countryCodes.map((countryCode) => (
            <option key={countryCode} value={countryCode}>
              {isoCountries.getName(countryCode, 'en')}
            </option>
          ))}
        </select>

        <label htmlFor='city'>City</label>
        <input type='text' id='city' name='city' onChange={formik.handleChange} value={formik.values.city}/>

       

        <div>
            <label>Contacts</label>
            {formik.values.contacts.map((contact, index) => (
              <div key={index}>
                <input
                  type="text"
                  name={`contacts[${index}].value`}
                  placeholder={`Enter ${contact.type} value`}
                  onChange={formik.handleChange}
                  value={contact.value}
                />
              </div>
            ))}
          </div>

          {/* Skills Multiselect */}
        <Multiselect
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
        
        {/* Interests Multiselect */}
        <Multiselect
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

 

        <label htmlFor='bio'>Bio</label>
        <input type='text' id='bio' name='bio' onChange={formik.handleChange} value={formik.values.bio}/>


        <div>
          <label>Gender:</label>
          <div>
            {genderOptions.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="gender"
                  value={option} // Use lowercase for consistency
                  checked={formik.values.gender === option}
                  onChange={formik.handleChange}
                />
                {option}
              </label>
            ))}
          </div>
        </div>


        
        <button type='submit'>Submit</button>

      </form>
      </div>
      
    </div>
  )
}

export default Userinfo;





.head{
    width: 500px;
    margin: 0 auto;
}
.login-form {
    margin-top: 90px;
  }
  .login-form form {
    display: -ms-grid;
    display: grid;
  }
  .login-form form input {
    font-size: 16px;
    font-weight: normal;
    background: rgba(57, 57, 57, 0.07);
    margin: 12.5px 0;
    height: 68px;
    border: none;
    padding: 0 30px;
    border-radius: 10px;
  }
  .nationality {
    font-size: 16px;
    font-weight: normal;
    background: rgba(57, 57, 57, 0.07);
    margin: 12.5px 0;
    height: 68px;
    border: none;
    padding: 0 30px;
    border-radius: 10px;
  }
  .login-form form button[type=submit] {
    background: -webkit-linear-gradient(110deg, #f794a4 0%, #fdd6bd 100%);
    background: -o-linear-gradient(110deg, #f794a4 0%, #fdd6bd 100%);
    background: linear-gradient(-20deg, #f794a4 0%, #fdd6bd 100%);
    border: none;
    margin-top: 8px;
    margin-bottom: 20px;
    width: 241px;
    height: 58px;
    text-transform: uppercase;
    color: white;
    border-radius: 10px;
    position: relative;
    z-index: 2;
    font-weight: bold;
    font-size: 20px;
  }
  .login-form form button[type=submit]:hover::after {
    opacity: 1;
  }
  .login-form form button[type=submit]::after {
    content: "";
    position: absolute;
    z-index: -1;
    border-radius: 10px;
    opacity: 0;
    top: 0;
    left: 0;
    -webkit-transition: 0.3s ease-in-out;
    -o-transition: 0.3s ease-in-out;
    transition: 0.3s ease-in-out;
    right: 0;
    bottom: 0;
    background: -webkit-gradient(linear, left bottom, left top, from(#09203f), to(#537895));
    background: -webkit-linear-gradient(bottom, #09203f 0%, #537895 100%);
    background: -o-linear-gradient(bottom, #09203f 0%, #537895 100%);
    background: linear-gradient(to top, #09203f 0%, #537895 100%);
  }