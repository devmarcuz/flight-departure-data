import React from "react";
import Loading from "./loading";

const Table = ({ loading, currentPosts }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Airport</th>
          <th>Time</th>
          <th>Arriving</th>
          <th>Departing</th>
        </tr>
      </thead>
      {loading ? (
        <Loading />
      ) : (
        <tbody>
          {currentPosts.map((dt, index) => (
            <tr key={index}>
              <td
                data-label="ID"
                // className={`${dt.status === "Cancelled" && "status"}`}
              >
                {dt.airport}
              </td>
              {/* <td
                  data-label="ID"
                  // className={`${dt.status === "Cancelled" && "status"}`}
                >
                  {dt.from}
                </td> */}
              <td
                data-label="ID"
                // className={`${dt.status === "Cancelled" && "status"}`}
              >
                {dt.time}
              </td>
              <td
                data-label="ID"
                // className={`${dt.status === "Cancelled" && "status"}`}
              >
                {dt.arriving}
              </td>
              <td
                data-label="ID"
                // className={`${dt.status === "Cancelled" && "status"}`}
              >
                {dt.departing}
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

export default Table;
