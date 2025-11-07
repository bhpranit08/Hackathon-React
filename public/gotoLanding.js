document.addEventListener("DOMContentLoaded", () => {
  const { pathname, origin, hash } = window.location;
  if (pathname.endsWith("/index.html")) window.location.replace(`${origin}/`);
  else if (hash) window.location.replace(`${origin}${pathname}`);
  else console.log("No #anchor found in URL.");

  const body = document.body;
  setTimeout(() => (body.style.overflow = "hidden"), 10);
  setTimeout(() => (body.style.overflow = "auto"), 3200);

  setTimeout(
    () =>
      document
        .querySelector(".main-cnt")
        ?.scrollIntoView({ behavior: "auto", block: "start" }),
    1000
  );
});
