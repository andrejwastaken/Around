import React, { useState } from "react";
import { Button, Alert, Card, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        setError('');
        try {
            await logout();
            navigate('/login');
        } catch {
            setError('Failed to log out');
        }
    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Row className="w-100">
                <Col md={8} lg={6} className="mx-auto">
                    <Card className="shadow-sm border-0">
                        <Card.Body className="p-5">
                            <h2 className="text-center mb-4 fw-bold">Email:</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <p className="text-muted text-center fs-3">{currentUser.email}</p>
                            <div className="d-grid gap-2 mt-8">
                                <Link to="/update-profile" className="btn btn-primary mb-4">Update Profile</Link>
                                <Button variant="secondary" onClick={() => navigate('/')}>Go Home</Button>
                                <Button variant="link" onClick={handleLogout} className="text-danger">Logout</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
