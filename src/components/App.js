import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handlePreLogin } from "../actions/shared";
import LoadingBar from "react-redux-loading-bar";
import Login from "./Login";
import MainPage from "./MainPage";

const App = (props) => {

    useEffect(() => {
        props.dispatch(handlePreLogin())
    }, []);

    return (
        <Fragment>
            <LoadingBar />
            {props.loading === true ? null : (
                props.authedUser ? <MainPage/> : <Login/>
            )}
        </Fragment>
    );
};

const mapStateToProps = ({ authedUser }) => ({
    authedUser: authedUser
});

export default connect(mapStateToProps)(App);
