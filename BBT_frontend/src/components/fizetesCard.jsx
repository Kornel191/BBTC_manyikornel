import { Card, Button } from 'react-bootstrap'
import '../style/FizetesCard.css'

function FizetesCard({ befiz, onEdit, onDelete }) {
    return (
        <Card className="FizetesCard">
            <Card.Body>
                <Card.Text>
                    <strong>Dátum:</strong> {befiz.datum} <br />
                    <strong>Összeg:</strong> {befiz.osszeg} Ft
                </Card.Text>
                <div className="d-flex gap-2">
                    <Button variant="primary" size="sm" onClick={onEdit}>Szerkesztés</Button>
                    <Button variant="danger" size="sm" onClick={onDelete}>Törlés</Button>
                </div>
            </Card.Body>
        </Card>
    )
}
export default FizetesCard;