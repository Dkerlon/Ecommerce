import { defineStore } from "pinia";

const STORAGE_KEY = "carrinhoItensSelecionados";

const useCarrinhoStore = defineStore("carrinho", {
  state: () => ({
    carrinhoItensSelecionados: JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    ) as [string, number][],
  }),

  actions: {
    salvarNoLocalStorage() {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(this.carrinhoItensSelecionados)
      );
    },

    adicionarItemSelecionado(id: string, quantidade: number) {
      const index = this.carrinhoItensSelecionados.findIndex(
        (item) => item[0] === id
      );

      if (index !== -1) {
        // Atualiza quantidade se já existe
        this.carrinhoItensSelecionados[index][1] += quantidade;
      } else {
        // Adiciona novo item
        this.carrinhoItensSelecionados.push([id, quantidade]);
      }

      this.salvarNoLocalStorage();
    },

    removerItemSelecionado(id: string) {
      this.carrinhoItensSelecionados = this.carrinhoItensSelecionados.filter(
        (item) => item[0] !== id
      );
      this.salvarNoLocalStorage();
    },

    limparItensSelecionados() {
      this.carrinhoItensSelecionados = [];
      this.salvarNoLocalStorage();
    },
  },
});

export default useCarrinhoStore;
