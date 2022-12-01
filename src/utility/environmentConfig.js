/* Environments */
const environments = {
  DEV: "DEV",
  TEST: "TEST",
};

// console.log('process.env.NODE_ENV', process.env.NODE_ENV);
// eslint-disable-next-line import/no-mutable-exports
let currentEnvironment;

if (process.env.NODE_ENV === "development") {
  currentEnvironment = environments.DEV;
} else {
  currentEnvironment = environments.TEST;
}

/* URL Prefixes */
const apiUrlPrefixes = {
  // [environments.DEV]: 'https://localhost:44361/',
  // [environments.TEST]: 'https://localhost:44361/'
  [environments.DEV]: "https://api.internal.exado.eu/",
  [environments.TEST]: "https://api.internal.exado.eu/",
  // [environments.DEV]: 'http://exado.yashwe.in/',
  // [environments.TEST]: 'http://exado.yashwe.in/'
};

const currentApiUrlPrefix = apiUrlPrefixes[currentEnvironment];

/* Exports */
export {
  environments,
  currentEnvironment,
  apiUrlPrefixes,
  currentApiUrlPrefix,
};
