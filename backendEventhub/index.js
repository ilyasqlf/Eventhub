import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import authRoute from './routes/authRoutes.js'; // Importer le fichier authRoute.js
import bodyParser from 'body-parser';
import eventRoutes from './Routes/eventRoutes.js'; // Importer le fichier eventRoutes.js


const app = express();
const PORT = process.env.PORT || 8888;

app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000', // Autoriser les requêtes depuis localhost:3000
  optionsSuccessStatus: 200
}));

app.use(bodyParser.json());

app.use(express.json());

app.use('/evenements', eventRoutes); 
app.use('/', userRoutes);
app.use('/auth', authRoute); // Utiliser les routes d'authentification



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erreur interne du serveur');
});

app.listen(PORT, () => 
  {console.log(`Server is running on port ${PORT}`);});