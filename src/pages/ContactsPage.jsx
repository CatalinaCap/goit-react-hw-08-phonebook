import React, { useEffect } from 'react';
import ContactForm from '../components/ContactForm';
import Filter from '../components/Filter';
import ContactList from '../components/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchContactsThunk,
  addContactThunk,
  deleteContactThunk,
} from '../redux/slices/contactsSlice';
import { setFilter } from '../redux/slices/filterSlice';
import Navigation from '../components/Navigation';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const {
    items: contacts,
    isLoading,
    error,
  } = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  const handleAddContact = (name, phone) => {
    const duplicate = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (duplicate) {
      alert(`${name} is already in your contacts.`);
      return;
    }
    dispatch(addContactThunk({ name, phone }));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContactThunk(id));
  };

  const handleFilterChange = e => {
    dispatch(setFilter(e.target.value));
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div>
      <Navigation />
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ContactList
        contacts={getFilteredContacts()}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default ContactsPage;
