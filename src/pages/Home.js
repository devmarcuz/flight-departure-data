import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";
import axios from "axios";
import Loading from "../components/loading";

const Home = ({ isLogin }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    !isLogin && navigate("/login");
  }, [isLogin, navigate]);

  useEffect(() => {
    if (data.length < 1) {
      const airportAbbreviations = {
        Brisbane: "BNE",
        Melbourne: "MEL",
        Sydney: "SYD",
        Ballina: "BNK",
      };

      axios
        .get("https://opensky-network.org/api/states/all")
        .then((response) => {
          const data = response.data.states;
          const flights = data.map((state) => {
            const arrivalAirport = state[2];
            const departureAirport = state[3];
            const time = new Date(state[4] * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
              timeZone: "America/Chicago",
            });
            const id = state[0];
            const arriving =
              airportAbbreviations[arrivalAirport] || arrivalAirport;
            const departing =
              airportAbbreviations[departureAirport] || departureAirport;

            return {
              id: id,
              arriving: arriving,
              time: time,
              airport: `${arriving} `,
              departing: departing,
            };
          });

          setData(flights);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    }
  }, [data]);

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
        <h1>DASHBOARD</h1>
        <div className="p">
          {formattedDate} <p> {time}</p>
        </div>
      </header>
      <div className="container">
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
              {data.map((dt, index) => (
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
      </div>
    </main>
  );
};

export default Home;
