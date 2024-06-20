import React from 'react';
import { connect } from 'react-redux';

const Leaderboard = (props) => {
    return (
        <div className="tableContainer">
            <table>
                <thead>
                <tr>
                    <th>Users</th>
                    <th>Answered</th>
                    <th>Created</th>
                </tr>
                </thead>
                <tbody>
                {props.leaderboardData.map((user) => (
                    <tr key={user.id}>
                        <td style={{display: "flex"}}>
                            {user.avatar && <img src={user.avatar} alt={`Avatar of ${user.name}`} className="avatar"/>}
                            <h4>{user.name} <i>(<span>{user.id}</span>)</i> </h4>

                        </td>
                        <td>{user.answered}</td>
                        <td>{user.created}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

const mapStateToProps = ({ users, questions }) => {
    const leaderboardData = Object.values(users).map(user => ({
        id: user.id,
        name: user.name,
        avatar: user.avatarURL,
        answered: Object.keys(user.answers).length,
        created: user.questions.length
    })).sort((a, b) => (b.answered + b.created) - (a.answered + a.created));

    return {
        leaderboardData
    };
};

export default connect(mapStateToProps)(Leaderboard);
