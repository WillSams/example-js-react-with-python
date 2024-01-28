export const createReservation = `
  mutation createReservation($input: ReservationInput!) {
    createReservation(input: $input) {
      success
      errors
      reservation {
        id
        room_id
        checkin_date
        checkout_date
        total_charge
      }
    }
  }`;

export const deleteReservation = `
  mutation deleteReservation($reservationId: Int!) {
    deleteReservation(reservationId: $reservationId) {
      success
      errors
    }
  }`;
