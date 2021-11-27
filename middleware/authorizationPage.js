import cookies from "next-cookies";

export function unAuthPage(context) {
  // Public Routes
  return new Promise((resolve) => {
    const dataCookie = cookies(context);
    if (!dataCookie.token) {
      return context.res
        .writeHead(302, {
          Location: "/auth/login",
        })
        .end();
    }
    resolve("unauthorized");
  });
}

export function AuthPage(context) {
  return new Promise((resolve) => {
    const dataCookie = cookies(context);
    if (!dataCookie.token) {
      return context.res
        .writeHead(302, {
          Location: "/auth/login",
        })
        .end();
    }
    return resolve(dataCookie);
  });
}
