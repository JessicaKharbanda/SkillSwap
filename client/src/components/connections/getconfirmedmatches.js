import React, { useState, useEffect } from "react";
// import { useLocation } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
import './getconfirmedmatches.css'
import ScrollableChat from "./ScrollableChat";
// import Lottie from "lottie-react";
import io from 'socket.io-client'
import message from "./img/message-more.svg"
import rect from "./img/rectangle-1092-1.svg"
import Navbar from '../navigation/NavigationBar'
import nochatbg2 from "./nochatbg2.png"

// import animationData from "../animations/typing.json";
var socket, selectedChatCompare;
const ENDPOINT = "http://localhost:8000";

function ConfirmedMatches() {
  
  const [confirmedMatches, setConfirmedMatches] = useState([]);
  const [chatId,setchatId]=useState("");
  const [messageContent, setMessageContent] = useState(""); // New state for message input
  const [messages,setMessages]=useState([]);
  const [selectedChat,setSelectedChat]=useState();
  const [socketConnected,setSocketConnected]=useState(false);
  const [pic,setpic]=useState(null);
  // const [typing, setTyping] = useState(false);
  // const [istyping, setIsTyping] = useState(false);
  // const [selectedUserId, setSelectedUserId] = useState(null);
  // const navigate=useNavigate();
const userString = localStorage.getItem("userLoginInfo");
const userLogin = userString ? JSON.parse(userString) : null;
const Token = userLogin && userLogin.token ? userLogin.token : null; 
const loggedinuserId = userLogin && userLogin.user ? userLogin.user._id : null; 
const loggedinusername = userLogin && userLogin.user ? userLogin.user.name : null; 
const user= userLogin && userLogin.user ? userLogin.user : null; 
// const defaultOptions = {
//   loop: true,
//   autoplay: true,
//   animationData: animationData,
//   rendererSettings: {
//     preserveAspectRatio: "xMidYMid slice",
//   },
// };
// console.log(Token); 
useEffect(()=>{
  socket=io(ENDPOINT);
  socket.emit("setup",user);
  socket.on('connected',()=>setSocketConnected(true))
  // socket.on("typing", () => setIsTyping(true));
  // socket.on("stop typing", () => setIsTyping(false));
},[])


  const mymatches = async () => {
    try {
      // Make an HTTP GET request to your server
      const response = await fetch('http://localhost:8000/api/v1/chat-request/getAllAcceptedRequest', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${Token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        // setPendingRequests(data);
        console.log("ishitatattatatatta testingngngngn");
        console.log(data.matches);
        if (data.matches) {
          setConfirmedMatches(data.matches);
        }
        // Handle the data as needed, such as updating state or displaying in the UI
      } else {
        console.error('Failed to fetch pending requests');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };





  const fetchAllMessages = async (chatId) => {
    try {
      // if (socket) { // Check if socket is defined
      const response = await fetch(`http://localhost:8000/api/v1/message/all-message/${chatId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${Token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const messagesData = await response.json();
        // Handle the messages data as needed
        console.log('All Messages:', messagesData);
        setMessages(messagesData); // Set the messages state
        socket.emit('join chat',chatId);
      } else {
        console.error('Failed to fetch all messages');
      }
    }
     catch (error) {
      console.error('An error occurred while fetching all messages:', error);
    }
  };



  useEffect(() => {
    mymatches();
   
    if (chatId) {
      fetchAllMessages(chatId); // Call the fetchAllMessages function
      console.log("selected chta id is" ,chatId);
      // socket.emit("join chat",chatId);
      selectedChatCompare=selectedChat;
    }
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // if (!notification.includes(newMessageReceived)) {
        //   setNotification([newMessageReceived, ...notification]);
        //   setFetchAgain(!fetchAgain);
        // }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });




  const accessChat = async (userId) => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/chat/access-chats', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           userId
           }),
      });
  
      if (response.ok) {
        const chatData = await response.json();
        // Handle the chat data as needed
        console.log('Chat Data:', chatData);
        console.log(chatData._id);
        setchatId(chatData._id);
        setSelectedChat(chatData);
        console.log("voillala");
        console.log(selectedChat);
        // navigate("/singlechat");
      } else {
        console.error('Failed to access chat');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };


  const handleChatClick = (senderId, receiverId,chatpic) => {
    // Check if the logged-in user ID matches the sender or receiver ID
    
    if (loggedinuserId === senderId) {
      
        accessChat(receiverId);
        setpic(chatpic)
    } else if (loggedinuserId === receiverId) {
    
      accessChat(senderId);
      setpic(chatpic);
    } else {
     console.error('Logged-in user is neither the sender nor the receiver');
    }
    
  };



  const handleSendMessage = async () => {
    
    setMessageContent("");
    socket.emit("stop typing", selectedChat._id);
    try {
      const response = await fetch('http://localhost:8000/api/v1/message/send-message', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: messageContent,
          chatId: chatId,
        }),
      });
      
      if (response.ok) {
        const sendData = await response.json();
        // Handle the chat data as needed
        console.log('Chat send Data:', sendData);
        // Handle the success of sending a message, e.g., clear the input field
        socket.emit('new message',sendData);
        
        setMessages([...messages,sendData]);
        // setMessages([...messages,messageContent]) //not sure
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('An error occurred while sending the message:', error);
    }
  };




  return (
    <div>
           <Navbar/>
      <div className="hey">
     
        <div class="chat-screen">
  
   <div class="chat-connections">
       <h1 class="connection-heading-chat">My Connections</h1>
   
       {confirmedMatches.map(match => (
             <div class="chat-info" key={match._id}>
                   <img src={match.receiver.userProfile.pic}/>
                   <div>
                       <p class="user-name">{loggedinusername === match.sender.name ? match.receiver.name : match.sender.name}</p>
                       {/* <p class="user-username">How are you today?</p> */}
                   </div>
               <div class="chat-icon" onClick={() => handleChatClick(match.sender._id, match.receiver._id,match.receiver.userProfile.pic)}>
                   <img src={message} alt=""/>
               </div>
           </div>
         ))}
   
   </div>
  
   <div class="chat-screen-area">
   {pic === null && (
        <div className="default-image-container">
            {/* Add your default image source or content here */}
            <img className="nochat" src={nochatbg2} alt="Default" />
        </div>
    )}
       <div class="chat-heading">
       {pic && <img className="edit-pic" src={pic} alt="" />}
           {/* <p>Stuart</p> */}
       </div>
       <div class="chat-area">
       <ScrollableChat messages={messages}/>
       </div>
       {pic &&    <div class="chat-input-area">
           <input type="text"
             placeholder="Type your message..."
             value={messageContent}
             onChange={(e) => {
               setMessageContent(e.target.value);
               // typingHandler(e); // Call the typingHandler function when the input field changes
             }}/>
           <button onClick={handleSendMessage}>Send</button>
       </div>}
    
   </div>
   </div>
      </div>
   
    </div>

  );
}

export default ConfirmedMatches;

