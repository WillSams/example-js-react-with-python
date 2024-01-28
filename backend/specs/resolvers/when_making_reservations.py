import pytest
from api.resolvers.mutations import create_reservation_resolver
from api.utils import convert_to_local_date_from_str

from . import MOCK_EXECUTION_CONTEXT


class testDescribeCreateReservationsResolver:
    @pytest.mark.asyncio
    async def should_create_reservation_successfully(self, mocker):
        input_data = {
            "room_id": "room_1",
            "checkin_date": "2023-01-10",
            "checkout_date": "2023-01-15",
        }

        mock_room = mocker.AsyncMock(daily_rate=100)
        mock_reservation = mocker.AsyncMock(
            id=1,
            room_id="room_1",
            checkin_date=convert_to_local_date_from_str(input_data["checkin_date"]),
            checkout_date=convert_to_local_date_from_str(input_data["checkout_date"]),
            total_charge=500,
        )

        mocker.patch("api.DbSession", mocker.AsyncMock(return_value=mocker.AsyncMock()))
        mocker.patch("api.resolvers.data.fetch_room", return_value=mock_room)
        mocker.patch(
            "api.resolvers.data.is_room_available", return_value={"success": True}
        )
        mocker.patch("api.models.Reservation.create", return_value=mock_reservation)
        mocker.patch("api.helpers.check_date_validity", return_value=None)

        result = await create_reservation_resolver(
            None, MOCK_EXECUTION_CONTEXT, input_data
        )

        assert result["success"] is True
        assert "reservation" in result
        assert result["reservation"].id == mock_reservation.id

    @pytest.mark.asyncio
    async def should_create_reservation_room_not_available(self, mocker):
        input_data = {
            "room_id": "room_1",
            "checkin_date": "2023-01-10",
            "checkout_date": "2023-01-15",
        }

        mocker.patch("api.DbSession", mocker.AsyncMock(return_value=mocker.AsyncMock()))
        mocker.patch("api.resolvers.data.fetch_room", return_value=mocker.AsyncMock())
        mocker.patch(
            "api.resolvers.data.is_room_available",
            return_value={"success": False, "errors": ["Room not available"]},
        )
        mocker.patch("api.helpers.check_date_validity", return_value=None)

        result = await create_reservation_resolver(
            None, MOCK_EXECUTION_CONTEXT, input_data
        )

        assert result["success"] is False
        assert "errors" in result
        assert "Room not available" in result["errors"]
