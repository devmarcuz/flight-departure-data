import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";
import axios from "axios";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import { ImAirplane } from "react-icons/im";
import { BiPowerOff } from "react-icons/bi";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);

  useEffect(() => {
    if (!localStorage.getItem("flight-departure-user")) {
      navigate("/login");
    }
  }, [navigate]);

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

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const [currentPosts, setCurrentPosts] = useState([]);

  useEffect(() => {
    setCurrentPosts([...data.slice(indexOfFirstPost, indexOfLastPost)]);
  }, [data, indexOfLastPost, indexOfFirstPost]);

  const paginate = (number) => {
    setCurrentPage(number);
  };

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

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <main>
      <header>
        <h1>DASHBOARD</h1>
        <div className="welcome">
          <ImAirplane />
          <p>Check-in</p>
        </div>
        <div className="end">
          <div className="p">
            {formattedDate} <p> {time}</p>
          </div>
          <button className="logout" onClick={logout}>
            <BiPowerOff />
          </button>
        </div>
      </header>
      <div className="container">
        <Table loading={loading} currentPosts={currentPosts} />
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalUsers={data.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </main>
  );
};

export default Home;
