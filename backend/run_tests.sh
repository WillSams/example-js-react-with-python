export ENV=test
export NODE_ENV=$ENV 
export PG_NAME=hotel_$ENV
export PG_PORT=8081
export PG_URL=${PG_CLIENT}://${PG_USER}:${PG_PASSWD}@${PG_HOST}:${PG_PORT}/${PG_NAME}
export PYTHONDONTWRITEBYTECODE=1

PG_NAME=hotel_test ./../db/create_db.sh
cd ../db || exit          
npm i
NODE_ENV=$ENV npm run refresh     # hotels_test this will drop tables, re-create them
NODE_ENV=$ENV npm run seed  

cd ../backend || exit
find . -name "__pycache__" -exec rm -r {} +
python -m pytest --cov=src --cov-report term
