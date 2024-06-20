import { connect } from "react-redux";
import Question from "./Question";

const Dashboard = (props) => {
  return (
      <div>
          <div className="dashcontainer">
              <h3 className="center">New Questions</h3>
              <hr style={{color: "green"}}/>
              <ul className="dashboard-list">
                  {props.newQuestions.map((id) => (
                      <li key={id} className="dashboard-item">
                          <Question id={id}/>
                      </li>
                  ))}
              </ul>
          </div>
          <div className="dashcontainer">
              <h3 className="center">Done</h3>
              <hr style={{color: "green"}}/>
              <ul className="dashboard-list">
                  {props.Done.map((id) => (
                      <li key={id} className="dashboard-item">
                          <Question id={id}/>
                      </li>
                  ))}
              </ul>
          </div>
      </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => {
    const currentUser = users[authedUser];

    const answeredQuestions = Object.keys(currentUser.answers);
    const newQuestions = Object.keys(questions).filter(qid => !answeredQuestions.includes(qid));
    const doneQuestions = Object.keys(questions).filter(qid => answeredQuestions.includes(qid));

    return {
        newQuestions: newQuestions.sort((a, b) => questions[b].timestamp - questions[a].timestamp),
        Done: doneQuestions.sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    };
};


export default connect(mapStateToProps)(Dashboard);
