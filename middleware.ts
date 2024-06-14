import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function middleware(request: NextRequest) {
  const isBasePath = (request.nextUrl.pathname === '/') ? true : false;
  const next = await updateSession(request, isBasePath);
  if (typeof next === 'undefined') {
    request.nextUrl.pathname = '/login';
    return NextResponse.redirect(request.nextUrl);
  } else {
    return next;
  }
}

async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30 sec from now")
    .sign(key);
}

async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function updateSession(request: NextRequest, isBasePath: boolean) {
  const session = request.cookies.get("session")?.value;
  if (!session) {
    if (isBasePath) {
      return NextResponse.next();;
    } else {
      return;
    }
  } else {
    // Refresh the session so it doesn't expire (if not isBasePath)
    const parsed = await decrypt(session);
    const seconds = isBasePath ? 0 : 30; // if isBasePath, then set it to be expired i.e., 0 * 1000 
    parsed.expires = new Date(Date.now() + seconds * 1000);
    const res = NextResponse.next();
    res.cookies.set({
      name: "session",
      value: await encrypt(parsed),
      httpOnly: true,
      expires: parsed.expires,
    });
    return res;
  }
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  //matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  matcher: ['/','/home','/records/view/answers','/records/view/people',
            '/records/view/places','/records/view/event-times',
            '/records/create/answer','/records/create/person',
            '/records/create/place','/records/create/event-time'],
};