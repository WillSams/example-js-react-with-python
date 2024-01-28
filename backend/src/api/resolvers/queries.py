from datetime import datetime
from typing import Any, Dict, cast

from api import DbSession
from api.models import Reservation, Room
from api.resolvers.data import (
    fetch_reservation,
    fetch_available_rooms,
    fetch_entities,
)
import api.utils as utils


async def get_reservation_resolver(obj, info, id) -> Dict[str, Any]:
    try:
        db = await DbSession()

        payload = await fetch_reservation(db, id)
    except ValueError as error:
        message = f"Error retrieving reservation: {str(error)}"
        utils.log_api_message(__name__, message)
        payload = {
            "success": False,
            "errors": [message],
        }
    return payload


async def get_all_reservations_resolver(obj, info) -> Dict[str, Any]:
    db = await DbSession()
    try:
        return await fetch_entities(db, Reservation)
    except ValueError as error:
        utils.log_api_message(__name__, str(error))
        return {"success": False, "errors": [str(error)]}
    finally:
        await db.close()


async def get_all_rooms_resolver(obj, info) -> Dict[str, Any]:
    db = await DbSession()
    try:
        return await fetch_entities(db, Room)
    except ValueError as error:
        utils.log_api_message(__name__, str(error))
        return {"success": False, "errors": [str(error)]}
    finally:
        await db.close()


async def get_available_rooms_resolver(obj, info, input: dict) -> Dict[str, Any]:
    db = await DbSession()
    try:
        checkin_date = utils.convert_to_local_date_from_str(
            str(input.get("checkin_date"))
        )
        checkout_date = utils.convert_to_local_date_from_str(
            str(input.get("checkout_date"))
        )

        return await fetch_available_rooms(db, checkin_date, checkout_date)
    except ValueError as error:
        utils.log_api_message(__name__, str(error))
        return {"success": False, "errors": [str(error)]}
    finally:
        await db.close()
