
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";

import VideoTrack from "../VideoTrack";
import Seo from '../../components/Seo'
import placeholder from '../../images/placeholder.svg'


const Home = ({videos, filters, darkMode}) => {
  console.log(filters)
  return (
    <>
      <Seo title={`Home`}/>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={placeholder}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={placeholder}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={placeholder}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Container className="mt-4 pb-5 mb-5">
        {filters.map((filter, idx) => <VideoTrack key={idx} filter={filter} />)}
      </Container>
      {/* <Container className="">
        <Row>
          <Col className="mt-4 mb-4 text-center">
            {prev ? (
              <button
                className={`btn get-more-videos mr-3 ${
                  darkMode ? "btn-outline-light" : "btn-outline-dark"
                }`}
                onClick={() => {
                  dispatch(loading());
                  dispatch(getVideos(pageNo - 1, currentFilter));
                  window.scroll(0, 0);
                }}
              >
                PREV
              </button>
            ) : (
              ""
            )}
            {total > 25 ? paginationOut : ""}
            {next ? (
              <button
                className={`btn get-more-videos ${
                  darkMode ? "btn-outline-light" : "btn-outline-dark"
                }`}
                onClick={() => {
                  dispatch(loading());
                  dispatch(getVideos(pageNo + 1, currentFilter));
                  window.scroll(0, 0);
                }}
              >
                NEXT
              </button>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </Container> */}
    </>
  );
};

export default Home;
