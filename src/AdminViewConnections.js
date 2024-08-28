import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Container,
  Modal,
  Dropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import "./App2.css";

function AdminViewConnections() {
  const navigate = useNavigate();

  const [connections, setConnections] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8787/adminside/deleteconnection/${id}`)
      .then(() => {
        setConnections(connections.filter((conn) => conn.id !== id));
        setSelectedConnection(null);
        setError("Connection deleted successfully.");
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to delete connection.");
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedConnection(null);
  };

  // Filter connections by selected location
  const filteredConnections =
    selectedLocation === "All"
      ? connections
      : connections.filter(
          (connection) => connection.location === selectedLocation
        );

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar
        open={sidebarOpen}
        handleDrawerClose={() => setSidebarOpen(!sidebarOpen)}
      />

      <main style={{ flexGrow: 1, padding: "20px" }}>
        <Container>
          <Row>
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
                  aria-label="Manage Gas Connections"
                >
                  Manage Gas Connections
                </h2>
              </center>
            </Col>
          </Row>

          <br />
          <Row>
            <Col>
              <Link
                to="/connection-distribution"
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button variant="primary" aria-label="Add Connection">
                  Add Connection
                </Button>
              </Link>
            </Col>
          </Row>

          <br />

          {error && (
            <div className="error-message" aria-label="Error Message">
              {error}
            </div>
          )}

          {/* Location filter dropdown */}
          <Dropdown aria-label="Location Filter">
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              aria-label="Location Dropdown"
            >
              {selectedLocation}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => setSelectedLocation("All")}
                aria-label="All Location"
              >
                All
              </Dropdown.Item>
              {locations.map((location) => (
                <Dropdown.Item
                  key={location}
                  onClick={() => setSelectedLocation(location)}
                  aria-label={`Location ${location}`}
                >
                  {location}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <br />

          <Row>
            {filteredConnections.length === 0 ? (
              <center>
                <Col>
                  <p
                    className="distribution-title"
                    style={{
                      marginTop: "80px",
                      fontSize: "25px",
                      fontFamily: "verdana",
                      fontWeight: "bold",
                      fontStyle: "italic",
                    }}
                    aria-label="No Connections Available"
                  >
                    No connections available.
                  </p>
                </Col>
              </center>
            ) : (
              filteredConnections.map((connection) => (
                <Col
                  xs={12}
                  sm={6}
                  md={4}
                  key={connection.id}
                  className="grid-item"
                >
                  <Card className="connection-card">
                    {connection.cropsImage && (
                      <Card.Img
                        variant="top"
                        src={`data:image/jpeg;base64,${connection.cropsImage}`}
                        alt={connection.name}
                        className="connection-image"
                        aria-label={`Image of ${connection.name}`}
                      />
                    )}
                    <Card.Body>
                      <Card.Title aria-label={`Title of ${connection.name}`}>
                        {connection.name}
                      </Card.Title>
                      <Card.Text>
                        <center>
                          <strong>Location:</strong> {connection.location}
                        </center>
                      </Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => handleViewInfo(connection)}
                        className="me-2"
                        aria-label={`View Info of ${connection.name}`}
                      >
                        View Info
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(connection.id)}
                        aria-label={`Delete ${connection.name}`}
                      >
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Container>

        {/* View Info Modal */}
        {selectedConnection && (
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedConnection.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
              {selectedConnection.cropsImage && (
                <img
                  src={`data:image/jpeg;base64,${selectedConnection.cropsImage}`}
                  alt={selectedConnection.name}
                  className="modal-image"
                  aria-label={`Modal Image of ${selectedConnection.name}`}
                />
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleCloseModal}
                aria-label="Close Modal"
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </main>
    </div>
  );
}

export default AdminViewConnections;
