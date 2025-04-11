import React, { useState, useEffect } from 'react';
import { eventAPI } from '../Api/config'; // Import des fonctions API
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    nom: '',
    date: '',
    lieu: '',
    prix: '',
    description: '',
    image: null,
  });

  const fetchEvents = async () => {
    try {
      const response = await eventAPI.getAllEvents();
      setEvents(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des événements :', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      try {
        await eventAPI.deleteEvent(id); // Appel à l'API pour supprimer l'événement
        alert('Événement supprimé avec succès');
        fetchEvents(); // Rafraîchit la liste des événements
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'événement :', error);
        alert('Une erreur est survenue lors de la suppression de l\'événement.');
      }
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('nom', formData.nom);
    formDataToSend.append('date', formData.date);
    formDataToSend.append('lieu', formData.lieu);
    formDataToSend.append('prix', formData.prix);
    formDataToSend.append('description', formData.description);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }
  
    try {
      const response = await eventAPI.createEvent(formDataToSend);
      alert(response.data.message); // Affiche le message de succès
      fetchEvents(); // Rafraîchit la liste des événements
      setFormData({ nom: '', date: '', lieu: '', prix: '', description: '', image: null }); // Réinitialise le formulaire
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'événement :', error);
      alert('Une erreur est survenue lors de l\'ajout de l\'événement.');
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Gestion des événements</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <input type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="text" name="lieu" value={formData.lieu} onChange={handleChange} placeholder="Lieu" required />
        <input type="number" name="prix" value={formData.prix} onChange={handleChange} placeholder="Prix" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required></textarea>
        <input type="file" name="image" onChange={handleFileChange} accept="image/*" required />
        <button type="submit">Ajouter</button>
      </form>

      <h2>Liste des événements</h2>
      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-image-container">
              <img src={event.image} alt={event.nom} className="event-thumbnail" />
              <div className="event-date">{event.date}</div>
            </div>
            <div className="event-info">
              <h3>{event.nom}</h3>
              <p className="event-location">📍 {event.lieu}</p>
              <p className="event-price">💰 {event.prix}€</p>
              <button className="delete-button" onClick={() => handleDelete(event.id)}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;