import GlobalDecorators from "../src/components/GlobalDecorators/GlobalDecorators";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <GlobalDecorators>
      <Story />
    </GlobalDecorators>
  ),
];
