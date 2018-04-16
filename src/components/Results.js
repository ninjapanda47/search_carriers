import React from "react";
import Detail from "./Detail";

export default function Results({ results, showDetails }) {
  return (
    <div className="card">
      <div className="list-group-item result-title">
        <h4 className="card-header">Results</h4>
      </div>
      <ul className="list-group list-group-flush">
        {results &&
          results.map(result => (
            <li className="list-group-item" key={result.Id}>
              <span className="title">
                <h5 className="card-title lead"><strong>Carrier Name:</strong> {result.Name}</h5>
                <h5 className="location lead">
                  <strong>Locations:</strong> {result.Locations.map(city => city.City + ", ")}
                </h5>
              </span>
              <button
                type="button"
                className="btn btn-secondary float-right"
                onClick={e => showDetails(result.Id)}
              >
                Details
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
