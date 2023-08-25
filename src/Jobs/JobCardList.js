import React from "react";
import JobCard from "./JobCard";
import { Card, ListGroup, ListGroupItem } from "reactstrap";
import "./JobCardList.css"

const JobCardList = ({ jobs }) => {
    return (
        <div className="JobCardList">
            <ListGroup className="jobs-list-group">
                {jobs.map(job => (
                    <ListGroupItem>
                        <Card>
                            <JobCard
                                key={job.id}
                                id={job.id}
                                title={job.title}
                                salary={job.salary}
                                equity={job.equity}
                                companyName={job.companyName}
                            />
                        </Card>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
}

export default JobCardList;