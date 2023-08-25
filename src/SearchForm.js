import React from "react";
import { useState } from "react";
import { Button, Form, Input } from "reactstrap";
import "./SearchForm.css"

const SearchForm = ({ searchFor }) => {
    console.debug("SearchForm", "searchFor=", typeof searchFor);

    const [searchTerm, setSearchTerm] = useState("");

    function handleSubmit(evt) {
        evt.preventDefault();
        searchFor(searchTerm.trim() || undefined);
        setSearchTerm(searchTerm.trim());
    }

    function handleChange(evt) {
        setSearchTerm(evt.target.value);
    }

    // console.log("search term:", searchTerm);
    return (
        <div className="SearchForm">
            <Form onSubmit={handleSubmit}>
                <Input
                    name="searchTerm"
                    placeholder="Enter search term.."
                    value={searchTerm}
                    onChange={handleChange}
                />
            </Form>
            <Button type="submit">Submit</Button>
        </div>
    )
}

export default SearchForm;