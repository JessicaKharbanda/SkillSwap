import React ,{useState,useEffect}from "react";
import { useNavigate } from "react-router-dom";
import './NavigationBar.css';
import skillswapimg from './skillswapimg.png'
import { useLocation } from 'react-router-dom';


function Navbar(){
    const [isOpen, setIsopen] = useState(false);
    const [pendingRequests, setPendingRequests] = useState([]);
    const navigate=useNavigate();
    // const location=useLocation();
    // const Token=location.state.props;
    const userString = localStorage.getItem("userLoginInfo");
const userLogin = userString ? JSON.parse(userString) : null;
const Token = userLogin && userLogin.token ? userLogin.token : null; 

    const handleMainClick = () => {
      navigate("/");
  };
  const handledashboard = () => {
    navigate("/dashboard");
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
        setPendingRequests(data);
        console.log('Pending Requests:', data);
        // Handle the data as needed, such as updating state or displaying in the UI
      } else {
        console.error('Failed to fetch pending requests');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  const acceptRequest = async (requestId) => {
    try {
      // Make an HTTP PATCH request to your server to accept the request
      const response = await fetch(`http://localhost:8000/api/v1/chat-request/acceptRequest/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${Token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // If the request is successful, update the state to remove the accepted request
        setPendingRequests((prevRequests) => prevRequests.filter((request) => request._id !== requestId));
        console.log('Request accepted successfully');
      } else {
        console.error('Failed to accept request');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const rejectRequest = async (requestId) => {
    try {
      // Make an HTTP PATCH request to your server to accept the request
      const response = await fetch(`http://localhost:8000/api/v1/chat-request/rejectRequest/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${Token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // If the request is successful, update the state to remove the accepted request
        setPendingRequests((prevRequests) => prevRequests.filter((request) => request._id !== requestId));
        console.log('Request rejected successfully');
      } else {
        console.error('Failed to reject request');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  // const logout = async () => {
  //   try {
  //     // Make an HTTP POST request to your server to log out
  //     const response = await fetch('http://localhost:8000/api/v1/auth/logout', {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': `Bearer ${Token}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (response.ok) {
  //       // Clear local storage item
  //       localStorage.removeItem('userLoginInfo');
        
  //       // Navigate to the home page or login page
  //       navigate("/");
  //     } else {
  //       console.error('Failed to log out');
  //     }
  //   } catch (error) {
  //     console.error('An error occurred:', error);
  //   }
  // };
  const logout = () => {
    try {
      // Clear local storage item
      localStorage.removeItem('userLoginInfo');
      
      // Navigate to the home page or login page
      navigate("/");
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };


    const ToggleSidebar = () => {
        isOpen === true ? setIsopen(false) : setIsopen(true);
    }
    useEffect(() => {
        getrequests();
      }, []);
  
    return (
      <div>

      <nav class="navbar-main">
      <div class="navbar-container container-main">
          
          
          <ul class="menu-items">
            <div className="my-home-dash">
            <li className="my-home" onClick={handleMainClick}><a>Home</a></li>
             
            
             <li onClick={handledashboard} className="dashdash"><a>Dashboard</a></li>
            </div>
             
            <li><a href="#"><button onClick={logout} className="my-logout-dash"><span class="text">Logout</span></button></a></li>
            <li>        
              <div className="navbutton1 btn btn-primary" onClick={ToggleSidebar} >
                <i className="fa fa-bars"></i>
              </div>
           </li>
          </ul>
          <h1 class="logo" onClick={handleMainClick}><img className="skill-swap-logo" src={skillswapimg} alt=""/></h1>
          
      </div>
  </nav>

  <div className={`sidebar ${isOpen === true ? 'active' : ''}`}>
                        <div className="sd-header">
                            <h4 className="mb-0">Pending Requests</h4>
                            <div className="btn btn-primary" onClick={ToggleSidebar}><i className="fa fa-times"></i></div>
                        </div>
                        <div className="sd-body">
                            <ul>
                            {pendingRequests.map(request => (
                                <li key={request._id}>
                                <div className="sd-link">
                                    {/* <div class="invitation"> */}
                                    <div className="myflexclass">
                                            <div class="unsplashc-gmwfhbdzk-parent">
                                            <img
                                                class="unsplashc-gmwfhbdzk-icon"
                                                alt=""
                                                src={request.sender.userProfile.pic}
                                            />

                                            <div class="roger-bailey-parent">
                                                <div class="myroger-bailey">{request.sender.name}</div>
                                                {/* <div class="web-developer">{request.sender.email}</div> */}
                                            </div>
                                            </div>
                                            <div class="frame-parent">
                                            <div class="ignore-wrapper" onClick={()=>rejectRequest(request._id)}>
                                                <div class="roger-bailey">Ignore</div>
                                            </div>
                                            <div class="accept-wrapper" onClick={()=>acceptRequest(request._id)}>
                                                <div class="roger-bailey">Accept</div>
                                            </div>
                                            </div>
                                        </div>
                                {/* </div> */}
                                </div>
                            </li>
                               
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className={`sidebar-overlay ${isOpen === true ? 'active' : ''}`} onClick={ToggleSidebar}></div>
      
  
      </div>
      //   <div class="navbar1">
      //   <div class="navholder1"></div>

      //     <div className="navbutton1 btn btn-primary" onClick={ToggleSidebar} >
      //           <i className="fa fa-bars"></i>
        
      //   </div>
      //   <div class="navitems1">
      //     {/* <div className="cm" onClick={()=>{navigate('/confirmedmatches')}}>CM</div>
      //     <div className="todo" onClick={()=>{navigate('/todo')}}>TODO</div>
      //     <div className="QA">Q&A</div> */}
      //     <div class="home1">Home</div>
      //     <div className="dashboard-link">Dashboard</div>
      //     {/* <div class="about-us1">About Us</div>
      //     <div class="contact-us1">Contact Us</div> */}
      //     {/* <div class="contact-us2" onClick={handlematch}>Match Me</div>
      //     <div class="contact-us3" onClick={getrequests}>P</div> */}
      //     <button className="logout" onClick={logout}>Logout</button>
          
      //   </div>
      //   <div onClick={handleMainClick}>
          
      //       <img className="whatsapp-image-2023-10-30-at-6-icon" alt="" src={skillswapimg}/>
           
      //   </div>

      //   <div className={`sidebar ${isOpen === true ? 'active' : ''}`}>
      //                   <div className="sd-header">
      //                       <h4 className="mb-0">Pending Requests</h4>
      //                       <div className="btn btn-primary" onClick={ToggleSidebar}><i className="fa fa-times"></i></div>
      //                   </div>
      //                   <div className="sd-body">
      //                       <ul>
      //                       {pendingRequests.map(request => (
      //                           <li key={request._id}>
      //                           <div className="sd-link">
      //                               {/* <div class="invitation"> */}
      //                               <div className="myflexclass">
      //                                       <div class="unsplashc-gmwfhbdzk-parent">
      //                                       {/* <img
      //                                           class="unsplashc-gmwfhbdzk-icon"
      //                                           alt=""
      //                                           src="./public/unsplashc-gmwfhbdzk@2x.png"
      //                                       /> */}

      //                                       <div class="roger-bailey-parent">
      //                                           <div class="myroger-bailey">{request.sender.name}</div>
      //                                           <div class="web-developer">Web Developer</div>
      //                                       </div>
      //                                       </div>
      //                                       <div class="frame-parent">
      //                                       <div class="ignore-wrapper" onClick={()=>rejectRequest(request._id)}>
      //                                           <div class="roger-bailey">Ignore</div>
      //                                       </div>
      //                                       <div class="accept-wrapper" onClick={()=>acceptRequest(request._id)}>
      //                                           <div class="roger-bailey">Accept</div>
      //                                       </div>
      //                                       </div>
      //                                   </div>
      //                           {/* </div> */}
      //                           </div>
      //                       </li>
                               
      //                           ))}
      //                       </ul>
      //                   </div>
      //               </div>
      //               <div className={`sidebar-overlay ${isOpen === true ? 'active' : ''}`} onClick={ToggleSidebar}></div>
      // </div>
    )
}
export default Navbar;