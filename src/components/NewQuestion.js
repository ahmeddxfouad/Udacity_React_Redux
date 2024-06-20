import { useState } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { useNavigate } from "react-router-dom";
import authedUser from "../reducers/authedUser";

const NewQuestion = (props) => {
  const navigate = useNavigate();
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");

  const handleFirstOption = (e) => {
    const text = e.target.value;

    setFirstOption(text);
  };

  const handleSecondOption = (e) => {
    const text = e.target.value;

    setSecondOption(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const question = { optionOneText: firstOption,optionTwoText: secondOption };

    props.dispatch(handleAddQuestion(question, props.authedUser)).then(() => {
      setFirstOption("");
      setSecondOption("");
      navigate("/home")
    });

  };

  return (
    <div>
      <h3 className="center">Would You Rather</h3>
      <h4 className="center">Create Your Own Poll</h4>
      <form className="new-question" onSubmit={handleSubmit}>
        <h5 className="center">First Option</h5>
        <input
          placeholder="Option One"
          value={firstOption}
          onChange={handleFirstOption}
        />
        <h5 className="center">Second Option</h5>
        <input
          placeholder="Option Two"
          value={secondOption}
          onChange={handleSecondOption}
        />
        <button className="btn" type="submit" disabled={firstOption === "" || secondOption === ""}>
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  const currentUser = users[authedUser];

  return {
    authedUser,
  };
};


export default connect(mapStateToProps)(NewQuestion);
