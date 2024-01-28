import pytest
from api.resolvers.mutations import delete_reservation_resolver

from . import MOCK_EXECUTION_CONTEXT


class DescribeDeleteReservationResolver:
    @pytest.mark.asyncio
    async def should_give_reservation_not_found(self, mocker):
        mocker.patch(
            "api.models.Reservation.delete",
            return_value=mocker.AsyncMock(return_value=None),
        )

        mocker.patch(
            "api.resolvers.queries.DbSession",
            mocker.AsyncMock(return_value=mocker.AsyncMock()),
        )

        result = await delete_reservation_resolver(
            None, MOCK_EXECUTION_CONTEXT, reservationId=999
        )

        assert result["success"] is False
        assert "Reservation not found" in result["errors"]
        assert result["reservation"] is None
