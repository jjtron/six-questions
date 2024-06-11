import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function middleware(request: NextRequest) {
  console.log('RUNNING MIDDLEWARE');
  const next = await updateSession(request);
  //return next;
  
  if (typeof next === 'undefined') {
    console.log('next is undefined');
    request.nextUrl.pathname = '/login';
    return NextResponse.redirect(request.nextUrl);
    //return NextResponse.next();
  } else {
    return NextResponse.next();
  }
  
}

async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(key);
}

async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) { console.log('!session'); return; }

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}


export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  //matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  matcher: ['/home','/records/view/answers'],
};