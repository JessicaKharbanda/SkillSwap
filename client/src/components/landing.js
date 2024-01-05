import React from "react"
import './landing.css'
import { useNavigate } from "react-router-dom";
// import skillswapimg from './images/skillswapimg.png'
// import circles from './images/illustration.svg'


function Landing(){
    const navigate = useNavigate();
    const handleRegisterClick = () => {
        navigate("/signup");
    };
    const handleLoginClick = () => {
      console.log("hi");
        navigate("/login");
    };

    return(
      <div class="desktop">
      <div class="div">
        <div class="nav-bar">
          <button class="nav-button"><div class="text-wrapper">Register</div></button>
          <div class="frame">
            <img class="whatsapp-image" src="img/whatsapp-image-2023-10-30-at-6-51-1.png" />
            {/* <div class="nav-items">
              <div class="text-wrapper-2">Home</div>
              <div class="text-wrapper-3">About Us</div>
              <div class="text-wrapper-4">Contact Us</div>
            </div> */}
          </div>
        </div>
        <div class="part">
          <div class="group">
            <div class="heading">
              <div class="text-wrapper-5">What is SkillSwap?</div>
              <div class="introduction">
                <p class="skillswap-is-a">
                  SkillSwap is a collaborative platform connecting individuals worldwide to exchange their unique skills
                  and knowledge. It&#39;s a space where learning meets reciprocity, fostering a vibrant community of
                  mutual growth and support.
                </p>
              </div>
            </div>
          </div>
          <div class="dialog">
            <div class="monster">
              <img class="monster-avatar" src="img/monster-avatar.svg" />
              <div class="message-monster">
                <p class="p">Charming Venusian is looking for a worthy companion to learn backend engineering</p>
              </div>
            </div>
            <div class="man">
              <div class="monster-avatar">
                <div class="overlap-group">
                  <img class="layer" src="img/layer-1-2.png" />
                  <div class="ellipse"></div>
                </div>
              </div>
              <div class="man-message">
                <p class="text-wrapper-6">
                  The young backend developer has already beaten everyone on planet Earth and wants to try himself in
                  the alien championship
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="frame-wrapper">
          <div class="overlap-group-wrapper">
            <div class="overlap-group-2">
              <div class="heading-2">
                <div class="text-wrapper-7">For Whom</div>
                <p class="text-wrapper-8">
                  A variety of people register in SkillSwap : programmers and managers, students and scientists,
                  psychologists and analysts, designers and artists.
                </p>
                <p class="text-wrapper-9">
                  Here you can find like-minded people and make acquaintances, which can later develop into a strong
                  friendship and partnership.
                </p>
              </div>
              <div class="overlap">
                <div class="div-wrapper"><div class="frame-2"></div></div>
                <img class="shrug-rafiki" src="img/shrug-rafiki.png" />
              </div>
            </div>
          </div>
        </div>
        <div class="overlap-2">
          <div class="overlap-wrapper">
            <div class="overlap-3">
              <div class="part-2">
                <div class="text-wrapper-10">How It Works</div>
                <img class="image" src="img/image-15.png" />
                <div class="frame-3">
                  <div class="group-2">
                    <div class="overlap-group-3">
                      <div class="text-wrapper-11">01</div>
                      <div class="text-wrapper-12">Registration</div>
                    </div>
                  </div>
                  <div class="frame-4">
                    <p class="text-wrapper-13">
                      Register yourself, login and setup your profile.Tell us about yourself, your skills and your
                      interests.
                    </p>
                  </div>
                </div>
                <div class="frame-5">
                  <div class="group-3">
                    <div class="overlap-group-4">
                      <div class="text-wrapper-14">02</div>
                      <div class="text-wrapper-15">Explore</div>
                    </div>
                  </div>
                  <div class="frame-6">
                    <p class="text-wrapper-16">
                      Look for the right people. Find one that suits you the most and request a match.
                    </p>
                  </div>
                </div>
                <img class="img" src="img/image-17.png" />
                <img class="image-2" src="img/image-16.png" />
                <div class="frame-7">
                  <div class="group-4">
                    <div class="overlap-group-5">
                      <div class="text-wrapper-17">04</div>
                      <div class="text-wrapper-18">Connect and Learn</div>
                    </div>
                  </div>
                  <div class="frame-8">
                    <p class="text-wrapper-19">
                      Connect with your matches and let this journey of learning and growth begin!
                    </p>
                  </div>
                </div>
              </div>
              <img class="image-3" src="img/image-18.png" />
            </div>
          </div>
          <div class="frame-9">
            <div class="group-5">
              <div class="overlap-group-6">
                <div class="text-wrapper-14">03</div>
                <div class="text-wrapper-20">Best Match!</div>
              </div>
            </div>
            <p class="text-wrapper-21">
              With SkillSwap, you can get acquainted with people that match your skills and interests.
            </p>
          </div>
        </div>
        <div class="overlap-4">
          <div class="part-3">
            <div class="frame-10">
              <div class="overlap-5">
                <img class="image-4" src="img/image-14.png" />
                <div class="group-6">
                  <div class="overlap-group-7">
                    <p class="text-wrapper-22">Real-time communication for seamless collaboration</p>
                    <div class="text-wrapper-23">Chat and Explore</div>
                    <img class="chat-amico" src="img/chat-amico.png" />
                  </div>
                </div>
              </div>
              <div class="text-wrapper-24">OUR SERVICE</div>
              <p class="text-wrapper-25">
                SkillSwap offers a vibrant platform for individuals to exchange, learn, and grow by sharing their
                diverse skills, fostering a community-driven environment focused on mutual development and enrichment.
              </p>
              <p class="text-wrapper-26">SkillSwap: Facilitating Skill Exchange and Growth</p>
              <div class="group-7">
                <div class="overlap-group-7">
                  <img class="checklist-amico" src="img/checklist-amico.png" />
                  <p class="text-wrapper-27">Tailored task management for organised productivity</p>
                  <div class="text-wrapper-28">Customised to-do lists</div>
                </div>
              </div>
              <div class="group-8">
                <div class="overlap-6">
                  <div class="landing-rectangle"></div>
                  <p class="text-wrapper-29">Engaging forum for shared insights and conversations</p>
                  <div class="text-wrapper-30">Discuss forum</div>
                  <img class="discussion-amico" src="img/discussion-amico.png" />
                </div>
              </div>
            </div>
          </div>
          <div class="part-4">
            <div class="heading-wrapper">
              <div class="heading-3">
                <div class="text-wrapper-31">Join SkillSwap!</div>
                <p class="text-wrapper-32">
                  Today is a great day to start adding interesting people to your environment, Step into a world of
                  endless possibilities; embrace new connections, diverse perspectives, and collaborative endeavours to
                  elevate your experiences and aspirations!
                </p>
              </div>
            </div>
            <img class="image-5" src="img/image-12.png" />
            <div class="group-9">
              <div class="overlap-group-8" onClick={handleRegisterClick}><div class="text-wrapper-33">Sign Up</div></div>
            </div>
          </div>
        </div>
        <footer class="footer">
          <div class="frame-11">
            <div class="frame-12">
              <div class="frame-13"></div>
              <div class="frame-14">
                <img class="copyright" src="img/copyright.svg" />
                <p class="text-wrapper-34">2023 SkillSwap All rights reserved</p>
              </div>
              <div class="frame-15">
                <div class="frame-16"><div class="text-wrapper-35">Home</div></div>
                <img class="line" src="img/line-15.svg" />
                <div class="frame-16"><div class="text-wrapper-35">Customer care</div></div>
                <img class="line" src="img/line-15.svg" />
                <div class="frame-16"><div class="text-wrapper-35">Pages</div></div>
              </div>
              <div class="frame-17">
                <img class="img-2" src="img/facebook.svg" />
                <img class="img-2" src="img/twitter.svg" />
                <img class="img-2" src="img/instagram.svg" />
                <img class="img-2" src="img/linkedin.svg" />
              </div>
            </div>
          </div>
        </footer>
        <div class="frame-18">
          <div class="frame-19">
            <div class="hero-section-wrapper">
              <div class="hero-section">
                <div class="frame-20">
                  <div class="title-wrapper">
                    <div class="title">
                      <div class="frame-21">
                        <div class="frame-22">
                          <div class="text-wrapper-36">SKILLSWAP</div>
                          <div class="frame-23"><div class="text-wrapper-37">Share. Learn. Thrive</div></div>
                        </div>
                      </div>
                      <div class="frame-24">
                        <p class="text-wrapper-38">
                          Discover a collaborative platform where skills meet passion, fostering connections that fuel
                          growth and endless opportunities for learning and exchange.
                        </p>
                      </div>
                    </div>
                  </div>
                  <img class="line-2" src="img/line-1.png" />
                </div>
                <div class="home-page-buttons-wrapper">
                  <div class="home-page-buttons">
                    <div class="landing-register" onClick={handleRegisterClick}>
                      <div class="text-wrapper-39">Register</div>
                      <div class="text-wrapper-40">It's free</div>
                    </div>
                    <div class="sign-in" onClick={handleLoginClick}><div class="text-wrapper-41">Sign In</div></div>
                  </div>
                </div>
              </div>
            </div>
            <img class="illustration" src="img/illustration.svg" />
          </div>
        </div>
      </div>
    </div>
      //   <div className="landing-4">
      //   <div class="herosection">
      //     <div class="herobuttons">
      //       <div class="homepagebuttons">
      //         <div class="register" id="registerContainer" onClick={handleRegisterClick}>
      //           <div class="register-child"></div>
      //           <div class="register1 myregister1">Register</div>
      //           <b class="its-free">It's free</b>
      //         </div>
      //         <div class="sign-in" onClick={handleLoginClick} >
      //           <div class="sign-in-child"></div>
      //           <div class="sign-in1">Sign In</div>
      //         </div>
      //       </div>
      //     </div>
      //     <div class="title">
      //       <div class="skillswap">SKILLSWAP</div>
      //       <div class="share-learn-thrive">Share. Learn. Thrive</div>
      //       <div class="lorem-ipsum-dolor">
      //       Connecting knowledge seekers with knowledge sharers for endless learning possibilities.
      //       </div>
      //     </div>
      //     <div class="herosection-child"></div>
      //   </div>
      //   <img class="illustration-icon" alt="" src={circles} />
  
      //   <div class="navbar">
      //     <div class="navholder"></div>
      //     <div class="navbutton" id="navButtonContainer">
      //       <div class="navbutton-child"></div>
      //       <div class="register2" onClick={handleRegisterClick} >Register</div>
      //     </div>
      //     <div class="navitems">
      //       <div class="home">Home</div>
      //       <div class="about-us">About Us</div>
      //       <div class="contact-us">Contact Us</div>
      //     </div>
      //     <img class="whatsapp-image-2023-10-30-at-6-icon" alt="" src={skillswapimg}
      //     />
      //   </div>
      // </div>
    )
}

export default Landing;





       