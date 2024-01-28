# Acme Hotel Example - React, FastAPI, TortoiseORM

This example contains a frontend and backend:

- The frontend is a [React](https://react.dev) application using [Bootstrap4](https://getbootstrap.com/docs/4.6/getting-started/introduction/) for view designs.
- The backend is a [GraphQL API](https://graphql.org) providing the ability to create, delete, and list reservatios plus available rooms for a given date range.

For a solution that use the MVC architecture for the frontend, check out my [Express-FastAPI-SqlAlchemy](https://github.com/WillSams/acme-hotel-express-fastapi-sqlalchemy) version of this same idea.

![text](images/home-example.png)

## Pre-requisites

To run the service, you will need to install the following tools.

* [NodeJS](https://nodejs.org/en/)
* [Docker](https://www.docker.com/)

The below are optional but highly recommended:

* [nvm](https://github.com/nvm-sh/nvm) - Used to manage NodeJS versions.
* [Direnv](https://direnv.net/) - Used to manage environment variables.
- Install [direnv](https://direnv.net) for persisting environment variables needed for development.

## Getting Started

First, we'll need to set up our environment variables.  You can do this by either:

* Manually exporting the necessary environment variables in your shell.  These are listed in the [`./envrc.example`](./envrc.example) file.

or

* Use optionally use **Direnv**.

```bash
cp .envrc.example .envrc
direnv allow
```

### Install Node.js Packages

Execute the following within your terminal:

```bash
nvm use                                 # To eliminate any issues, install/use the version listed in .nvmrc.
npm i                                   # Install packages needed for the repository root
cd frontend && npm i --legacy-peer-deps # Install packages needed for the frontend
cd backend && npm                       # Install packages needed for the backend
cd ..                                   # Navigate back to the root of the repository
```

### Create the database

Finally, let's create and seed the `Deportivo-development` database, simply run `npm run seed`.  However, be careful as this command re-creates the database every execution of it.

## Development

To run both the frontend and backend concurrently:

```bash
docker-compose up -d  # runs the database in the background
npm run dev           # runs both the frontend and backend
```

Also, you just execute the backend via `npm run dev:backend`.  to verify the backend is working:

```bash
curl http://localhost:$API_PORT/about
```

Also, you shoud be able to create a team:

```bash
# First, grab an access token provided by the backend API
ACCESS_TOKEN=$(curl -s -X GET \
  -H 'accept: application/json' \
  'http://localhost:8080/development/token' | jq -r '.access_token')

# List all existing booked reservations
curl http://localhost:$API_PORT/development/graphql \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer ${ACCESS_TOKEN}" \
    -d '{"query": "query { getAllReservations { reservations { room_id checkin_date checkout_date  } } }"}'

# Create a new reservation
# Note: if there is an overlap, you'll see a 
#   'Reservation dates overlap with an existing reservation' error message
# To see the aforementioned error, run this mutation a multiple times
curl http://localhost:$API_PORT/development/graphql \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer ${ACCESS_TOKEN}" \
    -d '{ "query": "mutation { createReservation( input: { room_id: \"91754a14-4885-4200-a052-e4042431ffb8\", checkin_date: \"2023-12-31\", checkout_date: \"2024-01-02\"  }) { success errors reservation { id room_id checkin_date checkout_date total_charge } } }" }'

# List Available Rooms for a given date range
curl http://localhost:$API_PORT/development/graphql \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer ${ACCESS_TOKEN}" \
    -d '{"query": "query { getAvailableRooms( input: { checkin_date: \"2023-12-31\", checkout_date: \"2024-01-02\" }) { success errors rooms { id num_beds allow_smoking daily_rate cleaning_fee } } }" }'
```

You can also acces the Apollo GraphiQL (interactive test playground) instance at [http://localhost:$API_PORT/development/graphql](http://localhost:$API_PORT/development/graphql).

![text](images/api-1.png)

Additionally, you can visually view, create, or delete DynamoDB tables.  Navigate to [http://localhost:8001](http:/localhost:8001) in your browser to access.  This will require the `DYNAMO_ENPOINT` environment variable to be set in the terminal.  See `.envrc.example` for details.

![text](images/dynamodb_admin.png)

## Testing

Both the backend and frontend utilizes [Jest](https://jestjs.io/).  To run these tests, simply execute `npm run test:frontend` or `npm run test:backend`.
