import express from 'express';
import mysql from '../config/mysql.js';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();

// Configuration de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configuration de Multer avec Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'evenements', // Dossier dans Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'], // Formats autorisés
  },
});

const upload = multer({ storage });

// Ajouter un événement
router.post('/create', upload.single('image'), async (req, res) => {
  const { nom, date, lieu, prix, description } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const connection = await mysql.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO evenements (nom, date, lieu, prix, description, image) VALUES (?, ?, ?, ?, ?, ?)',
      [nom, date, lieu, prix, description, image]
    );
    connection.release();
    res.status(201).json({ message: 'Événement ajouté avec succès', id: result.insertId });
  } catch (err) {
    console.error('Erreur lors de l\'ajout de l\'événement :', err);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// Récupérer tous les événements
router.get('/', async (req, res) => {
  try {
    const connection = await mysql.getConnection();
    const [rows] = await connection.execute('SELECT * FROM evenements');
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error('Erreur lors de la récupération des événements :', err);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// Modifier un événement
router.put('/update/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { nom, date, lieu, prix, description } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const connection = await mysql.getConnection();
    await connection.execute(
      'UPDATE evenements SET nom=?, date=?, lieu=?, prix=?, description=?, image=? WHERE id=?',
      [nom, date, lieu, prix, description, image, id]
    );
    connection.release();
    res.json({ message: 'Événement modifié avec succès', id });
  } catch (err) {
    console.error('Erreur lors de la modification de l\'événement :', err);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// Supprimer un événement
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await mysql.getConnection();
    await connection.execute('DELETE FROM evenements WHERE id=?', [id]);
    connection.release();
    res.json({ message: 'Événement supprimé avec succès' });
  } catch (err) {
    console.error('Erreur lors de la suppression de l\'événement :', err);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

export default router;