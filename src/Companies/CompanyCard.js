import React from "react";
import { Link } from "react-router-dom";
import { Card, CardTitle } from "reactstrap";
import "./CompanyCard.css"

const CompanyCard = ({ handle, name, description, logoUrl }) => {
    return (
        <Link className="CompanyCard-card" to={`/companies/${handle}`}>
            <Card className="card-body">
                <CardTitle>
                    <h4>{name}</h4>
                    {logoUrl && <img src={logoUrl} alt={name} />}
                </CardTitle>
                <p>{description}</p>
            </Card>
        </Link>
    );
}

export default CompanyCard;