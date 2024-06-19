import { connect } from "react-redux";
import Question from "./Question";
import NewQuestion from "./NewQuestion";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import authedUser from "../reducers/authedUser";
import Answers from "./Answers";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const QuestionPage = (props) => {

    const {
        author,
        text,
        timestamp,
        hasLiked,
        likes,
        replies,
        id,
        parent,
    } = props.question;

  return (
    <div className="center">
        <div className="question-info">
            <h2>Poll by {author}</h2>
            <img src={props.avatar} alt={`Avatar of ${author}`} className="poll-avatar"/>
            <h2>Would You Rather</h2>
            <Answers id={props.id}/>
        </div>
    </div>
  );
};

const mapStateToProps = ({authedUser, questions, users }, props) => {
  const { id } = props.router.params;
  const question = questions[id];
  const avatar = users[question.author].avatarURL;
    console.log('questions: ',questions)
    console.log('question: ',question)
  return {
    id,
    question: question,
    authedUser,
      avatar,
  };
};

export default withRouter(connect(mapStateToProps)(QuestionPage));
