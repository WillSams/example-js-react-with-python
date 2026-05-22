from os import getenv

API_NAME = "Acme Hotel Reservation - Graphql API"
API_PORT = getenv("RESERVATION_PORT") or 80
ENV = getenv("ENV", "development")
DB_URL = getenv("PG_URL")

IS_DEBUG = bool(int(getenv("IS_DEBUG", "0"))) or False

TOKEN_EXPIRATION_IN_MINUTES = 30
SECRET_KEY = getenv("SECRET_KEY")
ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60  # 30 minutes
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24  # 1 day
ALGORITHM = "HS256"

SECRET_KEY = getenv("SECRET_KEY")
REFRESH_SECRET_KEY = getenv("REFRESH_SECRET_KEY")

_missing = [
    name
    for name, val in [
        ("SECRET_KEY", SECRET_KEY),
        ("REFRESH_SECRET_KEY", REFRESH_SECRET_KEY),
    ]
    if not val
]
if _missing:
    raise RuntimeError(f"Missing required environment variables: {', '.join(_missing)}")
