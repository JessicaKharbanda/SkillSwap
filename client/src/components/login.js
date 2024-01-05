import React,{useState} from "react"
import './signup.css'
import { useNavigate } from "react-router-dom";
// import NavigationBar from "./navigation";
import { useToken } from "./TokenContext";
import skillswapimg from './images/skillswapimg.png'
import illustration2 from './images/illustration2.svg'
// import group6 from './images/group-6.svg'
import mdipasswordoffoutline from './images/mdipasswordoffoutline.svg'
import icoutlineemail from './images/icoutlineemail.svg'



function Login(){
    console.log("heya");
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
     // const [accessToken, setAccessToken] = useState("");
     const navigate=useNavigate();
     const { setToken } = useToken();
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
      };
      const handleMainClick = () => {
        navigate("/");
    };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const {email,password}=formData;
        
        // console.log('Form data:', formData);  i did breach ke liye
    
        // Add further login logic here
        fetch("http://localhost:8000/api/v1/auth/login",{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body:JSON.stringify({
               email,password
            }),
        }).then((res)=>res.json())
        .then((data)=>{
            console.log(data,"userLOGINNRegiter")
            // console.log(data.id,"i am id")
            if (data.token) {
              const Token=data.token;
             
              // console.log('in login token',Token);  i did breach ke liye
              localStorage.setItem("userLoginInfo", JSON.stringify(data));
              setToken(Token);
              navigate("/dashboard");
            //setAccessToken(Token);
            }
            // else{
            //   console.log('Login failed');
            //   alert('Login failed. Enter Correct Credentials!');
            // }
        })
        .catch((error) => {  //not coming here upar hi catched
          console.log("heyahhhhh")
          console.log(error.message); 
          alert('Login failed. Enter All Fields!');
      });
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
          
          <div class="confirmpassword confirmpasswordlogin ">
            <div class="confirm-password">
              <span>Password</span>
              <span class="span">*</span>
            </div>
            
            <div class="confirmpassword-child myalign">
            <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} className="inputalign"/>
            </div>
          
         

            <img
              class="mdipassword-off-outline-icon"
              alt=""
              src={mdipasswordoffoutline}
            />
          </div>
          <div class="password email-login">
            <div class="confirm-password">
              <span>Email</span>
              <span class="span">*</span>
            </div>
            <div class="confirmpassword-child myalign">
               <input type="email" placeholder="E-mail Address" name="email" value={formData.email} onChange={handleInputChange}  className="inputalign"/>
            </div>
           
            <img
              class="icoutline-email-icon"
              alt=""
              src={icoutlineemail}
            />
          
          </div>
          
          <div class="line-parent">
            <div class="frame-child"></div>
            <div class="account-details account-details-login">Enter Account Details</div>
          </div>
          <div class="button" id="buttonContainer">
            <div class="button-child"></div>
            <button type="submit" className="next nextlogin">Log In</button>
            {/* <button type="submit">SIGN-UP</button> */}
          </div>
         
          <div class="already-have-an-container">
            <span>Let's build your community! </span>
            <span class="registersign-in">Join Us</span>
          </div>
        </div>
        </form>
      </div>
    </div>


    )
}
export default Login;

