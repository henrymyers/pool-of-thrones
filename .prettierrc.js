const defaultConfig = require('prettier-config-landr');
module.exports = {
  ...defaultConfig,
  overrides: [
    ...defaultConfig.overrides,
    {
      files: '*.scss',
      options: {
        tabWidth: 4,
      },
    },
    {
      files: '*.json',
      options: {
        tabWidth: 4,
      },
    },
  ],
};
