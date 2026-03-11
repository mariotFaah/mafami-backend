import express from 'express';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

// Mock database
const adherants = [
  {
    id:"mft-001",
    nom: 'John',
    prenoms: 'Doe',
    email: 'johndoe@example.com',

  },
  {
    id:"mft-002",
    nom: 'Test',
    prenoms: 'Doe',
    email: 'testdoe@example.com',
  },
];

router.post('/', (req, res) => {
    const adherant = req.body;

    users.push({ ...adherant, id: uuidv4() });

    res.send(`${adherant.nom} has been added to the Database`);
})

// Getting the list of users from the mock database
router.get('/', (req, res) => {
    res.send(adherants);
})

export default router