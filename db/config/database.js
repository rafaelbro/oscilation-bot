require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: 'DB_CONNECTION_STRING',
  },
  test: {
    use_env_variable: 'DB_CONNECTION_STRING_TEST',
    logging: false,
  }
};
