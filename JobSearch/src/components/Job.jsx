import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addFavorite } from '../actions/favoriteActions';

const Job = ({ data }) => {
  const dispatch = useDispatch();

  const handleAddFavorite = () => {
    dispatch(addFavorite(data.title));
  };

  return (
    <Row
      className="mx-0 mt-3 p-3 job-card"
      style={{
        border: '1px solid #ccc',
        borderRadius: 8,
        background: 'linear-gradient(to right, #bac634, #4CAF50)',
        height: '200px',
        display: 'flex',
        alignItems: 'center', 
      }}
    >
      <Col xs={12} md={3} className="text-center flex-column">
        <Button
          variant="outline-success"
          onClick={handleAddFavorite}
          className="mb-4 add-to-favorites-btn"
          style={{ borderRadius: '20px', width: '200px' }}
        >
          Aggiungi ai preferiti
        </Button>
      </Col>
      <Col xs={12} md={9} className="text-center flex-column">
        <Link to={`/${data.company_name}`} className="company-name" >
          {data.company_name}
        </Link>
        <a
          href={data.url}
          target="_blank"
          rel="noreferrer"
          className="job-title"
          style={{ display: 'block', height: '100%',  textDecoration: 'none' }}
        >
          {data.title}
        </a>
      </Col>
    </Row>
  );
};

export default Job;










