/** @type { import('@storybook/react-webpack5').StorybookConfig } */

const path = require('path');

const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, '../src');
    config.resolve.alias['@components'] = path.resolve(__dirname, '../src/components');
    config.resolve.alias['@common'] = path.resolve(__dirname, '../src/components/common');
    return config;
  },
};
export default config;
