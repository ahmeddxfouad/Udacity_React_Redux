import { connect } from "react-redux";
import { handleSaveQuestionAnswer } from "../actions/questions";
import { useNavigate, Link } from "react-router-dom";
import { formatDate } from "../utils/helpers";

const Question = (props) => {
  const navigate = useNavigate();

  const handleLike = (e) => {
    e.preventDefault();

    const { dispatch, question, authedUser } = props;

    dispatch(
      handleSaveQuestionAnswer({
        id: question.id,
        hasLiked: question.hasLiked,
        authedUser,
      })
    );
  };

  const toParent = (e, id) => {
    e.preventDefault();

    navigate(`/question/${id}`);
  };

  if (props.question === null) {
    return <p>This Question doesn't exist</p>;
  }

  const {
    author,
    timestamp,
    id,
  } = props.question;

  return (
    <Link to={`/question/${id}`} className="question">
      <div className="question-info">
        <div>
          <span>{author}</span>
          <div>{formatDate(timestamp)}</div>
          <hr/>
          <button
              className="btn replying-to"
              onClick={(e) => toParent(e, id)}
          >
            Show
          </button>
        </div>
      </div>
    </Link>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  const question = questions[id];

  return {
    authedUser,
    question: question,
  };
};

export default connect(mapStateToProps)(Question);
