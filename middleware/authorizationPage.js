import cookies from "next-cookies";

export function getDataCookie(context) {
  return new Promise((resolve) => {
    let dataCookie = cookies(context);
    // console.log(dataCookie.token);
    if (dataCookie.token) {
      dataCookie.isLogin = true;
    } else {
      dataCookie.isLogin = false;
    }
    resolve(dataCookie);
  });
}

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
