import React, { useState } from 'react';
import { Wrapper, Content } from './CollapsableCard.styles';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { MdFavorite, MdFavoriteBorder, MdDelete, MdModeEdit, MdAdd } from 'react-icons/md';
import { AiFillHome } from 'react-icons/ai';
import { ImOffice } from 'react-icons/im';
import { BsFillPhoneFill } from 'react-icons/bs';
import { IData } from '../Cards/interface';
import {
  toggleContactIsUpdating,
  resetController,
  toggleContactForm,
  setUpdateFormData,
} from '../../features/controllers/controllerSlice';
import { AppDispatch } from 'store/store';
import { useDispatch } from 'react-redux';
import { deleteContact, setFavourite, unsetFavourite } from 'features/contact/contactSlice';
import { addToContact } from 'features/user/userSlice';
import { toast } from 'react-toastify';

type AppProps = {
  data: IData;
  page: 'HOME' | 'USER';
  action: 'CONTACT' | 'FAVOURITE' | 'USER';
};
/**
 * @desc Card state makes card expandable, Is resusable by UserList and Home(for favourite as well as contact)
 * @returns
 */
const CollapsableCard = ({ data, page, action }: AppProps) => {
  const [cardState, setCardState] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  // Handle Update action for contacts
  const handleUpdate = (data: IData) => {
    dispatch(resetController());
    dispatch(toggleContactIsUpdating());
    dispatch(toggleContactForm());
    dispatch(setUpdateFormData(data));
    setCardState(true);
  };

  // Handle delete action for contacts
  const handleDelete = (deleteId: number | undefined) => {
    if (deleteId) {
      dispatch(deleteContact(deleteId));
      toast.warning('User Deleted');
    }
  };

  // Toggle Favourite Contacts
  const handleFavouriteToggle = (data: IData) => {
    if (!data.contact_id) return;
    if (!data.isFavourite) {
      dispatch(setFavourite(data.contact_id));
      toast.success('Added to favourite');
    } else {
      dispatch(unsetFavourite(data.contact_id));
      toast.warning('Removed From favourite');
    }
  };

  // Add from shareable users to your contact
  const handleAddToContact = (data: IData) => {
    if (!data.user_info_id) return;
    dispatch(addToContact(data.user_info_id));
    toast.warning('Added user to Contact');
  };

  return (
    <Wrapper>
      <Content>
        {cardState && (
          <div className="card__closed">
            <div className="item capitalize">{data.name}</div>
            <div className="item">{data.email}</div>
            <div className="item">
              {data.contacts.main} <BsFillPhoneFill />
            </div>
            {page === 'HOME' ? (
              <div className="icon" onClick={() => handleFavouriteToggle(data)}>
                {data.isFavourite ? (
                  <i className="heart">
                    <MdFavorite size={18} />
                  </i>
                ) : (
                  <MdFavoriteBorder size={18} />
                )}
              </div>
            ) : (
              // Add to contact
              <div className="icon" onClick={() => handleAddToContact(data)}>
                <MdAdd size={18} />
              </div>
            )}
            <div className="icon" onClick={() => setCardState(false)}>
              <AiOutlineDown size={16} />
            </div>
          </div>
        )}
        {!cardState && (
          <div className="card__open">
            <div className="card__info">
              <div className="item capitalize">Name:{data.name}</div>
              <div className="item">Email: {data.email}</div>
            </div>
            <div className="card__contacts">
              <div className="intro">Contacts</div>
              <div className="contacts__choice">
                {data.contacts.main ? (
                  <div className="item">
                    <BsFillPhoneFill /> {data.contacts.main}
                  </div>
                ) : (
                  ''
                )}
                {data.contacts.home ? (
                  <div className="item">
                    <AiFillHome /> {data.contacts.home}
                  </div>
                ) : (
                  ''
                )}
                {data.contacts.office ? (
                  <div className="item">
                    <ImOffice /> {data.contacts.office}
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="img--container">
              {data.image ? <img src={data.image} alt="" className="card__image" /> : ''}
            </div>
            <div className="card__right">
              <div className="icon__up">
                {page === 'HOME' ? (
                  <div className="icon" onClick={() => handleFavouriteToggle(data)}>
                    {data.isFavourite ? (
                      <i className="heart">
                        <MdFavorite size={18} />{' '}
                      </i>
                    ) : (
                      <MdFavoriteBorder size={18} />
                    )}
                  </div>
                ) : (
                  // Add to Contact
                  <div className="icon" onClick={() => handleAddToContact(data)}>
                    <MdAdd size={18} />
                  </div>
                )}
                <div className="icon" onClick={() => setCardState(true)}>
                  <AiOutlineUp size={16} />
                </div>
              </div>
              {page === 'HOME' && action === 'CONTACT' && (
                <div className="icon__down">
                  <div className="icon" onClick={() => handleUpdate(data)}>
                    <MdModeEdit size={16} />
                  </div>
                  <div className="icon" onClick={() => handleDelete(data.contact_id)}>
                    <MdDelete size={16} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Content>
    </Wrapper>
  );
};

export default CollapsableCard;
