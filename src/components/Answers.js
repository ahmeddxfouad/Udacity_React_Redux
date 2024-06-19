import { connect } from "react-redux";
import { formatQuestion } from "../utils/_DATA";
import { handleSaveQuestionAnswer } from "../actions/questions";
import { useNavigate, Link } from "react-router-dom";
import { formatDate } from "../utils/helpers";
import questions from "../reducers/questions";

const Answers = (props) => {
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
        parent,
        optionOne,
        optionTwo
    } = props.question;

    return (
        <div className="container" style={{display: "flex"}}>
            <div>
                <span className="question">{optionOne.text}</span>
                <button
                    className="btn replying-to"
                    onClick={(e) => toParent(e, parent.id)}
                >
                    Click
                </button>
            </div>
            <div>
                <span className="question">{optionTwo.text}</span>
                <button
                    className="btn replying-to"
                    onClick={(e) => toParent(e, parent.id)}
                >
                    Click
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = ({authedUser, users, questions}, {id}) => {
    const question = questions[id];
    // const parentQuestion = question ? questions[question.replyingTo] : null;

    return {
        authedUser,
        question: question
    };
};

export default connect(mapStateToProps)(Answers);
