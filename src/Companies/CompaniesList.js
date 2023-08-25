import React, { useEffect, useState } from "react";
import JoblyApi from "../api";
import SearchForm from "../SearchForm";
import CompanyCard from "./CompanyCard";
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    ListGroup,
    ListGroupItem
} from "reactstrap";
import "./CompaniesList.css"

const CompaniesList = () => {
    console.debug("CompanyList");

    const [companies, setCompanies] = useState(null);

    useEffect(function getCompanies() {
        console.debug("CompanyList useEffect getCompaniesOnMount");
        search();
    }, []);

    async function search(name) {
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies);
    }

    console.log("logging companies:", companies);

    if (!companies) return <p>Loading...</p>

    return (
        <section>
            <SearchForm searchFor={search} />
            {companies.length
                ? (
                    <ListGroup className="companies-list-group">
                        {companies.map(c => (
                            <ListGroupItem>
                                <Card>
                                    <CompanyCard
                                        key={c.handle}
                                        handle={c.handle}
                                        name={c.name}
                                        description={c.description}
                                        logoUrl={c.logoUrl}
                                    />
                                </Card>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                ) : (
                    <p>Sorry, no results were found!</p>
                )}
        </section>
    )
}

export default CompaniesList;