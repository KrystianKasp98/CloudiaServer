export const FORBIDDEN_PASSWORDS = ['12345678', '1234567890', 'password'];

export const statusCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};

export const RESPONSE_TEXT = {
  BAD_REQUEST: 'Bad request',
  AUTH_FAILED: 'auth failed, please log in',
  USERS: {
    USED_LOGIN: 'passed login is used',
    USED_EMAIL: 'passed email is used'
  },
  NOTES: {
    noteUpdateNotFound: (id: string): string =>
      `there isn't exist note with passed id: ${id}`
  }
};

export const PATHS = {
  NOTES: '/notes',
  USERS: '/users'
};

export const FORBIDDEN_PATHS = ['/notes', '/empty-test'];
