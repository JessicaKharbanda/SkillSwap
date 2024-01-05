import React, { useState ,useEffect} from "react";
import "./q&a.css"; // Import your CSS file
import Navbar from '../navigation/NavigationBar'
import QuestionPic from './questionpic.png';


function QuesAns() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [qaData, setQaData] = useState([]);
  const [answerContentMap, setAnswerContentMap] = useState({});
  const [activeQuestion, setActiveQuestion] = useState(null);
  const userString = localStorage.getItem("userLoginInfo");
 const userLogin = userString ? JSON.parse(userString) : null;
 const Token = userLogin && userLogin.token ? userLogin.token : null; 
 const userId = userLogin && userLogin.user ? userLogin.user._id : null;  //logged in user ki Id

  const handlePostQuestion = async (e) => {
    
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await fetch("http://localhost:8000/api/v1/Q&A/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`, // Replace with your actual access token
        },
        body: JSON.stringify({
          userId,
          title,
          content,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Question posted successfully:", data);
        // Optionally, you can reset the input fields after successful posting
        setTitle("");
        setContent("");
      } else {
        console.error("Failed to post the question");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };


  const getAllQuestionsAndAnswers = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/Q&A/questions", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Token}`, // Replace with your actual access token
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.questions);
        setQaData(data.questions);
      } else {
        console.error("Failed to fetch questions and answers");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    getAllQuestionsAndAnswers();
  }, [qaData]); // Empty dependency array means this effect runs once after the initial render




  const handlePostAnswer = async (questionId) => {
    console.log(questionId);
    console.log(answerContentMap[questionId]);
    try {
      const response = await fetch(`http://localhost:8000/api/v1/Q&A/questions/${questionId}/answers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`, // Replace with your actual access token
        },
        body: JSON.stringify({
          user:userId,
          content: answerContentMap[questionId],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Answer posted successfully:", data);
        // Optionally, you can reset the answer input field after successful posting
        // setAnswerContent("");
        setAnswerContentMap((prevMap) => ({ ...prevMap, [questionId]: "" }));
        // Fetch updated questions and answers
        // getAllQuestionsAndAnswers();
      } else {
        console.error("Failed to post the answer");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const toggleActiveQuestion = (questionId) => {
    setActiveQuestion((prevQuestion) => (prevQuestion === questionId ? null : questionId));
  };
  
  return (
    
<div className="question-answer-background">
<Navbar/>
   <div class="purple-container">
      <div className="purple-text-container">
      <p class="discuss-text">Discuss</p>
        <p class="anything-text">Ask anything</p>
        <p class="ques-text">Have any questions? The community is here to assist you.</p>
       
        <input
        className="title-input input-1"
          type="text"
          placeholder="Enter title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
       
        <input
          className="title-input"
          id="content"
          type="text"
          placeholder="Enter description"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button class="post-btn post-btn-container" onClick={handlePostQuestion}>Post</button>
      </div>
      <img src={QuestionPic}/>
       
    </div>

    {qaData.map((qaItem) => (
              <div class="container-2" key={qaItem._id}>
                <div className='inner-container-qa'>
                <p class="email-text">{qaItem.content}  <span className="posted_by">...posted by {qaItem.user.name}</span></p>
              <button className="viewresponse_btn"onClick={() => toggleActiveQuestion(qaItem._id)}>
                  {activeQuestion === qaItem._id ? "hide responses" : "view responses"}
                </button>
                </div>
              {activeQuestion === qaItem._id && (
            <div class="answers">
              {qaItem.answers.map((answer) => (
                <div class="answer" key={answer._id}>
                  <p class="answer-heading">{answer.user.name}</p>
                  <p class="answer-text">{answer.content}</p>
                </div>
              ))}
            </div>
          )}
              
              <div class="your-answer">
                  
                  <input type="text" placeholder="Type your answer"
                      className="ans-input"
                      id={`answer-${qaItem._id}`}
                      value={answerContentMap[qaItem._id]}
                      onChange={(e) =>
                        setAnswerContentMap((prevMap) => ({
                          ...prevMap,
                          [qaItem._id]: e.target.value,
                        }))
                      }
                    />
                  <button class="post-btn post-btn-2" onClick={() => handlePostAnswer(qaItem._id)}>Post</button>
              </div>
          </div>
    ))}

  </div>
  )
}
export default QuesAns;
// export default QuesAns;

    // <div class="container-2">
    //     <p class="email-text">How do I change my account email?</p>
    //     <div class="answers">
    //         <div class="answer">
    //             <p class="answer-heading">@jessica_kharbanda</p>
    //             <p class="answer-text">You can log in to your account and change it from your Profile > Edit Profile. Then go to the general tab to change your email.</p>
    //         </div>
    //     </div>
    //     <div class="your-answer">
    //         <input type="text" placeholder="Type your answer"class="ans-input">
    //         <button class="post-btn post-btn-2">Post</button>
    //     </div>
    // </div>