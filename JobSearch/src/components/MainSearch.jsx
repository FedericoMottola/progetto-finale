import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Job from "./Job";

const MainSearch = () => {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/jobs?search=";

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(baseEndpoint + query + "&limit=20");
      if (response.ok) {
        const { data } = await response.json();
        setJobs(data);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="app-background">
    <Container className="my-5">
      <Row className="text-center">
        <Col xs={12}>
          <h1 className="display-4 mb-4 title">Remote Jobs Search</h1>
          <Button variant="outline-primary" onClick={() => navigate("/favorites")}>
            Vai ai preferiti
          </Button>
        </Col>
      </Row>
      <Row className="mt-4 justify-content-center">
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="searchForm">
              <Form.Control
                type="search"
                value={query}
                onChange={handleChange}
                placeholder="Cerca lavori e premi Invio"
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row className="mt-4 justify-content-center">
        {jobs.map((jobData) => (
          <Col xs={12} md={6} lg={4} key={jobData._id}>
            <Job data={jobData} />
          </Col>
        ))}
      </Row>
    </Container>
    </div>
  );
};

export default MainSearch;
