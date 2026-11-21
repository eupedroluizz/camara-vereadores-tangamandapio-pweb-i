export const storage = {
  getLocal(chave, padrao = null) {
    try {
      const item = localStorage.getItem(chave);
      if (item === null) return padrao;
      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    } catch {
      return padrao;
    }
  },
  setLocal(chave, valor) {
    try {
      const val = typeof valor === "string" ? valor : JSON.stringify(valor);
      localStorage.setItem(chave, val);
    } catch (e) {
      console.error("Erro ao salvar no localStorage:", e);
    }
  },
  getSession(chave, padrao = null) {
    try {
      const val = sessionStorage.getItem(chave);
      return val !== null ? val : padrao;
    } catch {
      return padrao;
    }
  },
  setSession(chave, valor) {
    try {
      sessionStorage.setItem(chave, valor);
    } catch (e) {
      console.error("Erro ao salvar no sessionStorage:", e);
    }
  }
};
