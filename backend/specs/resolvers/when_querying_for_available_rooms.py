import pytest
from api.resolvers.queries import get_available_rooms_resolver

from . import MOCK_EXECUTION_CONTEXT


class DescribeAvailableRoomsResolver:
    @pytest.mark.asyncio
    async def should_get_available_rooms_all_available(self, mocker):
        input_data = {
            "checkin_date": "2023-01-10",
            "checkout_date": "2023-01-15",
        }

        mock_rooms = [mocker.Mock(id=i, allow_smoking=True) for i in range(1, 4)]
        mocker.patch(
            "api.DbSession",
            mocker.AsyncMock(return_value=mocker.AsyncMock()),
        )
        mocker.patch(
            "api.models.Room.get_or_none",
            mocker.AsyncMock(return_value=mock_rooms),
        )
        mocker.patch(
            "api.resolvers.data.is_room_available",
            mocker.AsyncMock(return_value={"success": True}),
        )

        result = await get_available_rooms_resolver(
            None, MOCK_EXECUTION_CONTEXT, input_data
        )

        assert result["success"] is True
        assert "rooms" in result
        assert len(result["rooms"]) == len(mock_rooms)

    @pytest.mark.asyncio
    async def should_get_available_rooms_when_none_available(self, mocker):
        input_data = {
            "checkin_date": "2023-01-10",
            "checkout_date": "2023-01-15",
        }

        mock_rooms = [mocker.AsyncMock(id=i, allow_smoking=True) for i in range(1, 4)]

        # Mock the necessary functions
        mocker.patch("api.DbSession", mocker.AsyncMock(return_value=mocker.AsyncMock()))
        mocker.patch(
            "api.resolvers.data.fetch_available_rooms",
            return_value={"success": False, "rooms": mock_rooms},
        )
        mocker.patch(
            "api.resolvers.data.is_room_available",
            mocker.AsyncMock(return_value={"success": False}),
        )

        # Call the resolver function
        result = await get_available_rooms_resolver(
            None, MOCK_EXECUTION_CONTEXT, input_data
        )

        # Assert the result
        assert result["success"] is True
        assert len(result["rooms"]) == 0

    @pytest.mark.asyncio
    async def should_not_return_available_rooms_when_invalid_dates_given(self, mocker):
        input_data = {
            "checkin_date": "invalid-date",
            "checkout_date": "2023-01-15",
        }

        mocker.patch("api.DbSession", mocker.AsyncMock(return_value=mocker.AsyncMock()))
        result = await get_available_rooms_resolver(None, None, input_data)
        assert result["success"] is False
        assert "errors" in result
        assert (
            "time data 'invalid-date' does not match format '%Y-%m-%d'"
            in result["errors"]
        )
