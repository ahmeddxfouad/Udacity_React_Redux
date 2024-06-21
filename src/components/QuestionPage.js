import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Answers from "./Answers";
import PageNotFound from "./PageNotFound";

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


    return (
            <div className="center">
                { props.question === null ? <PageNotFound/> :
                <div className="question-info">
                    <h2>Poll by {props.question.author}</h2>
                    <img src={props.avatar} alt={`Avatar of ${props.question.author}`} className="poll-avatar"/>
                    <h2>Would You Rather</h2>
                    <Answers id={props.id}/>
                </div> }
            </div>
    );
};
const mapStateToProps = ({authedUser, questions, users }, props) => {
  const { id } = props.router.params;
  const question = questions[id] ? questions[id] : null ;
  const avatar = question ? users[question.author].avatarURL : null;
  return {
    id,
    question: question,
    authedUser,
    avatar,
  };
};

export default withRouter(connect(mapStateToProps)(QuestionPage));
