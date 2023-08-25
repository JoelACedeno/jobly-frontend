import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardTitle } from "reactstrap";
import UserContext from "../ContextProvider";
import "./JobCard.css"

const JobCard = ({ id, title, salary, equity, companyName }) => {
    const { hasAppliedToJob, applyToJob } = useContext(UserContext);
    const [applied, setApplied] = useState();

    useEffect(function updateAppliedStatus() {

        setApplied(hasAppliedToJob(id));
    }, [id, hasAppliedToJob])

    async function handleApply(evt) {
        if (hasAppliedToJob(id)) return;
        applyToJob(id);
        setApplied(true);
    }


    return (
        <div> {applied}
            <Card className="card-body">
                <CardTitle><h4>{title}</h4></CardTitle>
                <p>{companyName}</p>
                {salary && <div>Salary: {salary}</div>}
                {equity !== undefined && <div>Equity: {equity}</div>}
                <Button className="apply-btn" onClick={handleApply} disabled={applied}>
                    {applied ? "Applied" : "Apply"}
                </Button>
            </Card>
        </div>
    )
}

export default JobCard;