import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";
import data from "../flight.json";

const Home = ({ isLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    !isLogin && navigate("/login");
  }, [isLogin, navigate]);

  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const locale = navigator.language;
  const date = new Date();
  const day = date.toLocaleDateString(locale, { weekday: "long" });
  const month = date.toLocaleDateString(locale, { month: "long" });
  const dayOfMonth = date.getDate();

  const formattedDate = `${day} ${dayOfMonth} ${month}`;

  const time = new Date().toLocaleTimeString(navigator.language, timeOptions);

  return (
    <main>
      <header>
        <h1>DEPARTURES</h1>
        <div className="p">
          {formattedDate} <p> {time}</p>
        </div>
      </header>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>Flight No.</th>
              <th>From</th>
              <th>Scheduled</th>
              <th>Estimated</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dt) => (
              <tr key={Math.floor(Math.random() * 1000)}>
                <td
                  data-label="ID"
                  className={`${dt.status === "Cancelled" && "status"}`}
                >
                  {dt.flight_no}
                </td>
                <td
                  data-label="ID"
                  className={`${dt.status === "Cancelled" && "status"}`}
                >
                  {dt.from}
                </td>
                <td
                  data-label="ID"
                  className={`${dt.status === "Cancelled" && "status"}`}
                >
                  {dt.scheduled}
                </td>
                <td
                  data-label="ID"
                  className={`${dt.status === "Cancelled" && "status"}`}
                >
                  {dt.estimated}
                </td>
                <td
                  data-label="ID"
                  className={`${dt.status === "Cancelled" && "status"}`}
                >
                  {dt.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Home;
