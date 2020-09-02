import React, { useState } from "react";
import { Row, Form, Col, FormLabel } from "react-bootstrap";

const stars = [5, 4, 3, 2, 1];
const ratings = [
  {
    name: "8.5-10 Excellent",
    value: "Excellent",
  },
  {
    name: "7 – 8.5 Very Good",
    value: "Very Good",
  },
  {
    name: "6 – 7 Good",
    value: "Good",
  },
  {
    name: "2 – 6 Fair",
    value: "Fair",
  },
  {
    name: "0-2 Okay",
    value: "Okay",
  },
];

export default function Filters({ cities, range, filters, onFiltersUpdate }) {
  const [price, setPrice] = useState(range.maxPrice);
  const [prType, setPrType] = useState("All");
  const [guestRating, setGuestRating] = useState("All");
  const [location, setLocation] = useState("All");
  const [filter, setFilter] = useState("No");

  return (
    <>
      <div id="filterbar2">
        <Form.Row className="px-2 mx-0">
          <Form.Group
            as={Col}
            column="true"
            sm={4}
            controlId="priceRange"
            className="border-right"
          >
            <Form.Label className="text-white">Price ${price}</Form.Label>
            <Form.Control
              className="px-0"
              type="range"
              min={range.minPrice}
              max={range.maxPrice}
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
                let curPrice = event.target.value;
                onFiltersUpdate(
                  curPrice,
                  prType,
                  guestRating,
                  location,
                  filter
                );
              }}
            />
          </Form.Group>

          <Form.Group
            as={Col}
            column="true"
            sm={2}
            controlId="propertyType"
            className="border-right"
          >
            <FormLabel className="text-white">Property Type</FormLabel>
            <Form.Control
              as="select"
              className="bg-filter"
              onChange={(event) => {
                let star = event.target.value;
                setPrType(event.target.value);
                onFiltersUpdate(price, star, guestRating, location, filter);
              }}
            >
              <option>All</option>
              {stars.map((star) => {
                return <option key={star}>{star}</option>;
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group
            as={Col}
            column="true"
            sm={2}
            controlId="guestRatng"
            className="border-right"
          >
            <FormLabel className="text-white">Guest rating</FormLabel>
            <Form.Control
              as="select"
              className="bg-filter"
              onChange={(event) => {
                let nGuestRating = event.target.value;
                setGuestRating(event.target.value);
                onFiltersUpdate(price, prType, nGuestRating, location, filter);
              }}
            >
              <option>All</option>
              {ratings.map((rate) => {
                return (
                  <option key={rate.name} value={rate.value}>
                    {rate.name}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} column="true" sm={4} controlId="location">
            <FormLabel className="text-white">Hotel locations</FormLabel>
            <Form.Control
              as="select"
              className="bg-filter"
              onChange={(event) => {
                let nLocation = event.target.value;
                setLocation(event.target.value);
                onFiltersUpdate(price, prType, guestRating, nLocation, filter);
              }}
            >
              <option value={null}>All</option>
              {cities.map((city, index) => {
                return <option key={index}>{city}</option>;
              })}
            </Form.Control>
          </Form.Group>
        </Form.Row>
      </div>
      <Form.Group as={Row} controlId="Sort by" className="my-5">
        <FormLabel
          column="true"
          sm={{ span: 1, offset: 7 }}
          className="pr-0 mb-0 align-self-center"
        >
          Sort by
        </FormLabel>
        <Col sm={4}>
          <Form.Control
            as="select"
            onChange={(event) => {
              let nfilter = event.target.value;
              setFilter(event.target.value);
              onFiltersUpdate(price, prType, guestRating, location, nfilter);
            }}
          >
            <option value="No">No selection</option>
            {filters.map((filter) => {
              return <option key={filter}>{filter}</option>;
            })}
          </Form.Control>
        </Col>
      </Form.Group>
    </>
  );
}
