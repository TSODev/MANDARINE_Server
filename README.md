You have to add some files :

1 - MENTHE_SERVER/.env with :
APP_ID = MENTHE
LOG_LEVEL=debug
PORT=3000
RUN_MODE = secure

SESSION_SECRET = (add the secret password...)
SESSION_DURATION = 240
REQUEST_LIMIT= 100kb
SWAGGER_API_SPEC=/spec

DB_CONNECTION_STRING = mongodb+srv://
DB_SERVER = cluster0-crmg9.mongodb.net
DB_PORT = 
DB_ROOT = Menthe_User
DB_PASSWORD = (add the user password to access the db)
DB_NAME = MENTHE
DB_OPTIONS = ?retryWrites=true&w=majority

and :

MENTHE_SERVER/server/authentication/private.key
MENTHE_SERVER/server/common/tsodev.crt
MENTHE_SERVER/server/common/tsodev.key
MENTHE_SERVER/server/authentication/public.key


docker run --rm -it -p 3000:3000/tcp tsodev/mandarine:latest