import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Process from './pages/Process';
import Results from './pages/Results';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">
              🚁 Drone Feature Extraction
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/upload">Upload</Nav.Link>
                <Nav.Link as={Link} to="/process">Process</Nav.Link>
                <Nav.Link as={Link} to="/results">Results</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/process" element={<Process />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;

