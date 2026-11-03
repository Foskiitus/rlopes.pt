import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { hasLocale } from "next-intl";
import { routing } from "./i18n/routing";
const handleLocale = createMiddleware(routing);
export default function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const chosen = request.cookies.get("NEXT_LOCALE")?.value;
    const locale = hasLocale(routing.locales, chosen) ? chosen : "fr";
    const url = request.nextUrl.clone();
    url.pathname = "/" + locale;
    return NextResponse.redirect(url);
  }
  // Preserve the original Portuguese archive URL before locale negotiation.
  if (request.nextUrl.pathname === "/portfolio") {
    return NextResponse.redirect(new URL("/pt#work", request.url), 308);
  }
  const archive = request.nextUrl.pathname.match(
    /^\/(fr|pt|en)\/portfolio\/?$/,
  );
  if (archive)
    return NextResponse.redirect(
      new URL("/" + archive[1] + "#work", request.url),
      308,
    );
  return handleLocale(request);
}
export const config = {
  matcher: [
    "/",
    "/portfolio",
    "/(fr|pt|en)/:path*",
    "/((?!api|_next|.*\\..*).*)",
  ],
};
