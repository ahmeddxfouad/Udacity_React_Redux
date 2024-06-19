import { connect } from "react-redux";
import { formatQuestion } from "../utils/_DATA";
import {
  TiArrowBackOutline,
  TiHeartOutline,
  TiHeartFullOutline,
} from "react-icons/ti";
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
    text,
    timestamp,
    hasLiked,
    likes,
    replies,
    id,
    parent,
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
              onClick={(e) => toParent(e, parent.id)}
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
  const parentQuestion = question ? questions[question.replyingTo] : null;

  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser, parentQuestion)
      : null,
  };
};

export default connect(mapStateToProps)(Question);
