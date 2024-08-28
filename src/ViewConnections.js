import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomerSideBar from "./CustomerSideBar";
import { styled, useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

const drawerWidth = 240; // Assuming this is the width of the sidebar

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: drawerWidth,
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
  },
}));

function ViewConnections() {
  const [connections, setConnections] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    axios
      .get("http://localhost:8787/customerside/connections")
      .then((response) => setConnections(response.data))
      .catch((error) => {
        console.error(error);
        setError("Failed to load connections.");
      });

    axios
      .get("http://localhost:8787/customerside/locations")
      .then((response) => setLocations(response.data))
      .catch((error) => {
        console.error(error);
        setError("Failed to load locations.");
      });
  }, []);

  const handleViewInfo = (connection) => {
    setSelectedConnection(connection);
    setShowModal(true);
  };

  const handleConnect = (connection) => {
    navigate(`/connectionrequest`, { state: { connectionId: connection.id } });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedConnection(null);
  };

  const filteredConnections =
    selectedLocation === "All"
      ? connections
      : connections.filter(
          (connection) => connection.location === selectedLocation
        );

  return (
    <div style={{ display: 'flex' }}>
      <CustomerSideBar open={sidebarOpen} handleDrawerClose={() => setSidebarOpen(false)} />
      <main style={{ flexGrow: 1, padding: "20px" }}>
        <Container >
          <Row className="mb-4">
            <Col>
              <center>
                <h2
                  className="distribution-title"
                  style={{
                    marginTop: "30px",
                    fontSize: "25px",
                    fontFamily: "verdana",
                    fontWeight: "bold",
                    fontStyle: "italic",
                  }}
                >
                  Available Gas Connections
                </h2>
              </center>
            </Col>
          </Row>

          {error && <div className="error-message mb-4">{error}</div>}

          <Row className="mb-4">
            <Col>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {selectedLocation}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSelectedLocation("All")}>
                    All
                  </Dropdown.Item>
                  {locations.map((location) => (
                    <Dropdown.Item
                      key={location}
                      onClick={() => setSelectedLocation(location)}
                    >
                      {location}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>

          <Row>
            {filteredConnections.length === 0 ? (
              <Col>
                <center>
                  <p
                    className="distribution-title"
                    style={{
                      fontSize: "25px",
                      fontFamily: "verdana",
                      fontWeight: "bold",
                      fontStyle: "italic",
                    }}
                  >
                    No connections available.
                  </p>
                </center>
              </Col>
            ) : (
              filteredConnections.map((connection) => (
                <Col xs={12} sm={6} md={4} key={connection.id} className="mb-4">
                  <Card className="connection-card">
                    {connection.cropsImage && (
                      <Card.Img
                        variant="top"
                        src={`data:image/jpeg;base64,${connection.cropsImage}`}
                        alt={connection.name}
                        className="connection-image"
                      />
                    )}
                    <Card.Body>
                      <Card.Title>{connection.name}</Card.Title>
                      <Card.Text>
                        <center>
                          <strong>Location:</strong> {connection.location}
                        </center>
                      </Card.Text>
                      <Row className="justify-content-center">
                        <Col xs="auto">
                          <Button
                            variant="primary"
                            onClick={() => handleViewInfo(connection)}
                            className="me-2"
                          >
                            {selectedConnection &&
                            selectedConnection.id === connection.id
                              ? "Hide Info"
                              : "View Info"}
                          </Button>
                        </Col>
                        <Col xs="auto">
                          <Button
                            variant="danger"
                            onClick={() => handleConnect(connection)}
                          >
                            Connect
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Container>

        {selectedConnection && (
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedConnection.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedConnection.cropsImage && (
                <img
                  src={`data:image/jpeg;base64,${selectedConnection.cropsImage}`}
                  alt={selectedConnection.name}
                  className="img-fluid mb-3"
                />
              )}
              <p>
                <strong>Description:</strong> {selectedConnection.description}
              </p>
              <p>
                <strong>Ratings:</strong> {selectedConnection.ratings}
              </p>
              <p>
                <strong>Reviews:</strong> {selectedConnection.reviews}
              </p>
              <p>
                <strong>Location:</strong> {selectedConnection.location}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => handleConnect(selectedConnection)}
              >
                Connect
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </main>
    </div>
  );
}

export default ViewConnections;

  

