import { useState } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { useNavigate } from "react-router-dom";

const NewQuestion = ({ dispatch, id }) => {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const handleChange = (e) => {
    const text = e.target.value;

    setText(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(handleAddQuestion(text, id));

    setText("");

    if (!id) {
      navigate("/");
    }
  };

  const questionLeft = 280 - text.length;

  return (
    <div>
      <h3 className="center">Would You Rather</h3>
      <h4 className="center">Create Your Own Poll</h4>
      <form className="new-question" onSubmit={handleSubmit}>
        <h5 className="center">First Option</h5>
        <input
          placeholder="Option One"
          value={text}
          onChange={handleChange}
        />
        <h5 className="center">Second Option</h5>
        <input
          placeholder="Option One"
          value={text}
          onChange={handleChange}
        />
        <button className="btn" type="submit" disabled={text === ""}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default connect()(NewQuestion);
