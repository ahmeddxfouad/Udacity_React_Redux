import { connect } from "react-redux";
import Nav from "./Nav";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./Dashboard";
import QuestionPage from "./QuestionPage";
import PageNotFound from "./PageNotFound";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";

const MainPage = (props) => {
    return (
    <div>
        <Nav/>
        <div className="container">
            <Routes>
                <Route path="/home" exact element={<Dashboard />} />
                <Route path="/question/:id" element={<QuestionPage />} />
                <Route path="/notfound" element={<PageNotFound />} />
                <Route path="/new" element={<NewQuestion />} />
                <Route path="/leaderboard" element={<LeaderBoard />} />
            </Routes>
        </div>
    </div>
    );
};

const mapStateToProps = ({ authedUser }) => ({
    loading: authedUser === null,
    authedUser: authedUser
});


export default connect(mapStateToProps)(MainPage);
