export const getExistingReservations = `
  query { getAllReservations { reservations { id room_id checkin_date checkout_date total_charge  } } }
`;

export const getRoomIds = 'query { getAllRooms { rooms { id } } }';
