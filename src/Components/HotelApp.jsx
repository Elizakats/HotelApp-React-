import React, { useState } from "react";
import {
  Row,
  Col,
  Container,
  Form,
  FormLabel,
  Modal,
  Button,
} from "react-bootstrap";
import Hotel from "./Hotel";
import SearchBar from "./SearchBar";
import Filters from "./Filters";

function loop(hotelInfo, index) {
  return (
    <Row className="mb-2 bg-white" id="hotelrow" key={index}>
      <Hotel
        hotelName={hotelInfo.hotelName}
        rating={hotelInfo.rating}
        city={hotelInfo.city}
        thumbnail={hotelInfo.thumbnail}
        guestrating={hotelInfo.guestrating}
        ratings={hotelInfo.ratings}
        price={hotelInfo.price}
      />
    </Row>
  );
}

function priceRange(hotelInfo) {
  let minPrice = hotelInfo[0].price;
  let maxPrice = hotelInfo[0].price;
  hotelInfo.forEach((element) => {
    if (minPrice > element.price) {
      minPrice = element.price;
    }
    if (maxPrice < element.price) {
      maxPrice = element.price;
    }
  });
  return { minPrice, maxPrice };
}

function formatDate(date) {
  let dd = date.getDate();
  let mm = date.getMonth() + 1; //January is 0!
  const yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return yyyy + "-" + mm + "-" + dd;
}

export default function HotelApp(props) {
  const entries = props.entries;
  const roomtypes = props.roomtypes;
  const [hotels, setHotels] = useState(entries);
  const range = priceRange(entries);

  const [show, setShow] = useState(false);
  const [checkIn, setCheckIn] = useState(formatDate(new Date()));

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cities = [];
  entries.forEach((element) => {
    if (!cities.includes(element.city)) cities.push(element.city);
  });

  const filters = [];
  entries.forEach((element) => {
    element.filters.forEach((filter) => {
      if (!filters.includes(filter.name)) filters.push(filter.name);
    });
  });

  let updatedHotels;

  const handleSubmit = (event) => {
    event.preventDefault();
    const keyword = document.getElementById("search").value;
    updatedHotels = entries.filter((hotel) => {
      return hotel.city.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
    });
    setHotels(updatedHotels);
  };

  const handleFilters = (price, prType, guestRating, location, filter) => {
    updatedHotels = entries.filter((hotel) => {
      if (prType !== "All") {
        if (hotel.rating !== Number(prType)) {
          return false;
        }
      }

      if (guestRating !== "All") {
        if (hotel.ratings.text.indexOf(guestRating) === -1) {
          return false;
        }
      }

      if (location !== "All") {
        if (hotel.city.indexOf(location) === -1) {
          return false;
        }
      }

      if (filter !== "No") {
        let hotelfilters = [];
        hotel.filters.forEach((hfilter) => {
          hotelfilters.push(hfilter.name);
        });

        if (hotelfilters.indexOf(filter) === -1) {
          return false;
        }
      }

      return hotel.price <= price;
    });
    setHotels(updatedHotels);
    console.log(updatedHotels);
  };
  return (
    <Container fluid>
      <Col md={{ span: 10, offset: 1 }} className="px-0">
        <Container fluid id="filterbar" className="mt-2">
          <Row className="px-2 pt-1">
            <SearchBar entries={entries} onSubmit={handleSubmit} />
          </Row>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="checkin">
                <Form.Label className="text-white">Check in</Form.Label>
                <Form.Control
                  type="date"
                  min={formatDate(new Date())}
                  value={checkIn}
                  onChange={(event) => {
                    setCheckIn(formatDate(new Date(event.target.value)));
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="checkout">
                <Form.Label className="text-white">Check out</Form.Label>
                <Form.Control type="date" min={checkIn} />
              </Form.Group>

              <Form.Group as={Col} controlId="roomtype">
                <FormLabel className="text-white">Room type</FormLabel>
                <Form.Control as="select">
                  {roomtypes.map((type) => {
                    return <option key={type.name}>{type.name}</option>;
                  })}
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </Form>
        </Container>
        <Filters
          range={range}
          cities={cities}
          filters={filters}
          onFiltersUpdate={handleFilters}
        />
        <Container fluid id="mapFrame">
          <iframe src={entries[0].mapurl} height="100px" />
          <Col>
            <Button
              variant="light"
              className="mt-2"
              id="btnMap"
              onClick={handleShow}
            >
              View map
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Body>
                <iframe src={entries[0].mapurl} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Container>
        <Container fluid>{hotels.map(loop)}</Container>
      </Col>
    </Container>
  );
}
