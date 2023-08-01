const REGEXP_EMAIL = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
// eslint-disable-next-line no-useless-escape
const REGEXP_URL = /^https?:\/\/[\w\-\.\/~:\?\#\[\]@!$&'\(\)\*\+,;=]+[\-\.\/~:\?\#\[\]@!$&'\(\)\*\+,;=]{1}[\w\-\.\/~:\?\#\[\]@!$&'\(\)\*\+,;=]+[#\/]?$/;

const STATUS_OK = 200;

const STATUS_CREATE = 201;

const MSG_ERR_AUTH = 'Необходима авторизация';

const MSG_ERR_AUTH_INCORRECT_DATA = 'Неправильные почта или пароль';

const MSG_ERR_ERRHANDLER = 'На сервере произошла ошибка';

const MSG_ERR_DUPLICATE = 'Пользователь с такой почтой уже существует';

const MSG_ERR_NECESSARYDATA = 'Заполните обязательные поля';

const MSG_ERR_NOTFOUND = 'Пользователь не найден';

const MSG_ERR_INVALIDID = 'Некорректный id';

const MSG_ERR_NOTFOUND_MOVIE = 'Такого фильма не существует';

const MSG_ERR_FORBIDDEN = 'У вас нет прав на удаление этого фильма';

module.exports = {
  REGEXP_EMAIL,
  REGEXP_URL,
  STATUS_OK,
  STATUS_CREATE,
  MSG_ERR_AUTH,
  MSG_ERR_AUTH_INCORRECT_DATA,
  MSG_ERR_ERRHANDLER,
  MSG_ERR_DUPLICATE,
  MSG_ERR_NECESSARYDATA,
  MSG_ERR_NOTFOUND,
  MSG_ERR_INVALIDID,
  MSG_ERR_NOTFOUND_MOVIE,
  MSG_ERR_FORBIDDEN,
};
