export const scrollToId = (id) => {
  const el = id === "top" ? 0 : document.getElementById(id);
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -64, duration: 1.6 });
  else if (el) el.scrollIntoView({ behavior: "smooth" });
  else window.scrollTo({ top: 0, behavior: "smooth" });
};
