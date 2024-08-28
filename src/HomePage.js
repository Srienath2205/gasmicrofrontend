import React, { useRef, useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./Footer";
import HomeNavbarComponent from "./HomeNavbarComponent";
import "./App2.css";
import video from "./PreDeliveryChecks.mp4";
import image from "./homebackground.avif";

function HomePage() {
  const welcomeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [setVolume] = useState(1);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };

  const collaboratorSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const scrollToSection = (sectionRef) => {
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
      }}
      className={isFullscreen ? "fullscreen" : ""}
    >
      {" "}
      <HomeNavbarComponent />
      <br />
      <br />
      <div ref={welcomeRef} id="welcome" className="slider-container">
        <Slider {...sliderSettings}>
          <div className="slider-slide">
            <img
              src="https://www.india.gov.in/sites/upload_files/npi/files/spotlights/ujjwala-yojana-inner.jpg"
              alt="Ujjwala Yojana"
              className="slider-image"
            />
            <p className="slider-caption">Pradhan Mantri Ujjwala Yojana</p>
          </div>
          <div className="slider-slide">
            <img
              src="https://media.licdn.com/dms/image/D4D22AQG2kQ5DbibY_A/feedshare-shrink_800/0/1703165437031?e=2147483647&v=beta&t=fOcjrk8jkF9IsyEhTS6Ig2RCxEugjrbjmHEtbpj3RgE"
              alt="Indane Connections"
              className="slider-image"
            />
            <p className="slider-caption">Indane Connections</p>
          </div>
          <div className="slider-slide">
            <img
              src="https://images.tv9hindi.com/wp-content/uploads/2021/06/eVzDuzUI.jpg?w=1280&enlarge=true"
              alt="Register for PNG"
              className="slider-image"
            />
            <p className="slider-caption">Register For PNG</p>
          </div>
        </Slider>
      </div>
      {/* Video Player Section */}
      <Container className="mt-5" id="video-player">
        <center>
          <h2 className="home-title">Pre Delivery Checks</h2>
        </center>
        <br />
        <div className="video-player-container">
          <video
            ref={videoRef}
            id="video"
            controls
            className="video-player"
            src={video}
            autoPlay
            loop
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </Container>
      <Container className="mt-5" id="aboutus">
        <center>
          <h2 className="home-title">About Us</h2>
        </center>
        <br />
        <div ref={aboutRef}>
          <Slider {...collaboratorSliderSettings}>
            <div>
              <Card className="collaborator-card">
                <Card.Img
                  variant="top"
                  src="https://i.pinimg.com/originals/d4/30/d9/d430d9d625fce9c16dfae8b44b402e81.jpg"
                  alt="Collaborator 1"
                />
                <Card.Body>
                  <Card.Title>HP</Card.Title>
                  <Card.Text>
                    Providing expert support and services for our gas connection
                    system.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card className="collaborator-card">
                <Card.Img
                  variant="top"
                  src="https://5.imimg.com/data5/SELLER/Default/2024/1/379708269/NQ/LX/JU/135302587/gas-safe-india-domestic-gas-safety-device-500x500.jpg"
                  alt="Collaborator 2"
                />
                <Card.Body>
                  <Card.Title>Gas Safe</Card.Title>
                  <Card.Text>
                    Ensuring safety and efficiency in all our gas connections.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card className="collaborator-card">
                <Card.Img
                  variant="top"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOgdE15GlMWUddgazyOTbA5LRZ0sSWZvbobSwD7QdgqlKxI6Etm7Z_PcjSFWFTY96-3n4&usqp=CAU"
                  alt="Collaborator 3"
                />
                <Card.Body>
                  <Card.Title>UI</Card.Title>
                  <Card.Text>
                    Enhancing user experience with seamless service.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card className="collaborator-card">
                <Card.Img
                  variant="top"
                  src="https://i.pinimg.com/736x/b2/f9/33/b2f93328dedc3d7c86967e492aa03b39.jpg"
                  alt="Collaborator 4"
                />
                <Card.Body>
                  <Card.Title>Indane</Card.Title>
                  <Card.Text>
                    Supporting community outreach and engagement.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card className="collaborator-card">
                <Card.Img
                  variant="top"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBMLKTe4GuzhIPudTQ0zkv2O1Tw7P_AY-2Og&s"
                  alt="Collaborator 5"
                />
                <Card.Body>
                  <Card.Title>
                    Environmental <br />
                    sustainability
                  </Card.Title>
                  <Card.Text>
                    Commitment to environmental sustainability.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Slider>
        </div>
      </Container>
      <Container className="mt-5" id="contact">
        <div className="contact-section" ref={contactRef}>
          <div className="contact-image">
            <img
              src="https://img.freepik.com/free-photo/hot-line-contact-us-call-center-search-interface_53876-124009.jpg"
              alt="Contact Us"
              className="contact-image"
            />
          </div>
          <div className="contact-form">
            <h2 className="home-title">Contact Us</h2>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label className="home-title">Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label className="home-title">Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>
              <Form.Group controlId="formFeedback">
                <Form.Label className="home-title">Feedback</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your feedback"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default HomePage;
