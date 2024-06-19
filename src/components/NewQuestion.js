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
      <h3 className="center">Compose new Question</h3>
      <form className="new-question" onSubmit={handleSubmit}>
        <textarea
          placeholder="What's happening?"
          value={text}
          onChange={handleChange}
          className="textarea"
          maxLength={280}
        />
        {questionLeft <= 100 && <div className="question-length">{questionLeft}</div>}
        <button className="btn" type="submit" disabled={text === ""}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default connect()(NewQuestion);
