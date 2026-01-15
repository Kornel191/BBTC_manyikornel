import { Card, Button } from 'react-bootstrap'
import '../style/UgyfelCard.css'

function UgyfelCard({ ugyfel, onEdit, onShowPayments, onAddPayment }) {
    return (
        <Card className="UgyfelCard">
            <Card.Body>
                <Card.Title className="card-title">{ugyfel.nev}</Card.Title>
                <Card.Text className="card-text">
                    <strong>Születési év:</strong> {ugyfel.szulev} <br />
                    <strong>Irányítószám:</strong> {ugyfel.irszam} <br />
                    <strong>Ország:</strong> {ugyfel.orsz}
                </Card.Text>
                <div className="d-flex flex-wrap gap-2">
                    <Button variant="primary" onClick={onEdit}>Módosítás</Button>
                    <Button variant="info" onClick={onShowPayments}>Befizetések</Button>
                    <Button variant="success" onClick={onAddPayment}>Új befizetés</Button>
                </div>
            </Card.Body>
        </Card>
    )
}
export default UgyfelCard;