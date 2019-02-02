export default {
  s3: {
    REGION: "us-east-2",
    BUCKET: "reservation-app-uploads"
  },
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://mj51zfu62a.execute-api.us-east-2.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_ciR8PSm7C",
    APP_CLIENT_ID: "ikvoqnhpfnqra05pkm7qfcjnh",
    IDENTITY_POOL_ID: "us-east-2:496b3d05-f87e-4004-a823-6de9307c2a20"
  }
};
