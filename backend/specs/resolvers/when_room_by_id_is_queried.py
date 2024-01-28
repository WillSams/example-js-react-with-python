import pytest
from api.resolvers.queries import get_reservation_resolver
from api.utils import convert_to_local_date_from_str

from . import MOCK_EXECUTION_CONTEXT


class DescribeGetReservationResolver:
    @pytest.mark.asyncio
    async def should_return_reservation_when_queried_by_id(self, mocker):
        mock_reservation_data = {
            "id": 1,
            "room_id": "room_1",
            "checkin_date": convert_to_local_date_from_str("2099-01-21"),
            "checkout_date": convert_to_local_date_from_str("2099-01-23"),
            "total_charge": 500,
        }

        mocker.patch(
            "api.models.Reservation.get_or_none",
            mocker.AsyncMock(return_value=mock_reservation_data),
        )
        mocker.patch(
            "api.DbSession",
            mocker.AsyncMock(return_value=mocker.AsyncMock()),
        )

        result = await get_reservation_resolver(None, MOCK_EXECUTION_CONTEXT, 1)

        assert "reservation" in result
        assert result["reservation"] == mock_reservation_data
