from typing import Any, Dict

from pydantic import BaseModel
from tortoise import fields
from tortoise.models import Model

from api import utils

unique_reservation_cols = ("room_id", "checkin_date", "checkout_date")


class ApiData(BaseModel):
    data: Dict[str, Any]
    status: utils.StatusCode


class Room(Model):
    class Meta:
        table = "rooms"

    id = fields.CharField(max_length=255, pk=True)
    num_beds = fields.IntField()
    allow_smoking = fields.BooleanField()
    daily_rate = fields.IntField()
    cleaning_fee = fields.IntField()


class Reservation(Model):
    id = fields.IntField(pk=True)
    room = fields.ForeignKeyField("models.Room", related_name="reservations")
    checkin_date = fields.DatetimeField()
    checkout_date = fields.DatetimeField()
    total_charge = fields.IntField()

    class Meta:
        table = "reservations"
        unique_together = [unique_reservation_cols]
