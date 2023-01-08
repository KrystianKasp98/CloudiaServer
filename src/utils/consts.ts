export const forbiddenPasswords = [
  '12345678',
  '1234567890',
  'password'
];

export const statusCode = {
  ok: 200,
  created: 201,
  badRequest: 400,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
};

export const responseText = {
  badRequest: 'Bad request',
  authFailed: 'auth failed, please log in',
  users: {
    usedLogin: 'passed login is used',
    usedEmail: 'passed email is used',
  },
  notes: {
    noteUpdateNotFound: (id: string): string => `there isn't exist note with passed id: ${id}`
  }
};

export const FORBIDDEN_PATHS = ['/notes', '/empty-test'];

