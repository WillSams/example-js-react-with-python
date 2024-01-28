import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { mountWithRouter } from '../../reactTestHelpers';
import NewReservationComponent from '../../../src/components/reservations/new';

Enzyme.configure({ adapter: new Adapter() });

describe('NewReservationComponent', () => {
  const reservations = ['reservation1', 'reservation2', 'reservation3', 'reservation4', 'reservation5'];

  reservations.forEach((reservation) => {
    it(`should render component with reservation id '${reservation}'`, () => {
      const initialEntries = [`/reservations/${reservation}`];
      const initialState = {
        site: {
          newReservations: {
            roomIds: ['room1', 'room2', 'room3'],
          },
        },
      };
      const wrapper = mountWithRouter(
        <Routes>
          <Route
            exact
            path={'/reservations/:id'}
            element={<NewReservationComponent />}
          />
        </Routes>,
        initialEntries,
        initialState,
      );

      expect(wrapper.find('div[data-name="new-reservation-component"]').length).toEqual(1);
    });
  });
});
