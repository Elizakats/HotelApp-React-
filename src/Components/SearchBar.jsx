import React from "react";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";

const SearchBar = ({ onSubmit, entries }) => {
  return (
    <InputGroup className="mb-2">
      <Form.Label htmlFor="search" srOnly />
      <InputGroup.Prepend>
        <InputGroup.Text className="bg-white">
          <i className="fa fa-search" />
        </InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl  name="keyword" list="searchbar" id="search" className="border-left-0" />
      <datalist id="searchbar">
        {entries.map((hotel) => {
          return <option key={hotel.thumbnail} value={hotel.city} />;
        })}
      </datalist>
      <InputGroup.Append>
        <Button variant="primary" onClick={onSubmit} >Search </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default SearchBar;
