import React,{useState} from "react"
import './signup.css'
import { useNavigate } from "react-router-dom";
// import NavigationBar from "./navigation";
import skillswapimg from './images/skillswapimg.png'
import illustration2 from './images/illustration2.svg'
// import group6 from './images/group-6.svg'
import mdipasswordoffoutline from './images/mdipasswordoffoutline.svg'
import icoutlineemail from './images/icoutlineemail.svg'



function Signup(){

    const [signformData, setSignFormData] = useState({
        uname: '',
        email: '',
        password:''
      });
      const navigate=useNavigate();
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSignFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
      };
      const handleMainClick = () => {
        navigate("/");
    };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const {uname,email,password}=signformData;
        console.log('Form data:', signformData);
    
        // Add further login logic here
        fetch("http://localhost:8000/api/v1/auth/register",{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body:JSON.stringify({
               name:uname,email,password
            }),
        }).then((res)=>res.json())
        .then((data)=>{
            console.log(data,"userRegiter")
            navigate("/login");
        })
        .catch((error)=>{
          console.error('An error occurred:', error);
          alert('Registration failed. Enter All Fields!');
        })
      };
   
    return(
      <div class="register-2" id="register2Container">
      <b class="lets-setup-your">Let's setup your profile</b>
      <div class="navbar">
        <div class="navholder"></div>
        {/* <div class="navbutton">
          <div class="navbutton-child"></div>
          <div class="register">Register</div>
        </div> */}
        {/* <div class="navitems">
          <div class="home">Home</div>
          <div class="about-us">About Us</div>
          <div class="contact-us">Contact Us</div>
        </div> */}
        <div onClick={handleMainClick}>
        <img class="whatsapp-image-2023-10-30-at-6-icon" alt="" src={skillswapimg}/>
        </div>
       
      </div>
      <img class="illustration-icon2" alt="" src={illustration2}/>

      <div class="hero">
      <form onSubmit={handleSubmit}>
        <div class="form">
          <div class="confirmpassword">
            <div class="confirm-password">
              <span>Password</span>
              <span class="span">*</span>
            </div>
            
            <div class="confirmpassword-child myalign">
            <input type="password" placeholder="Password" name="password" value={signformData.password} onChange={handleInputChange} className="inputalign"/>
            </div>
          
         

            <img
              class="mdipassword-off-outline-icon"
              alt=""
              src={mdipasswordoffoutline}
            />
          </div>
          <div class="password">
            <div class="confirm-password">
              <span>Email</span>
              <span class="span">*</span>
            </div>
            <div class="confirmpassword-child myalign">
               <input type="email" placeholder="E-mail Address" name="email" value={signformData.email} onChange={handleInputChange}  className="inputalign"/>
            </div>
           
            <img
              class="mdipassword-off-outline-icon"
              alt=""
              src={mdipasswordoffoutline}
            />
          </div>
          <div class="username">
            <div class="confirm-password">
              <span>Name</span>
              <span class="span">*</span>
            </div>
            <div class="confirmpassword-child myalign"> 
            <input type="text" placeholder="Name" name="uname" value={signformData.uname} onChange={handleInputChange}  className="inputalign" />
            </div>
            
            <img
              class="icoutline-email-icon"
              alt=""
              src={icoutlineemail}
            />
          </div>
          <div class="line-parent">
            <div class="frame-child"></div>
            <div class="account-details">Account Details</div>
          </div>
          <div class="button" id="buttonContainer">
            <div class="button-child"></div>
            <button type="submit" className="next">Next</button>
            {/* <button type="submit">SIGN-UP</button> */}
          </div>
         
          <div class="already-have-an-container">
            <span>Already have an account ? </span>
            <span class="registersign-in">Sign In</span>
          </div>
        </div>
        </form>
      </div>
    </div>
        
    )
}
export default Signup;

