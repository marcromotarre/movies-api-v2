import _ from "lodash";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const stage = process.env.STAGE || "local";

let envConfig;

if (stage === "production") {
  envConfig = require("./prod").default;
} else if ("testing") {
  envConfig = require("./testing").default;
} else {
  envConfig = require("./local").default;
}

export default _.merge(
  {
    stage,
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    secrets: {
      jwt: process.env.JWT_SECRET,
      dbUrl: process.env.DATABASE_URL,
    },
  },
  envConfig
);
