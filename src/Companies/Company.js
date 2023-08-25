import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";
import JobCardList from "../JobCardList";
import "./Company.css"

const Company = () => {
    const { handle } = useParams();
    const [company, setCompany] = useState(null);

    useEffect(function getCompanyAndJobs() {
        console.debug("CompanyDetail", "handle=", handle);
        async function getCompany() {
            let res = await JoblyApi.getCompany(handle);
            setCompany(res);
        }
        getCompany();

    }, [handle]);

    console.log("logging company:", company);

    if (!company) return <p>Loading...</p>

    return (
        <div>
            <div className="company-info">
                <h4>{company.name}</h4>
                <p>{company.description}</p>
            </div>
            <JobCardList jobs={company.jobs} />
        </div>
    )
}

export default Company;