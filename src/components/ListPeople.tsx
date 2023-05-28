import { Card, Col, Input, Pagination, Row } from "antd";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { TPeopleByPage } from "../service";
import { Link } from "react-router-dom";
import { getNumberPersonFromUrl } from "../utilites/getNumberPersonFromUrl";
import starWarsLogo from "../assets/star.png";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { AudioOutlined } from "@ant-design/icons";

type ListPeopleProps = {
  data: TPeopleByPage;
  error: FetchBaseQueryError | SerializedError | undefined;
  isLoading: boolean;
  handleQuery: Dispatch<SetStateAction<string>>;
};

export const ListPeople: FC<ListPeopleProps> = ({
  data,
  error,
  isLoading,
  handleQuery,
}) => {
  const { Search } = Input;
  const { Meta } = Card;

  //TODO заменить на адекватный тип
  const handleChange = (event: any) => {
    handleQuery(event);
    setPeopleName("");
  };
  const [peopleName, setPeopleName] = useState("");
  const onSearch = (value: string) => {
    setPeopleName(value);
  };

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1677ff",
      }}
    />
  );

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
      }}>
      <Row>
        <Col md={6} lg={8} xl={10}>
          <Search
            placeholder="input search name"
            enterButton="Search"
            size="large"
            suffix={suffix}
            onSearch={onSearch}
            style={{ margin: "10px 0 20px 0" }}
          />
        </Col>
        <Col md={12} lg={8} xl={4}></Col>
        <Col md={6} lg={8} xl={10}></Col>
      </Row>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}>
        {data?.results
          ?.filter((item) => {
            return item.name.toLowerCase().includes(peopleName.toLowerCase());
          })
          .map((person) => (
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
      </div>
      <Row gutter={16} justify={"center"} align={"middle"}>
        <Pagination
          style={{ margin: "20px 0" }}
          defaultCurrent={1}
          total={data?.count}
          onChange={handleChange}
          disabled={isLoading}
          showSizeChanger={false}
        />
      </Row>
    </div>
  );
};
