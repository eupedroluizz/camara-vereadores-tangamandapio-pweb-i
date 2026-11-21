export function setCookie(nome, valor, dias = 30) {
  let expires = "";
  if (dias) {
    const date = new Date();
    date.setTime(date.getTime() + dias * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = `${nome}=${encodeURIComponent(valor || "")}${expires}; path=/; SameSite=Lax`;
}

export function getCookie(nome) {
  const nameEQ = nome + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
}

export function deleteCookie(nome) {
  document.cookie = `${nome}=; Max-Age=-99999999; path=/;`;
}
