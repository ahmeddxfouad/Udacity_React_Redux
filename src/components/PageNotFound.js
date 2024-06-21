import React from "react";
import {useNavigate} from "react-router-dom";

export default function PageNotFound() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>404 Error</h1>
            <h1>Page Not Found</h1>
            <button className="btn" onClick={() => navigate('/home') }>Go Back</button>
        </div>
    );
};
