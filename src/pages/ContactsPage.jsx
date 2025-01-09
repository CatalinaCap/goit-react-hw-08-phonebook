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
import { Box, Heading, Text, VStack, HStack, Spinner } from '@chakra-ui/react';

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

  //   return (
  //     <div>
  //       <Navigation />
  //       <h1>Phonebook</h1>
  //       <ContactForm onAddContact={handleAddContact} />
  //       <h2>Contacts</h2>
  //       <Filter value={filter} onChange={handleFilterChange} />
  //       {isLoading && <p>Loading...</p>}
  //       {error && <p>Error: {error}</p>}
  //       <ContactList
  //         contacts={getFilteredContacts()}
  //         onDeleteContact={handleDeleteContact}
  //       />
  //     </div>
  //   );
  // };
  return (
    <Box
      maxW="600px"
      mx="auto"
      mt="8"
      p="6"
      boxShadow="lg"
      borderRadius="md"
      bg="white"
    >
      <Navigation />
      <Heading as="h1" size="xl" mb="4" textAlign="center">
        Phonebook
      </Heading>
      <VStack spacing="6">
        <ContactForm onAddContact={handleAddContact} />
        <Heading as="h2" size="lg" mb="2">
          Contacts
        </Heading>
        <Filter value={filter} onChange={handleFilterChange} />
        {isLoading && (
          <HStack justifyContent="center">
            <Spinner size="lg" />
            <Text>Loading...</Text>
          </HStack>
        )}
        {error && (
          <Text color="red.500" textAlign="center">
            Error: {error}
          </Text>
        )}
        <ContactList
          contacts={getFilteredContacts()}
          onDeleteContact={handleDeleteContact}
        />
      </VStack>
    </Box>
  );
};
export default ContactsPage;
