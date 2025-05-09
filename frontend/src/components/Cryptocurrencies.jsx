import React from "react";
import { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import Loader from "./Loader";
import { useGetCryptosQuery } from "../services/cryptoApi";
// import { email } from '../services/email.js'

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const useDebounce = (text, delay = 1000) => {
    const [deBounce, setDebounce] = useState(text);
    useEffect(() => {
      const timer = setTimeout(() => {
        setDebounce(text);
      }, delay);

      return () => clearTimeout(timer)
    }, [text, delay]);

    return deBounce;
  };

  const deBounceFilter = useDebounce(searchTerm)

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(deBounceFilter.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, deBounceFilter]);

  if (isFetching) return <Loader />;
  if (cryptos?.price > 60000) {
  }
  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency?.uuid}
          >
            <Link to={`/crypto/${currency?.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    alt="cryptocurrency"
                    src={currency.iconUrl}
                  />
                }
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
