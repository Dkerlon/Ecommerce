<template>
    <div class="register-container">
        <header>
            <img style="width: 100px;" src="/img/icons/loja.png" alt="icone de lojaa">
            <h2>Criar Conta</h2>
            <p>Junte-se ao nosso marketplace</p>
        </header>
        <main-container class="form-container">
          <form @submit.prevent="createAccount">
              <h3>Cadastro</h3>
              <p>Preencha aas informações para criar sua conta</p>
              <label-input-column id="nome-completo" label-text="Nome Completo" placeHolder="Seu nome completo" v-model="nome"></label-input-column>
              <label-input-column id="email" label-text="E-mail" placeHolder="Seu@email.com" type="'email'" v-model="email"></label-input-column>
              <label for="password">Senha</label>
              <div class="container-input-img">
                <input type="password" name="password" id="password" placeholder="Digite uma senha segura" v-model="password"/>
                <img src="/img/icons/view-on.png" alt="">
              </div>
              <label for="confirm-password">Confirmar senha</label>
              <div class="container-input-img">
                <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="Confirme a senha" v-model="confirmPassword"/>
                <img src="/img/icons/view-on.png" alt="">
              </div>
              <label for="">Tipo de conta</label>
              <div class="type-accout">
                <label class="type">
                  <input type="radio" name="type-accout" id="radio-comprador" value="comprador" v-model="typeAccout">
                  <img src="/public//img/icons//user-icon.png" alt="">
                  <span>Comprador</span>
                </label>
                <label class="type">
                    <input type="radio" name="type-accout" id="radio-vendedor" value="vendedor" v-model="typeAccout">
                    <img src="/public/img/icons/loja-black-outlined.png" alt="">
                    <span>Vendedor</span>
                </label>
              </div>
              <div class="accept-terms">
                <input type="checkbox" name="accept-checkbox" id="accept-checkbox">
                <p>Aceito os <a href="#">termos e condições</a></p>
              </div>
              <button type="submit">Criar Conta</button>

              <p>Já tem uma conta? <router-link to="/">Faça Login</router-link></p>
          </form>
        </main-container>
    </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref, watch } from 'vue';
import MainContainer from '@/components/UI/Container/MainContainer.vue';
import { useStore } from 'vuex';
import type signInInterface from '@/interfaces/signIn';
const LabelInputColumn = defineAsyncComponent(() => import('@/components/LabelInputColumn.vue'))

const store = useStore()
const nome = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const typeAccout = ref('');

const isFormValid = computed(() => {
  return true
})

function createAccount(){
  const userData: signInInterface = {
    email: email.value,
    password: password.value
  }
  store.dispatch('createAccout',userData)
}
</script>

<style>
a{
  text-decoration: none;
  color: #2a4384;
}
a:hover{
  text-decoration: underline;
}
input{
  margin-bottom: 10px;
}
input:focus{
  outline: #2a4384 1px solid;
}
.container-input-img:focus-within {
  border: 1px solid #2a4384;
}
.register-container{
  width: 60%;
  max-width: 500px;
  margin: 40px auto;
}
header{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}
header h2{
  font-size: 35px;
}
header p{
  color: #9e9c9c;
}
.form-container{
  margin-top: 30px;
}
form{
  display: flex;
  flex-direction: column;
  gap: 5px;
}
form h3{
  font-size: 26px;
}
form p{
  color: #9e9c9c;
}
form p + label{
  margin-top: 15px;
}
form input{
  margin-bottom: 8px;
}
.container-input-img{
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}
.container-input-img img{
  width: 20px;
  margin-right: 10px;
}
.container-input-img input{
  margin-bottom: 0px;
  padding: 10px;
}
#password,#confirm-password{
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  border: none;
  outline: none;
}
.type-accout{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.type input{
  scale: 1.2;
  margin-bottom: 0px;
}
.type img{
  width: 21px;
}
.type{
  width: 48%;
  display: flex;
  gap: 9px;
  align-items: center;
  margin-top: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 7px;
  transition: .2s all ease-in-out;
}
.type:hover{
  background-color: #ccc;
  cursor: pointer;
}
.accept-terms input{
  margin: 0;
}
.accept-terms p{
  color: black;
}

.accept-terms{
  margin: 5px 0px;
  display: flex;
  align-items: center;
  gap: 10px;
}
button{
  padding: 10px;
  border-radius: 5px;
  border: 1px solid transparent;
  background-color: #2a4384;
  color: white;
  cursor: pointer;
  margin-bottom: 15px;
  transition: .3s all ease-in-out;
}
button:hover{
  border: 1px solid #2a4384;
  background-color: white;
  color: #2a4384;
}
button + p{
  text-align: center;
}
</style>
