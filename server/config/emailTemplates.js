export const EMAIL_VERIFY_TEMPLATE = `
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="format-detection" content="telephone=no">
    <title>Verify Email</title>
  </head>

  <body style="margin:0;padding:0;background-color:#f6f6f6;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:30px 15px;">

          <table width="100%" cellpadding="0" cellspacing="0" style="
            max-width:600px;
            background-color:#0f172a;
            border-radius:12px;
            padding:30px;
            font-family:Arial, Helvetica, sans-serif;
            color:#e0e7ff;
          ">

            <tr>
              <td align="center">
                <h2 style="margin:0 0 10px;color:#ffffff;">
                  Verify your email
                </h2>
                <p style="margin:0 0 20px;font-size:14px;color:#c7d2fe;">
                  We received a request to verify the email:
                  <br />
                  <strong style="color:#ffffff;">{{email}}</strong>
                </p>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:20px 0;">
                <p style="margin:0;font-size:13px;color:#a5b4fc;">
                  Your verification code
                </p>
                <h1 style="
                  margin:10px 0;
                  letter-spacing:8px;
                  color:#ffffff;
                ">
                  {{otp}}
                </h1>
              </td>
            </tr>

            <tr>
              <td align="center">
                <p style="font-size:12px;color:#94a3b8;margin:0;">
                  If you didn’t request this, please ignore this email.
                </p>
              </td>
            </tr>

          </table>

          <p style="margin-top:15px;font-size:12px;color:#999;">
            © ${new Date().getFullYear()} Your Company
          </p>

        </td>
      </tr>
    </table>
  </body>
</html>
`;

export const PASSWORD_RESET_TEMPLATE = `
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="format-detection" content="telephone=no">
    <title>Password Reset</title>
  </head>

  <body style="margin:0;padding:0;background-color:#f6f6f6;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:30px 15px;">

          <table width="100%" cellpadding="0" cellspacing="0" style="
            max-width:600px;
            background-color:#0f172a;
            border-radius:12px;
            padding:30px;
            font-family:Arial, Helvetica, sans-serif;
            color:#e0e7ff;
          ">

            <tr>
              <td align="center">
                <h2 style="margin:0 0 10px;color:#ffffff;">
                  Reset your password
                </h2>
                <p style="margin:0 0 20px;font-size:14px;color:#c7d2fe;">
                  A password reset was requested for:
                  <br />
                  <strong style="color:#ffffff;">{{email}}</strong>
                </p>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:20px 0;">
                <p style="margin:0;font-size:13px;color:#a5b4fc;">
                  Your reset code
                </p>
                <h1 style="
                  margin:10px 0;
                  letter-spacing:8px;
                  color:#ffffff;
                ">
                  {{otp}}
                </h1>
              </td>
            </tr>

            <tr>
              <td align="center">
                <p style="font-size:12px;color:#94a3b8;margin:0;">
                  If you didn’t request a password reset, ignore this email.
                </p>
              </td>
            </tr>

          </table>

          <p style="margin-top:15px;font-size:12px;color:#999;">
            © ${new Date().getFullYear()} Your Company
          </p>

        </td>
      </tr>
    </table>
  </body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = `
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="format-detection" content="telephone=no">
    <title>Welcome</title>
  </head>

  <body style="margin:0;padding:0;background-color:#f6f6f6;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:30px 15px;">

          <!-- Card -->
          <table width="100%" cellpadding="0" cellspacing="0" style="
            max-width:600px;
            background-color:#0f172a;
            border-radius:12px;
            padding:30px;
            font-family:Arial, Helvetica, sans-serif;
            color:#e0e7ff;
          ">

            <!-- Title -->
            <tr>
              <td align="center">
                <h2 style="margin:0 0 10px;color:#ffffff;">
                  Welcome 👋
                </h2>
                <p style="margin:0 0 20px;font-size:14px;color:#c7d2fe;">
                  Your account has been successfully created with the email:
                  <br />
                  <strong style="color:#ffffff;">{{email}}</strong>
                </p>
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td align="center" style="padding:10px 0 20px;">
                <p style="font-size:14px;color:#a5b4fc;margin:0;">
                  You’re all set! You can now log in and start using the app.
                </p>
              </td>
            </tr>

            <!-- Button (optional) -->
            <tr>
              <td align="center" style="padding:20px 0;">
                <a href="{{loginUrl}}" target="_blank"
                  style="
                    background:#4f46e5;
                    color:#ffffff;
                    text-decoration:none;
                    padding:12px 28px;
                    border-radius:999px;
                    font-size:14px;
                    font-weight:bold;
                    display:inline-block;
                  ">
                  Go to Login
                </a>
              </td>
            </tr>

            <!-- Footer text -->
            <tr>
              <td align="center">
                <p style="font-size:12px;color:#94a3b8;margin:0;">
                  If you didn’t create this account, please contact support.
                </p>
              </td>
            </tr>

          </table>

          <!-- Footer -->
          <p style="margin-top:15px;font-size:12px;color:#999;">
            © ${new Date().getFullYear()} Your Company
          </p>

        </td>
      </tr>
    </table>
  </body>
</html>
`;
