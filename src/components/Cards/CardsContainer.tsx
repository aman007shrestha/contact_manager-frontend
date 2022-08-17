import React from 'react';
import CollapsableCard from '../Card/CollapsableCard';
import { Wrapper, Content } from './CardsContainer.styles';
import { IData } from './interface';

type AppProps = {
  data: IData[];
  page: 'HOME' | 'USER';
  action: 'CONTACT' | 'FAVOURITE' | 'USER';
};
/**
 * @desc collection of cards, Filters data for favourite account
 * @returns
 */
const CardsContainer = ({ data, page, action }: AppProps) => {
  if (action === 'FAVOURITE') {
    data = data.filter(datum => datum.isFavourite === true);
  }
  return (
    <Wrapper>
      <Content>
        {data.map(datum => (
          <CollapsableCard data={datum} page={page} action={action} key={datum.contact_id} />
        ))}
      </Content>
    </Wrapper>
  );
};

export default CardsContainer;
