import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const SingleUser = props => {
    const { store, actions } = useContext(Context);
    const params = useParams();

    return (
        <div className="jumbotron">
            <h1 className="display-4">Profile for {params.username}</h1>
        </div>
    );
};
