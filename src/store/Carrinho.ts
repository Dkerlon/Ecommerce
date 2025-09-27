import { defineStore } from "pinia";

const useCarrinhoStore = defineStore("carrinho", {
  state: () => ({
    carrinhoItensSelecionados: [] as string[],
  }),
  actions: {
    adicionarItemSelecionado(id: string) {
      if (!this.carrinhoItensSelecionados.includes(id)) {
        this.carrinhoItensSelecionados.push(id);
      }
    },
    removerItemSelecionado(id: string) {
      const index = this.carrinhoItensSelecionados.indexOf(id);
      if (index !== -1) {
        this.carrinhoItensSelecionados.splice(index, 1);
      }
    },
    limparItensSelecionados() {
      this.carrinhoItensSelecionados = [];
    },
  },
});

export default useCarrinhoStore;
