import React from 'react';
import { IUserInfo } from 'features/user/interface';
import { Wrapper, Content } from './ProfileCard.styles';
import { AiFillHome } from 'react-icons/ai';
import { ImOffice } from 'react-icons/im';
import { BsFillPhoneFill } from 'react-icons/bs';

type Prop = {
  data: IUserInfo;
};

/**
 * @desc show profile card
 * @param param0
 * @returns
 */
const ProfileCard = ({ data }: Prop) => {
  return (
    <Wrapper>
      <Content>
        <h2>{data.name}</h2>
        <div className="profile">
          <div className="profile__card">
            <div className="title">Email : {data.email}</div>
            <div className="title">
              Phone : {data.contacts.main} <BsFillPhoneFill />
            </div>
            {data.contacts.home && (
              <div className="title">
                <>Home : {data.contacts.home}</>
                <AiFillHome />
              </div>
            )}
            {data.contacts.office && (
              <div className="title">
                Office : {data.contacts.office} <ImOffice />
              </div>
            )}
          </div>
          {data.image && (
            <>
              <div className="img--container">
                <img src={data.image} alt="" className="profile__image" />
              </div>
            </>
          )}
        </div>
      </Content>
    </Wrapper>
  );
};

export default ProfileCard;
