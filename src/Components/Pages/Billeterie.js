import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Billeterie.css';
import axios from '../../Api/config'; // Import d'axios pour les requêtes API

const Billeterie = () => {
  const [events, setEvents] = useState([]); // État pour les événements dynamiques
  const navigate = useNavigate();

  const staticEvents = [
    { id: 1, title: 'Festival Electro', date: '31 Mars 2025', location: 'Lyon', image: 'path/to/concert.jpg' },
    { id: 2, title: 'Pièce Classique', date: '28 Mars 2025', location: 'Paris', image: 'path/to/theatre.jpg' },
    { id: 3, title: 'Match de Football', date: '30 Mars 2025', location: 'Marseille', image: 'path/to/sports.jpg' },
    { id: 4, title: 'LAN Party', date: '1 Avril 2025', location: 'Lille', image: 'path/to/gaming.jpg' },
  ];

  // Récupérer les événements dynamiques
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/evenements'); // Requête API pour récupérer les événements
        setEvents(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des événements :', error);
      }
    };

    fetchEvents();
  }, []);

  const handleBuyClick = (event) => {
    navigate('/payment', { state: { selectedEvent: event } }); // Redirection vers la page de paiement avec l'événement sélectionné
  };

  return (
    <div className="billeterie-container">
      <h1>Billetterie</h1>

      {/* Événements statiques */}
      <section className="static-events">
        <h2>Événements en vedette</h2>
        <div className="events-grid">
  {events.map((event) => (
    <div key={event.id} className="event-card">
      <img src={event.image} alt={event.nom} /> {/* Utilisation du champ `image` */}
      <h3>{event.nom}</h3>
      <p>Date: {event.date}</p>
      <p>Lieu: {event.lieu}</p>
      <p>Prix: {event.prix}€</p>
      <button onClick={() => navigate(`/event/${event.id}`)}>Voir détails</button>
    </div>
  ))}
</div>
      </section>

      {/* Événements dynamiques */}
      <section className="dynamic-events">
        <h2>Événements à venir</h2>
        <div className="events-grid">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <img src={event.image} alt={event.nom} className="event-image" />
              <h3>{event.nom}</h3>
              <p>{event.date}</p>
              <p>{event.lieu}</p>
              <p>{event.prix}€</p>
              <button className="buy-button" onClick={() => handleBuyClick(event)}>
                Acheter
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Billeterie;