import Question from "./Question";
import Option from "./Option";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Page(props) {
  let intervalId;
  let [score, setScore] = useState(0);
  let [currentIndex, setCurrentIndex] = useState(0);
  let [widthe, setWidthe] = useState(100);
  const history = useHistory();

  let [userData, setUserData] = useState([]);
  let userDataCopy;

  function checkAns(index) {
    clearInterval(intervalId);
    userDataCopy = JSON.parse(JSON.stringify(userData));

    userDataCopy.push([
      questionObj[currentIndex].question,
      questionObj[currentIndex].correctOption,
      index,
      questionObj[currentIndex].answers[
        questionObj[currentIndex].correctOption
      ],
      questionObj[currentIndex].answers[index],
    ]);

    setUserData(userDataCopy);
    // console.log(userData)

    if (currentIndex < questionObj.length - 1) {
      setTimeout(() => setWidthe(100), 500);
      setTimeout(() => setCurrentIndex(currentIndex + 1), 500);
      if (questionObj[currentIndex].correctOption === index) {
        setScore(score + 1);
        return "green";
      } else {
        return "red";
      }
    } else {
      setTimeout(() => setWidthe(100), 500);
      setTimeout(
        () => history.push({ pathname: "/result", state: { userDataCopy } }),
        500
      );
      if (questionObj[currentIndex].correctOption === index) {
        setScore(score + 1);
        return "green";
      } else {
        return "red";
      }
    }
  }

  let questionObj = [
    {
      question: "Who is the Prime Minister of 1?",
      answers: [
        "Donald Trump",
        "Narendra Modi",
        "Barack Obama",
        "Mukesh ambani",
      ],
      correctOption: 1,
    },

    {
      question: "Who is the Prime Minister of 2?",
      answers: [
        "Donald Trump2",
        "Narendra Modi2",
        "Barack Obama2",
        "Mukesh ambani2",
      ],
      correctOption: 1,
    },
    {
      question: "Who is the Prime Minister of 3?",
      answers: [
        "Donald Trump3",
        "Narendra Modi3",
        "Barack Obama3",
        "Mukesh ambani3",
      ],
      correctOption: 1,
    },
    {
      question: "Who is the Prime Minister of 4?",
      answers: [
        "Donald Trump4",
        "Narendra Modi4",
        "Barack Obama4",
        "Mukesh ambani4",
      ],
      correctOption: 1,
    },
    {
      question: "Who is the Prime Minister of 5?",
      answers: [
        "Donald Trump5",
        "Narendra Modi5",
        "Barack Obama5",
        "Mukesh ambani5",
      ],
      correctOption: 1,
    },
  ];

  useEffect(
    () => {
      if (widthe<=0) {
        // eslint-disable-next-line
        userDataCopy = JSON.parse(JSON.stringify(userData));

        userDataCopy.push([
          questionObj[currentIndex].question,
          questionObj[currentIndex].correctOption,
          null,
          questionObj[currentIndex].answers[
            questionObj[currentIndex].correctOption
          ],
          "not answered",
        ]);

        setUserData(userDataCopy);


        if (currentIndex === questionObj.length - 1) {
          setTimeout(
            () =>
              history.push({ pathname: "/result", state: { userDataCopy } }),
            2000
          );
        } else {
          setCurrentIndex(currentIndex + 1);
         

          setWidthe(100);
          return;
        }
      }

// eslint-disable-next-line
      intervalId = setInterval(() => setWidthe(widthe - 0.1), 20);
  
      return () => clearInterval(intervalId);
    },

    // eslint-disable-next-line
    [widthe]
  );

  return (
    currentIndex >= 0 && (
      <>
        <div className="container">
          <div className="timer" style={{ width: widthe + "%",backgroundColor:widthe>70?"green":widthe>30?"orange":"red" }}></div>
          
          <div className="score">Score : {score}</div>

          <Question value={questionObj[currentIndex].question} />

          <div className="options">
            {questionObj[currentIndex].answers.map((choice, index) => {
              return (
                <Option
                  value={choice}
                  index={index}
                  clickHandler={checkAns}
                  key={currentIndex + "" + index}
                />
              );
            })}
          </div>
        </div>
      </>
    )
  );
}

export default Page;
