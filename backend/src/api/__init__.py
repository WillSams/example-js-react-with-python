from tortoise import Tortoise

from settings import DB_URL
from tortoise.backends.base.client import BaseDBAsyncClient

from api.utils import log_api_message


async def init():
    try:
        await Tortoise.init(
            db_url=DB_URL,
            modules={"models": ["api.models"]},
        )
        await Tortoise.generate_schemas()
    except Exception as e:
        message = f"Error initializing Tortoise: {e}"
        log_api_message(__name__, message)


async def DbSession() -> BaseDBAsyncClient:
    await init()
    try:
        connection = Tortoise.get_connection("default")
        log_api_message(__name__, "Database connection successful")
        return connection
    except Exception as e:
        message = f"Error getting database connection: {e}"
        log_api_message(__name__, message)
        raise


async def dbClose():
    await Tortoise.close_connections()
