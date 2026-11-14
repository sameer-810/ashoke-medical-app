const ENV = {
  development: {
    apiUrl:
      process.env.EXPO_PUBLIC_API_URL_DEV || "http://localhost:5002/api/v1",
  },
  production: {
    apiUrl:
      process.env.EXPO_PUBLIC_API_URL || "/api/v1",
  },
};

const getEnv = () => (__DEV__ ? ENV.development : ENV.production);

export const environment = getEnv();
