import pytest
from api.resolvers.queries import get_all_reservations_resolver

from . import MOCK_EXECUTION_CONTEXT


class DescribeAllReservationsResolver:
    @pytest.mark.asyncio
    async def should_return_all_reservations(self, mocker):
        reservations = [
            {
                "id": 1,
                "room_id": "room_1",
                "checkin_date": "2023-01-01",
                "checkout_date": "2023-01-03",
            },
            {
                "id": 2,
                "room_id": "room_2",
                "checkin_date": "2023-01-05",
                "checkout_date": "2023-01-07",
            },
        ]

        mock_queryset = mocker.AsyncMock()
        mock_queryset.values = mocker.AsyncMock(return_value=reservations)

        mocker.patch("api.models.Reservation.all", return_value=mock_queryset)
        mocker.patch(
            "api.DbSession",
            mocker.AsyncMock(return_value=mocker.AsyncMock()),
        )

        result = await get_all_reservations_resolver(None, MOCK_EXECUTION_CONTEXT)

        assert "reservations" in result
        assert len(result["reservations"]) == 2
        assert result["reservations"] == reservations
