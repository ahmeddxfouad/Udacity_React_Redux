import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import {handleInitialData, handlePreLogin} from "../actions/shared";
import Dashboard from "./Dashboard";
import LoadingBar from "react-redux-loading-bar";
import NewQuestion from "./NewQuestion";
import QuestionPage from "./QuestionPage";
import Nav from "./Nav";
import {Routes, Route, useNavigate} from "react-router-dom";
import LeaderBoard from "./LeaderBoard";
import Login from "./Login";
import authedUser from "../reducers/authedUser";

const App = (props) => {

    // useEffect(() => {
    //     props.dispatch(handleInitialData());
    // }, []);
    const navigate = useNavigate();

    useEffect(() => {
        props.dispatch(handlePreLogin())
    }, []);

    useEffect(() => {
        console.log('authUSer: ',props.authedUser)
        if (props.authedUser === null ) {
            console.log("I'm inside navigate to login")
            navigate("/login");
        }
    }, [props.authedUser, navigate]);

    return (
        <Fragment>
            {props.authedUser ?
                <div>
                    <LoadingBar />
            {props.loading === true ? null : (<div>
            {props.authedUser && <Nav/>}
            <div className="container">
                    <Routes>
                        <Route path="/home" exact element={<Dashboard />} />
                        <Route path="/question/:id" element={<QuestionPage />} />
                        <Route path="/new" element={<NewQuestion />} />
                        <Route path="/leaderboard" element={<LeaderBoard />} />
                    </Routes>
            </div></div>
            )}</div> : <Login/>}
        </Fragment>
    );
};

const mapStateToProps = ({ authedUser }) => ({
    loading: authedUser === null,
    authedUser: authedUser
});

export default connect(mapStateToProps)(App);
