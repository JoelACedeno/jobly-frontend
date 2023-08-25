import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import JoblyApi from "./api";
import JobCardList from "./JobCardList";
import { ListGroup } from "reactstrap";


const JobsList = () => {
    const [jobs, setJobs] = useState(null);

    useEffect(function getAllJobsOnMount() {
        console.debug("JobList useEffect getAllJobsOnMount");
        search();
    }, []);

    async function search(title) {
        let res = await JoblyApi.getJobs(title);
        setJobs(res);
    }

    if (!jobs) return <p>Loading...</p>;


    return (
        <div>
            <SearchForm searchFor={search} />
            <ListGroup >
                {jobs.length
                    ? <JobCardList jobs={jobs} />
                    : <p>Sorry, no results were found!</p>
                }
            </ListGroup>
        </div >
    )
}

export default JobsList;