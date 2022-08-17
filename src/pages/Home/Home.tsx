import React, { useEffect } from 'react';
import CardsContainer from 'components/Cards/CardsContainer';
import Spinner from '../../components/Spinner';
import ContactForm from 'components/ContactForm/ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from 'store/store';
import { RootState } from 'store/store';
import { getContacts, reset, getFavourites } from 'features/contact/contactSlice';
import { Wrapper, FavSection } from './Home.styles';
import {
  toggleContactForm,
  toggleContactIsAdding,
  resetController,
  toggleContactIsUpdating,
} from 'features/controllers/controllerSlice';

/**
 * @desc Home Page has Favourite Account Section, Contact Section and Add Contact Button expanding to Form
 * @returns
 */
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { showContactForm, contactUpdateIsActive } = useSelector((state: RootState) => state.controller);
  const { contacts, isLoading, isError, message } = useSelector((state: RootState) => state.contact);

  // Show form, dispatch type of action being performed
  const handleShowForm = () => {
    if (!contactUpdateIsActive) {
      dispatch(toggleContactIsAdding());
    } else {
      dispatch(toggleContactIsUpdating());
    }
    dispatch(toggleContactForm());
  };

  // Run on each render
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (isError) {
      console.log(message);
    }
    dispatch(getContacts());
    dispatch(getFavourites());
    return () => {
      dispatch(reset());
      dispatch(resetController());
    };
  }, [user, navigate, isError, message, dispatch]);

  // Render spinner if loading to true
  if (isLoading) {
    return <Spinner />;
  }
  // Render Button, Form(Add/Update), Favourite Contact, My Contacts
  return (
    <Wrapper>
      <div>
        <button className="btn contact__add" onClick={handleShowForm}>
          {showContactForm ? <>close Form</> : <>Add Contact</>}
        </button>

        {showContactForm && <ContactForm />}
        <FavSection>
          {contacts.length > 0 && <h2>Favourite</h2>}
          <CardsContainer data={contacts} page={'HOME'} action="FAVOURITE" />
        </FavSection>
      </div>

      {contacts.length > 0 ? (
        <div>
          <h2>Contacts</h2>
          <CardsContainer data={contacts} page={'HOME'} action="CONTACT" />
        </div>
      ) : (
        <h2>No Contacts Saved For You. Add Contacts</h2>
      )}
    </Wrapper>
  );
};

export default Home;
