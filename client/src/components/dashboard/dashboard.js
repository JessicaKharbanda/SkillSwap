import React from 'react'
import './dashboard.css'
import frame from "./img/frame-4.svg"
import frame1 from "./img/frame-4-1.svg"
import home3 from "./img/home-3.svg"
import home2 from "./img/home-2.svg"
import home from "./img/home.svg"
import image11 from "./img/image-11.png"
import image10 from "./img/image-10.png"
import data from "./img/3d-data-management-2.png"
import grad from "./img/grad-01.png"
import cloud from "./img/3d-object-cloud-storage-1-1.png"
import folder from "./img/folder.svg"
// import time from "./img/time-square.svg"
import vector1 from "./img/vector-1.svg"
import object from "./img/object.png"
import rectangle5 from "./img/rectangle-5.png"
import rectangle6 from "./img/rectangle-6.png"
import rectangle7 from "./img/rectangle-7.png"
// import paper from "./img/paper.png"
import { useNavigate } from "react-router-dom";
import Navbar from '../navigation/NavigationBar'


const Dashboard = () => {
  const navigate = useNavigate();
  const logout = () => {
    console.log("logout");
    try {
      // Clear local storage item
     ;
      localStorage.removeItem('userLoginInfo');
      
      // Navigate to the home page or login page
      navigate("/");
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  return (
    <div>

    <Navbar/>
    <div className="skill-dashboard">
      
      <div className="div">
        <div className="overlap">
          <div className="frame">
            <div className="frame-2" onClick={logout}>
               <img className="img" src={frame} alt=""/>
              <div className="text-wrapper">Logout</div>
            </div>
            {/* <button className="ishita" onClick={() => console.log('Clicked')}>hehe</button> */}
            <div className="frame-2" onClick={() => navigate("/userinfo")}>
              <img className="img" src={frame1} alt=""/>
              <div className="text-wrapper">Profile</div>
            </div>
          </div>
          <div className="frame-3">
            <div className="frame-4">
              <div className="frame-5" onClick={() => navigate("/")}>
                <img className="home myhome" src={home3} alt=""/>
                <div className="text-wrapper-2">Home</div>
              </div>
              <div className="frame-5" onClick={() => navigate("/matching")}>
                <img className="home" src={home2} alt=""/>
                <div className="text-wrapper-2">Matches</div>
              </div>
            </div>
            <div className="frame-4">
              <div className="frame-5">
                <img className="home" src={home} alt=""/>
                <div className="text-wrapper-2">Invites</div>
              </div>
              <div className="frame-6" onClick={()=>{navigate('/todo')}}>
                <img className="home" src={home} alt=""/>
                <div className="text-wrapper-3">Todo</div>
                <div className="group">
                  <div className="dashboard-rectangle"></div>
                 
                </div>
              </div>
            </div>
            <div className="frame-4">
              <div className="frame-5" onClick={()=>{navigate('/queries')}}>
                <div className="frame-wrapper">
                  <div className="image-wrapper"><img class="image" src={image11} alt=""/></div>
                </div>
                <div className="text-wrapper-5">Doubts</div>
              </div>
              <div className="frame-7" onClick={()=>{navigate('/confirmedmatches')}}>
                <div className="img-wrapper"><img class="image-2" src={image10} alt=""/></div>
                <div className="text-wrapper-6">Messages</div>
              </div>
            </div>
            <div className="group-2">
              <div className="dashboard-rectangle"></div>
             
            </div>
          </div>
          <div className="div-wrapper">
            <div className="frame-8">
              <div className="frame-9"><div class="text-wrapper-7">Get Started ✨</div></div>
              <div className="frame-10" onClick={() => navigate("/matching")}><div class="text-wrapper-8">See possible matches</div></div>
              <img className="element-data-management" src={data} alt=""/>
            </div>
          </div>
        </div>
        <div className="overlap-group-wrapper">
          <div className="overlap-group">
            <div className="frame-11">
              <img className="grad" src={grad} alt=""/>
              <div className="text-wrapper-9">Why SkillSwap?</div>
              <p className="p">
                Discover a community where expertise converges, paving the way for skill exchange and personal growth.
                Join us to connect, share knowledge, and forge meaningful collaborations. Explore a platform tailored to
                elevate your skills and passions to new heights.
              </p>
            </div>
            <img className="element-object-cloud" src={cloud} alt=""/>
          </div>
        </div>
        <div className="frame-12">
          <img className="img-2" src={folder} alt=""/>
          <div className="text-wrapper-10">To-do lists</div>
        </div>
       
        <div className="frame-14">
          <div className="frame-15">
            <div className="overlap-group-2" onClick={()=>{navigate('/todo')}}>
              <div className="frame-16"><div class="text-wrapper-11">My lists</div></div>
              <div className="text-wrapper-12">Open</div>
              <div className="text-wrapper-13">....... Files</div>
              <div className="overlap-2">
                <img className="vector" src={vector1} alt=""/> <img class="object" src={object} alt=""/>
              </div>
             
              <div className="text-wrapper-15">Shared With:</div>
              <div className="frame-17">
                <img className="rectangle-2" src={rectangle5} alt=""/>
                <img className="rectangle-3" src={rectangle6} alt=""/>
                <img className="rectangle-3" src={rectangle7} alt=""/>
                <div className="frame-18"><div class="text-wrapper-16">+9</div></div>
              </div>
            </div>
          </div>
        </div>

      
      </div>
    </div>
    </div>
  )
}

export default Dashboard;






// <!-- <!DOCTYPE html>
// <html>
//   <head>
//     <link rel="stylesheet" href="dashboard.css" />
    
//   </head>
//   <body>
//     <div class="desktop">
//       <div class="div">
//         <div class="overlap">
//           <div class="frame">
//             <div class="frame-2">
//               <img class="img" src="img/frame-4.svg" />
//               <div class="text-wrapper">Settings</div>
//             </div>
//             <div class="frame-2">
//               <img class="img" src="img/frame-4-1.svg" />
//               <div class="text-wrapper">Profile</div>
//             </div>
//           </div>
//           <div class="frame-3">
//             <div class="frame-4">
//               <div class="frame-5">
//                 <img class="home" src="img/home-3.svg" />
//                 <div class="text-wrapper-2">Home</div>
//               </div>
//               <div class="frame-5">
//                 <img class="home" src="img/home-2.svg" />
//                 <div class="text-wrapper-2">Connections</div>
//               </div>
//             </div>
//             <div class="frame-4">
//               <div class="frame-5">
//                 <img class="home" src="img/home.svg" />
//                 <div class="text-wrapper-2">Invites</div>
//               </div>
//               <div class="frame-6">
//                 <img class="home" src="img/home.svg" />
//                 <div class="text-wrapper-3">Requests sent</div>
//                 <div class="group">
//                   <div class="rectangle"></div>
//                   <div class="text-wrapper-4">New</div>
//                 </div>
//               </div>
//             </div>
//             <div class="frame-4">
//               <div class="frame-5">
//                 <div class="frame-wrapper">
//                   <div class="image-wrapper"><img class="image" src="img/image-11.png" /></div>
//                 </div>
//                 <div class="text-wrapper-5">Doubts</div>
//               </div>
//               <div class="frame-7">
//                 <div class="img-wrapper"><img class="image-2" src="img/image-10.png" /></div>
//                 <div class="text-wrapper-6">Messages</div>
//               </div>
//             </div>
//             <div class="group-2">
//               <div class="rectangle"></div>
//               <div class="text-wrapper-4">New</div>
//             </div>
//           </div>
//           <div class="div-wrapper">
//             <div class="frame-8">
//               <div class="frame-9"><div class="text-wrapper-7">Get Started ✨</div></div>
//               <div class="frame-10"><div class="text-wrapper-8">See possible matches</div></div>
//               <img class="element-data-management" src="img/3d-data-management-2.png" />
//             </div>
//           </div>
//         </div>
//         <div class="overlap-group-wrapper">
//           <div class="overlap-group">
//             <div class="frame-11">
//               <img class="grad" src="img/grad-01.png" />
//               <div class="text-wrapper-9">Why SkillSwap?</div>
//               <p class="p">
//                 Discover a community where expertise converges, paving the way for skill exchange and personal growth.
//                 Join us to connect, share knowledge, and forge meaningful collaborations. Explore a platform tailored to
//                 elevate your skills and passions to new heights.
//               </p>
//             </div>
//             <img class="element-object-cloud" src="img/3d-object-cloud-storage-1-1.png" />
//           </div>
//         </div>
//         <div class="frame-12">
//           <img class="img-2" src="img/folder.svg" />
//           <div class="text-wrapper-10">To-do lists</div>
//         </div>
//         <div class="frame-13">
//           <img class="img-2" src="img/time-square.svg" />
//           <div class="text-wrapper-10">Upcoming work</div>
//         </div>
//         <div class="frame-14">
//           <div class="frame-15">
//             <div class="overlap-group-2">
//               <div class="frame-16"><div class="text-wrapper-11">My lists</div></div>
//               <div class="text-wrapper-12">Open</div>
//               <div class="text-wrapper-13">....... Files</div>
//               <div class="overlap-2">
//                 <img class="vector" src="img/vector-1.svg" /> <img class="object" src="img/object.png" />
//               </div>
//               <p class="text-wrapper-14">Last Edit: May 3rd 2023</p>
//               <div class="text-wrapper-15">Shared With:</div>
//               <div class="frame-17">
//                 <img class="rectangle-2" src="img/rectangle-5.png" />
//                 <img class="rectangle-3" src="img/rectangle-6.png" />
//                 <img class="rectangle-3" src="img/rectangle-7.png" />
//                 <div class="frame-18"><div class="text-wrapper-16">+9</div></div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div class="overlap-3">
//           <img class="paper" src="img/paper.png" />
//           <div class="text-wrapper-17">Task</div>
//           <div class="group-wrapper">
//             <div class="rectangle-wrapper"><div class="rectangle-4"></div></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </body>
// </html> -->
