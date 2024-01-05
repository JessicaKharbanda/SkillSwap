import React, { useState ,useEffect} from "react";
import "./quesans.css"; // Import your CSS file


function QuesAns() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [qaData, setQaData] = useState([]);
  const [answerContentMap, setAnswerContentMap] = useState({});
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
  
  return (
    
<div>
    <div className="question-form-container">
      <form className="question-form" onSubmit={handlePostQuestion}>
        <label className="qlabel" htmlFor="title">Title:</label>
        <input
        className="qinput"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="qlabel" htmlFor="content">Content:</label>
        <input
        className="qinput"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="qbutton" type="submit">Post</button>
      </form>
    </div>
    <div className="qanda">
        <h1>ALL QUESTIONS AND ANSWERS</h1>

        

        {qaData.map((qaItem) => (
          <div key={qaItem._id} className="qabox">
            <h3>"question by"{qaItem.user.name}</h3>
            <h3>{qaItem.title}</h3>
            <p>{qaItem.content}</p>
            <label className="qlabel" htmlFor={`answer-${qaItem._id}`}>
              Answer:
            </label>
            <input
              className="qansinput"
              id={`answer-${qaItem._id}`}
              value={answerContentMap[qaItem._id]}
              onChange={(e) =>
                setAnswerContentMap((prevMap) => ({
                  ...prevMap,
                  [qaItem._id]: e.target.value,
                }))
              }
            />
            <button
              className="qbutton"
              onClick={() => handlePostAnswer(qaItem._id)}
            >
              Post Answer
            </button>
           

            {/* Display answers */}
      <div>
        <strong>Existing Answers:</strong>
        {qaItem.answers.map((answer) => (
          <div key={answer._id}>
           <h1> {answer.content} "by" {answer.user.name}</h1>
           {/* <h1> {answer.user.name}</h1> */}
            </div>
          // <p>{answer.user.name}</p>
        ))}
      </div>
           
          </div>
        ))}





      
        

    </div> 
    </div>
   
  );
}

export default QuesAns;
