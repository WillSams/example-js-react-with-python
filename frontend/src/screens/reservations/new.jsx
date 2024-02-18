import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { connectComponent, actionTypes } from '@/shared/base';
import AlertModal from '@/shared/components/AlertModal';

const NewReservationComponent = ({
  createReservation = (_formData) => {},
  handleCloseAlert = () => {},
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    room_id: '',
    checkin_date: '',
    checkout_date: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createReservation(formData);
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const roomIds = useSelector((state) => state?.site?.newReservations?.roomIds);
  const alert = {
    message: useSelector((state) => state?.shared?.alertMessage),
    type: useSelector((state) => state?.shared?.alertType),
  };

  return (
    <div className="col-lg-12">
      <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark">
        <div className="col-lg-12 px-0">
          <h1 className="display-4 font-italic">NEW RESERVATION</h1>
        </div>
      </div>
      <div data-name="new-reservation-component">
        <div className="col-lg-12 bg-light full-area-content">
          <h2>Create a New Reservation</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="room_id">Room ID</label>
                  </td>
                  <td>
                    <select
                      id="room_id"
                      name="room_id"
                      value={formData.room_id}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a Room ID</option>
                      {roomIds.map((roomId) => (
                        <option key={roomId} value={roomId}>
                          {roomId}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="checkin_date">Check-in Date</label>
                  </td>
                  <td>
                    <input
                      type="date"
                      id="checkin_date"
                      name="checkin_date"
                      value={formData.checkin_date}
                      onChange={handleInputChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="checkout_date">Check-out Date</label>
                  </td>
                  <td>
                    <input
                      type="date"
                      id="checkout_date"
                      name="checkout_date"
                      value={formData.checkout_date}
                      onChange={handleInputChange}
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="submit">Create Reservation</button>
          </form>
        </div>
      </div>
      {alert.message && (
        <AlertModal
          type={alert.type}
          message={alert.message}
          onClose={handleCloseAlert}
        />
      )}
    </div>
  );
};

const screen = connectComponent(NewReservationComponent, {
  componentName: actionTypes.NEW_RESERVATION_COMPONENT,
  state: (state) => state?.site?.newReservations?.roomIds,
  load: {
    roomIds: () => ({ type: actionTypes.GET_ROOM_IDS }),
  },
  dispatch: (dispatch) => ({
    createReservation: (formData) =>
      dispatch({ type: actionTypes.CREATE_RESERVATION, ...formData }),

    handleCloseAlert: () => dispatch({ type: actionTypes.CLEAR_ALERT }),
  }),
});

export default screen;
