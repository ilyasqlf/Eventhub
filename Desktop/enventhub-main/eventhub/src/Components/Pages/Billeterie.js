import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Billeterie.css';

// Images d'exemple - À associer dynamiquement selon le type
import concertImg from '../../assets/concert.jpg';
import theatreImg from '../../assets/theatre.jpg';
import sportsImg from '../../assets/sports.jpg';
import gamingImg from '../../assets/gaming.jpg';

const Billeterie = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedEvent = location.state?.selectedEvent;

  const [weeklyEvents, setWeeklyEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // 🔁 Récupération des événements depuis l'API
  useEffect(() => {
    axios.get('http://localhost:8000/api/evenements/all')
      .then(res => {
        const eventsWithImages = res.data.map(event => {
          // Associer une image selon le type
          let image = concertImg;
          if (event.type === 'Spectacle') image = theatreImg;
          else if (event.type === 'Sport') image = sportsImg;
          else if (event.type === 'Jeux Vidéo') image = gamingImg;

          return {
            ...event,
            title: event.nom,
            location: event.lieu,
            image,
            price: event.prix ? `${event.prix}€` : 'Gratuit'
          };
        });

        setWeeklyEvents(eventsWithImages);
      })
      .catch(err => {
        console.error('❌ Erreur lors du chargement des événements :', err);
      });
  }, []);

  const categories = [
    { name: 'Catégorie 1', price: '50€' },
    { name: 'Catégorie 2', price: '70€' },
    { name: 'Catégorie 3', price: '100€' },
  ];

  const handleBuyClick = (event) => {
    setSelectedCategory(null);
    setShowModal(true);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handlePayClick = () => {
    navigate('/payment', { state: { selectedCategory, selectedEvent } });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="billeterie-container">
      <h1>Billetterie</h1>
      <section className="weekly-events">
        <h2>Les événements de la semaine</h2>
        <div className="events-grid">
          {weeklyEvents.map((event) => (
            <div key={event.id} className={`event-card ${selectedEvent && selectedEvent.id === event.id ? 'selected' : ''}`}>
              <div className="event-image-container">
                <img src={event.image} alt={event.title} />
                <div className="event-date">{event.date}</div>
              </div>
              <div className="event-info">
                <h3>{event.title}</h3>
                <p className="event-location">📍 {event.location}</p>
                <p className="event-price">💰 {event.price}</p>
                <button className="buy-button" onClick={() => handleBuyClick(event)}>Acheter</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>X</button>
            <h2>Choisissez une catégorie</h2>
            <div className="categories">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className={`category ${selectedCategory === category ? 'selected' : ''}`}
                  onClick={() => handleCategorySelect(category)}
                >
                  <h3>{category.name}</h3>
                  <p>{category.price}</p>
                </div>
              ))}
            </div>
            <button className="pay-button" onClick={handlePayClick} disabled={!selectedCategory}>Payer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billeterie;