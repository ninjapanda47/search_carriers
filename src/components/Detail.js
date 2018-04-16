import React from "react";

export default function Detail({ details, closeModal }) {
  console.log(details);
  return (
    <div className="card border-primary mb-3 text-center">
      <div className="card-header">Carrier Details</div>
      <div className="card-body">
        <h4 className="card-title detail-name">{details.Name}</h4>
        <p className="card-text lead"><strong>Contact Name:</strong> {details.ContactName}</p>
        <p className="card-text lead"><strong>Contact Email:</strong> {details.ContactEmail} </p>
        <p className="card-text lead"><strong>Contact Phone:</strong> {details.ContactPhone}</p>
        <p className="card-text lead">
          <strong>Capabilities:</strong> {details.Capabilities.map(cap => cap) + ", "}
        </p>
        <p className="card-text lead"><strong>Price Per Load:</strong> {details.PricePerLoad}</p>
        <button
            className="btn btn-secondary modal-btn"
            onClick={e => closeModal()}
          >
            Close
          </button>
      </div>
    </div>
  );
}
