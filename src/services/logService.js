// import * as Sentry from "@sentry/react";
// import { BrowserTracing } from "@sentry/tracing";

function init() {
  // Sentry.init({
  //   dsn: "https://64775cc34191431595e4acb27465ba51@o431309.ingest.sentry.io/6453470",
  //   integrations: [new BrowserTracing()],

  //   // Set tracesSampleRate to 1.0 to capture 100%
  //   // of transactions for performance monitoring.
  //   // We recommend adjusting this value in production
  //   tracesSampleRate: 1.0,
  // });
}

function log(error) {
  console.log(error)
  // Sentry.captureException(error);
}

export default {
  init,
  log,
};
