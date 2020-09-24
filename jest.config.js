module.exports = {
  preset: "jest-puppeteer",
  globals: {
      YANDEX: "https://yandex.ru"
    },
  setupFilesAfterEnv: ["./jest.setup.js", "jest-allure/dist/setup"]
};
