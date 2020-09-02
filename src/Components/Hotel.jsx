import React from "react";
import { Col, Button } from "react-bootstrap";

function checkNumber(num) {
  if (Number.isInteger(num)) {
    return num + ".0";
  } else {
    return num.toString();
  }
}

export default function Hotel(props) {
  return (
    <>
      <Col xs={3} className="p-0">
        <img
          src={props.thumbnail}
          id="hotelimg"
          alt="hotel's image"
          width="100%"
          height="100%"
          className="p-1"
        />
      </Col>
      <Col xs={4} className="border-right mt-2 mb-4">
        <h3>{props.hotelName}</h3>
        <div className="stars-outer">
          <div
            className="stars-inner"
            style={{ width: (props.rating / 5) * 100 + "%" }}
          />
        </div>
        Hotel
        <p className="my-2 mb-4">{props.city}</p>
        <p className="mt-2">
          <span className="bg-success text-white rounded p-1">
            {checkNumber(props.ratings.no)}
          </span>
          <strong className="mx-1"> {props.ratings.text}</strong>
        </p>
      </Col>
      <Col xs={2} className="text-center border-right">
        <p className="mb-0 mt-3">Hotel Website</p>
        <p className="mt-0"> ${props.price}</p>

        <p className="mb-0 mt-3">Agoda</p>
        <p className="mt-0"> $575</p>

        <p className="mb-0 mt-3">Travelocity</p>
        <p className="mt-0"> $708</p>
        <hr />
        <p className="mb-0 mt-3 p-fontsize">
          <strong> More Deals from </strong>
        </p>
        <p className="mt-0 p-fontsize">
          <strong> $800 </strong>
        </p>
      </Col>

      <Col xs={3} className="text-center align-self-center">
        <p>Hotel Website</p>
        <p>${props.price}</p>
        <div className="btn-group dropright d-flex  justify-content-end">
          <Button
            type="button"
            variant="success"
            className="btn text-white dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            View Deal
          </Button>
        </div>
      </Col>
    </>
  );
}
