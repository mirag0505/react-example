import starWarsLogo from "./assets/star.png";
import "./App.css";
import { useAppSelector, increment, useAppDispatch } from "./counterReducer";
import { Button } from "antd";
import { useGetPeopleByPageQuery } from "./service";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { getNumberPersonFromUrl } from "./utilites/getNumberPersonFromUrl";
import { Pagination } from "antd";
import { useState } from "react";
import { Spin } from 'antd';

function App() {
  const countFromReducer = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const { data, error, isLoading } = useGetPeopleByPageQuery(query);

  const { Meta } = Card;
  const handleChange = (event: any) => {
    setQuery(event);
  };
  return (
    <>
      <h1>Star wars</h1>
      <div>
        {isLoading ? (
        <Spin/>
        ) : (
          <>
            {error ? (
              <pre>{JSON.stringify(error)}</pre>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                }}>
                <Pagination
                  defaultCurrent={1}
                  total={50}
                  onChange={handleChange}
                />
                {data?.results?.map((person) => (
                  <Link
                    key={person?.url}
                    style={{ flex: "0 0 30%", margin: "10px" }}
                    to={`people/${getNumberPersonFromUrl(person.url)}`}>
                    <Card
                      hoverable
                      bordered={false}
                      cover={<img alt={person?.url} src={starWarsLogo} />}>
                      <Meta title={person?.name} description={person?.url} />
                    </Card>
                  </Link>
                ))}
                <Pagination
                  defaultCurrent={1}
                  total={50}
                  onChange={handleChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
