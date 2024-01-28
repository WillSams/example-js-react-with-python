from datetime import datetime
from typing import Any, Dict, cast

from tortoise.expressions import Q
from tortoise.transactions import in_transaction

from api.helpers import calculate_total_charge
from api.models import Reservation, Room
from api.resolvers.constants import INVALID_DATE_CHECK_IN, INVALID_DATE_OVERLAP
import api.utils as utils


async def fetch_available_rooms(db, checkin_date, checkout_date) -> Dict[str, Any]:
    available_rooms = await Room.get_or_none(allow_smoking=True, using_db=db) or []

    filtered_rooms = [
        room
        for room in available_rooms
        if await is_room_available(db, cast(int, room.id), checkin_date, checkout_date)
    ]

    return {"success": True, "rooms": filtered_rooms}


async def create_reservation(
    db, room_id, checkin_date, checkout_date
) -> Dict[str, Any]:
    room = await fetch_room(db, room_id)

    available = await is_room_available(
        db, room_id=room_id, checkin_date=checkin_date, checkout_date=checkout_date
    )

    if not available["success"]:
        for message in available["errors"]:
            utils.log_api_message(__name__, message)
        return {"success": False, "errors": available["errors"]}

    daily_rate = cast(int, room.daily_rate)
    total_charge = calculate_total_charge(daily_rate, checkin_date, checkout_date)

    async with in_transaction() as db:
        reservation = await Reservation.create(
            room_id=room_id,
            checkin_date=checkin_date,
            checkout_date=checkout_date,
            total_charge=total_charge,
        )

    return {"success": True, "reservation": reservation}


async def delete_reservation(db, id) -> Dict[str, Any]:
    reservation = await Reservation.get_or_none(id=id, using_db=db)
    if reservation:
        async with in_transaction() as db:
            await reservation.delete(using_db=db)

        return {"success": True, "errors": [], "reservation": reservation}
    else:
        errors = ["Reservation not found"]
        return {"success": False, "errors": errors, "reservation": None}


async def execute_db_statement(db, sql, args=None):
    result = await db.execute_query(sql, args)
    return {"success": True, "result": result}


async def fetch_reservation(db, id: int):
    reservation = await Reservation.get_or_none(id=id, using_db=db)
    if reservation is not None:
        return {
            "success": True,
            "reservation": reservation,
        }
    else:
        message = f"Reservation with id of {id} not found"
        return {
            "success": False,
            "errors": [message],
        }


async def is_room_available(
    db, room_id: str, checkin_date: datetime, checkout_date: datetime
) -> Dict[str, Any]:
    try:
        if checkin_date < datetime.now():
            message: str = INVALID_DATE_CHECK_IN
            utils.log_api_message(__name__, message)
            return {"success": False, "errors": [message]}

        conditions = Q(room_id=room_id) & (
            (
                Q(checkin_date__gte=checkin_date, checkin_date__lt=checkout_date)
                | Q(checkout_date__gt=checkin_date, checkout_date__lte=checkout_date)
                | Q(checkin_date__lte=checkin_date, checkout_date__gte=checkout_date)
            )
        )

        count = await Reservation.filter(conditions).using_db(db).count()

        if count == 0:
            return {"success": True, "errors": []}
        else:
            return {"success": False, "errors": [INVALID_DATE_OVERLAP]}

    except Exception as error:
        utils.log_api_message(__name__, str(error))
        return {"success": False, "errors": [str(error)]}


async def fetch_entities(db, entity_type) -> Dict[str, Any]:
    try:
        entities = await entity_type.all(using_db=db).values()
        payload = {
            "success": True,
            f"{entity_type._meta.db_table}": entities,
        }
    except Exception as error:
        messages = str(error)
        utils.log_api_message(__name__, messages)
        payload = {"success": False, "errors": messages}
    return payload


async def fetch_room(db, room_id: str) -> Room:
    room = await Room.get_or_none(id=room_id, using_db=db)
    if room is None:
        raise ValueError(f"Room with id {room_id} not found")
    return room
