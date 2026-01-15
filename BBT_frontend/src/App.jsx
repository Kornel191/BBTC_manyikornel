import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import UgyfelCard from './components/ugyfelCard';
import BefizCard from './components/fizetesCard';
import api from './api.jsx';
import './style/App.css';

function App() {
  const [tagok, setTagok] = useState([])

  const [showEditUserModal, setShowEditUserModal] = useState(false)
  const [selectedUgyfel, setSelectedUgyfel] = useState(null)


  const [showPaymentsModal, setShowPaymentsModal] = useState(false)
  const [selectedUgyfelPayments, setSelectedUgyfelPayments] = useState([])
  const [selectedUgyfelName, setSelectedUgyfelName] = useState("")
  const [selectedUgyfelId, setSelectedUgyfelId] = useState(null)


  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false)
  const [newPayment, setNewPayment] = useState({ datum: "", osszeg: "" })


  const [showEditPaymentModal, setShowEditPaymentModal] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)


  const loadTagok = async () => {
    try {
      const res = await api.get("/users")
      setTagok(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    loadTagok()
  }, [])

  const handleEditUser = (ugyfel) => {
    setSelectedUgyfel(ugyfel)
    setShowEditUserModal(true)
  }

  const handleSaveUser = async () => {
    try {
      await api.put(`/modifyUser/${selectedUgyfel.id}`, selectedUgyfel)
      setShowEditUserModal(false)
      loadTagok()
    } catch (err) {
      console.error(err)
    }
  }


  const handleShowPayments = async (ugyfel) => {
    setSelectedUgyfelName(ugyfel.nev)
    setSelectedUgyfelId(ugyfel.id)

    try {
      const res = await api.get(`/customerBefiz/${ugyfel.id}`)
      setSelectedUgyfelPayments(res.data)
      setShowPaymentsModal(true)
    } catch (err) {
      console.error(err)
    }
  }


  const handleAddPayment = (ugyfel) => {
    setSelectedUgyfelId(ugyfel.id)
    setNewPayment({ datum: "", osszeg: "" })
    setShowAddPaymentModal(true)
  }

  const saveNewPayment = async () => {
    try {
      await api.post("/newBefiz", { ...newPayment, ugyfel_azon: selectedUgyfelId })
      setShowAddPaymentModal(false)
      handleShowPayments({ id: selectedUgyfelId, nev: selectedUgyfelName })
    } catch (err) {
      console.error(err)
    }
  }


  const handleEditPayment = (befiz) => {
    setSelectedPayment(befiz)
    setShowEditPaymentModal(true)
  }

  const saveEditedPayment = async () => {
    try {
      await api.put(`/modifyBefiz/${selectedPayment.id}`, selectedPayment)
      setShowEditPaymentModal(false)
      handleShowPayments({ id: selectedUgyfelId, nev: selectedUgyfelName })
    } catch (err) {
      console.error(err)
    }
  }

  const deletePayment = async (id) => {
    if (!window.confirm("Biztos törlöd a befizést?")) return
    try {
      await api.delete(`/deleteBefiz/${id}`)
      setSelectedUgyfelPayments(selectedUgyfelPayments.filter(b => b.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container className="mt-4">
      <h2>BBTC Ügyfelek</h2>

      <Row className="mt-4" xs={1} sm={2} md={3} lg={4}>
        {tagok.map(u => (
          <Col key={u.id} className="mb-4">
            <UgyfelCard
              ugyfel={u}
              onEdit={() => handleEditUser(u)}
              onShowPayments={() => handleShowPayments(u)}
              onAddPayment={() => handleAddPayment(u)}
            />
          </Col>
        ))}
      </Row>


      <Modal show={showEditUserModal} onHide={() => setShowEditUserModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ügyfél módosítása</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUgyfel && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Név</Form.Label>
                <Form.Control
                  value={selectedUgyfel.nev}
                  onChange={(e) => setSelectedUgyfel({ ...selectedUgyfel, nev: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Születési év</Form.Label>
                <Form.Control
                  value={selectedUgyfel.szulev}
                  onChange={(e) => setSelectedUgyfel({ ...selectedUgyfel, szulev: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Irányítószám</Form.Label>
                <Form.Control
                  value={selectedUgyfel.irszam}
                  onChange={(e) => setSelectedUgyfel({ ...selectedUgyfel, irszam: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Ország</Form.Label>
                <Form.Control
                  value={selectedUgyfel.orsz}
                  onChange={(e) => setSelectedUgyfel({ ...selectedUgyfel, orsz: e.target.value })}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditUserModal(false)}>Mégse</Button>
          <Button variant="primary" onClick={handleSaveUser}>Mentés</Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showPaymentsModal} onHide={() => setShowPaymentsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Befizetések – {selectedUgyfelName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUgyfelPayments.length === 0 ? (
            <p>Nincs befizetés ehhez az ügyfélhez.</p>
          ) : (
            selectedUgyfelPayments.map(b => (
              <BefizCard
                key={b.id}
                befiz={b}
                onEdit={() => handleEditPayment(b)}
                onDelete={() => deletePayment(b.id)}
              />
            ))
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPaymentsModal(false)}>Bezárás</Button>
          <Button variant="success" onClick={() => { setShowPaymentsModal(false); handleAddPayment({ id: selectedUgyfelId, nev: selectedUgyfelName }) }}>Új befizetés</Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showAddPaymentModal} onHide={() => setShowAddPaymentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Új befizetés hozzáadása</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Dátum</Form.Label>
              <Form.Control
                type="date"
                value={newPayment.datum}
                onChange={(e) => setNewPayment({ ...newPayment, datum: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Összeg</Form.Label>
              <Form.Control
                type="number"
                value={newPayment.osszeg}
                onChange={(e) => setNewPayment({ ...newPayment, osszeg: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddPaymentModal(false)}>Mégse</Button>
          <Button variant="success" onClick={saveNewPayment}>Hozzáadás</Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showEditPaymentModal} onHide={() => setShowEditPaymentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Befizetés szerkesztése</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayment && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Dátum</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedPayment.datum}
                  onChange={(e) => setSelectedPayment({ ...selectedPayment, datum: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Összeg</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedPayment.osszeg}
                  onChange={(e) => setSelectedPayment({ ...selectedPayment, osszeg: e.target.value })}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditPaymentModal(false)}>Mégse</Button>
          <Button variant="primary" onClick={saveEditedPayment}>Mentés</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default App
