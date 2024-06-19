import { connect } from "react-redux";
import Question from "./Question";
import NewQuestion from "./NewQuestion";
import { useLocation, useNavigate, useParams } from "react-router-dom";

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
    <div>
      <Question id={props.id} />
      <NewQuestion id={props.id} />
      {props.replies.length !== 0 && <h3 className="center">Replies</h3>}
      <ul>
        {props.replies.map((replyId) => (
          <li key={replyId}>
            <Question id={replyId} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }, props) => {
  const { id } = props.router.params;

  return {
    id,
    replies: !questions[id]
      ? []
      : questions[id].replies.sort(
          (a, b) => questions[b].timestamp - questions[a].timestamp
        ),
  };
};

export default withRouter(connect(mapStateToProps)(QuestionPage));
