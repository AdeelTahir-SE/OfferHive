import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const update = false;

  const { method, nextUrl, headers } = request;
  const pathname = nextUrl.pathname;


  if (update) {
    return new NextResponse(
      `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="theme-color" content="#efb100" />
          <title>Maintenance</title>
          <link rel="icon" href="https://offer-hive.vercel.app/hive.svg" type="image/svg+xml" />
          <style>
            body {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background-color: #ffffff;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              color: #333;
            }
            .container {
              text-align: center;
              background: #fffdf3;
              border: 2px solid #efb100;
              padding: 40px;
              border-radius: 16px;
              box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
              max-width: 600px;
              margin: 20px;
            }
            .container img.illustration {
              max-width: 100%;
              height: auto;
              border-radius: 12px;
              margin-bottom: 20px;
            }
            .container img.logo {
              width: 60px;
              height: 60px;
              margin-bottom: 16px;
            }
            h1 {
              font-size: 1.8rem;
              color: #efb100;
              margin-bottom: 16px;
            }
            p {
              font-size: 1rem;
              color: #555;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="https://img.freepik.com/free-vector/phone-repair-service-flat-composition-with-engineers-disassembling-smartphone-blue-background-vector-illustration_1284-80867.jpg?t=st=1744721254~exp=1744724854~hmac=255e353f2725f445a8d469a579a5817250d77baf65a0e39398af43ba461c372c&w=1380" alt="Maintenance illustration" class="illustration" />
            <h1>🚧 Sorry, the website is currently being updated.</h1>
            <p>Please check back later. We're working hard to improve your experience!</p>
          </div>
        </body>
      </html>`,
      {
        status: 503,
        headers: {
          "content-type": "text/html; charset=utf-8",
        },
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
