import _ from 'lodash';

import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { formatNumberAsMoney, formatStayDate } from '../../../shared/utils';

const DefaultTab = ({ reservations = [], actions = {} }) => {
  const {
    cancelReservation
  } = actions;

  return (
    <div data-name="reservations-tab">
      <div className="col-lg-12 bg-dark mx-auto">
        <h3>Reservations</h3>
        <div className="container flex-column">
          {reservations.length > 0 ? (
            <table className="table bg-light ">
              <thead>
                <tr>
                  <th scope="col">Room Identifier</th>
                  <th scope="col">Stay Start Date</th>
                  <th scope="col">Stay End Date</th>
                  <th scope="col">Total Charge</th>
                  <th></th>
                  <th scope="col"><Link to="/reservations/new"><Button variant="warning">New</Button></Link></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {_.map(reservations, reservation => (
                  <tr key={reservation?.id}>
                    <td>{reservation?.room_id}</td>
                    <td>{formatStayDate(reservation?.checkin_date)}</td>
                    <td>{formatStayDate(reservation?.checkout_date)}</td>
                    <td>{formatNumberAsMoney(reservation?.total_charge)}</td>
                    <td><Link to={`/reservations/${reservation.id}`}><Button variant="primary">Show</Button></Link></td>
                    <td><Link to={`/reservations/${reservation.id}/edit`}><Button variant="info">Update</Button></Link></td>
                    <td><Button onClick={() => cancelReservation(reservation.id)} variant="danger">Delete</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <div>No reservations exist.</div>}
        </div>
      </div>
    </div>
  );
};

export { DefaultTab };
