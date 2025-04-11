import jwt from 'jsonwebtoken';
import mysql from '../config/mysql.js';

export const adminAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const connection = await mysql.getConnection();
    const [rows] = await connection.execute('SELECT role FROM utilisateurs WHERE id = ?', [decoded.id]);
    connection.release();

    if (rows.length === 0 || rows[0].role !== 'admin') {
      return res.status(403).json({ message: 'Accès réservé aux administrateurs' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalide' });
  }
};