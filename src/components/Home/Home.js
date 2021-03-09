import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import _ from "lodash";

import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import Spinner from "../Spinner";
import VideoTrack from "../VideoTrack";

import {
  getVideos,
  setVideo,
  loading,
  getFilters,
  setFilter,
} from "../../actions";

const Home = ({darkMode}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideos());
    dispatch(getFilters());
  }, [dispatch]);

  const getVideoById = (id, videos) =>
    videos.find((video) => video.uri === `/videos/${id}`);

  let videos = useSelector((state) => state.allVideos, shallowEqual);
  let total = useSelector((state) => state.total, shallowEqual);
  let last = useSelector((state) => state.last, shallowEqual);
  let next = useSelector((state) => state.next, shallowEqual) ? true : false;
  let prev = useSelector((state) => state.prev, shallowEqual) ? true : false;
  let pageNo = useSelector((state) => state.pageNo, shallowEqual);

  //filter the videos
  let currentVideo = useSelector((state) => state.currentVideo, shallowEqual); //returns an id

  let videoData = currentVideo ? getVideoById(currentVideo, videos) : videos[0];

  const isLoading = useSelector((state) => state.isLoading);
  const filters = useSelector((state) => state.filterData);
  const currentFilter = useSelector((state) => state.currentFilter);

  //Pagination
  const paginationOut = [];
  _.times(last, (i) => {
    paginationOut.push(
      <a
        className={`page ${pageNo === i + 1 ? "selected" : ""}`}
        href=""
        id={i}
        key={i}
        onClick={(e) => {
          e.preventDefault();
          dispatch(loading());
          dispatch(getVideos(i + 1, currentFilter));
          window.scroll(0, 0);
        }}
      >
        {i + 1}
      </a>
    );
  });

  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/placeholder.svg"
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
            src="/placeholder.svg"
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
            src="/placeholder.svg"
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
      <Container className="mt-4" fluid>
        <VideoTrack title={"Here For You"} videos={videos} />
        <VideoTrack title={"We Are RadNet"} videos={videos} />
        <VideoTrack title={"Patients"} videos={videos} />
        <VideoTrack title={"Here For You"} videos={videos} />
      </Container>
      <Container className="">
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
      </Container>
    </>
  );
};

export default Home;
