import { createTransport } from "nodemailer";

import { serverEnv } from "@/shared/env/server";

const transporter = createTransport({
  host: serverEnv.MAILER_HOST,
  port: Number(serverEnv.MAILER_PORT),
  secure: serverEnv.MAILER_SECURE,
  auth: {
    user: serverEnv.MAILER_USER,
    pass: serverEnv.MAILER_PASS,
  },
});

export { transporter };
