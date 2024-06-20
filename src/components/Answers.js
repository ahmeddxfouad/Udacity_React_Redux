import { connect } from "react-redux";
import { handleSaveQuestionAnswer } from "../actions/questions";
import { useNavigate, Link } from "react-router-dom";
import { formatDate } from "../utils/helpers";
import { useEffect } from "react";

const Answers = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!props.authedUser) {
            navigate("/login");
        }
    }, [props.authedUser, navigate]);

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

    const handleVoteOptionOne = (e, id) => {
        e.preventDefault();

        props.dispatch(handleSaveQuestionAnswer({id,authedUser: props.authedUser, hasLiked: "OptionOne" })).then(() => {
            navigate(`/question/${id}`);
        });

    };

    const handleVoteOptionTwo = (e, id) => {
        e.preventDefault();

        props.dispatch(handleSaveQuestionAnswer({id,authedUser: props.authedUser, hasLiked: "OptionTwo" })).then(() => {
            navigate(`/question/${id}`);
        });

    };

    if (!props.question) {
        return <p>404: This Question doesn't exist</p>;
    }

    const {
        author,
        timestamp,
        id,
        optionOne,
        optionTwo,
        hasLiked,
    } = props.question;

    const totalVotes = optionOne.votes.length + optionTwo.votes.length;
    const optionOneVotes = optionOne.votes.length;
    const optionTwoVotes = optionTwo.votes.length;
    const optionOnePercentage = ((optionOneVotes / totalVotes) * 100).toFixed(2);
    const optionTwoPercentage = ((optionTwoVotes / totalVotes) * 100).toFixed(2);

    return (
        <div className="container" style={{display: "flex"}}>
            <div>
                <div className={`question ${props.authedUser.answers[id] === "optionOne" ? "selected" : ""}`}>
                    <span>{optionOne.text}</span>
                    {props.hasLiked ?
                        <div className="question">
                    <div>Results: {optionOneVotes} out of {totalVotes} votes with {optionOnePercentage}%</div>
                    </div> :
                    <button className="btn replying-to" onClick={(e) => handleVoteOptionOne(e, id)}>Click</button>
                    }
                </div>
                <div className={`question ${props.authedUser.answers[id] === "optionTwo" ? "selected" : ""}`}>
                    <span>{optionTwo.text}</span>
                    {props.hasLiked ?
                        <div className="question">
                            <div>Results: {optionTwoVotes} out of {totalVotes} votes with {optionTwoPercentage}%</div>
                        </div> :
                        <button className="btn replying-to" onClick={(e) => handleVoteOptionTwo(e, id)}>Click</button>}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
    const question = questions[id];
    const author = question ? users[question.author] : null;
    const auth = users[authedUser];
    return {
        authedUser: auth,
        question: question ? {
            ...question,
            author,
            hasLiked: question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)
        } : null,
        hasLiked: question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)
    };
};

export default connect(mapStateToProps)(Answers);
