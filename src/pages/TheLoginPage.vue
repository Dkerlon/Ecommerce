<template>
    <div class="register-container">
        <header>
            <img style="width: 100px;" src="/img/icons/loja.png" alt="icone de lojaa">
            <h2>Bem-vindo de volta</h2>
            <p>Entre na sua conta para continuar</p>
        </header>
        <main-container class="form-container">
          <form @submit.prevent="LoginAccount">
              <h3>Entrar</h3>
              <p>Digite suas credenciais para acessar sua conta</p>
              <label-input-column id="email" label-text="E-mail" placeHolder="seu@email.com" type="'email'" v-model="email"></label-input-column>
              <p v-if="formSubmitted && !isFormValid" class="formInvalid">Por favor insira as informações corretamente</p>
              <label for="password">Senha</label>
              <div class="container-input-img">
                <input type="password" name="password" id="password" placeholder="Digite uma senha segura" v-model="password"/>
                <img src="/img/icons/view-on.png" alt="">
              </div>
              <p v-if="formSubmitted && !isFormValid" class="formInvalid">Por favor insira as informações corretamente</p>
              <div class="lembrar-de-mim">
                <input type="checkbox" name="accept-checkbox" id="accept-checkbox">
                <p>Lembrar de mim</p>
              </div>
              <button type="submit">Entrar</button>
              <p>Não tem uma conta? <router-link to="/register">Cadastre-se</router-link></p>
          </form>
        </main-container>
    </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref, watch } from 'vue';
import MainContainer from '@/components/UI/Container/MainContainer.vue';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';
import signIn from '@/services/LoginUser';
import type signInSingInterface from '@/interfaces/signIn';
import type CreateUserResponse from '@/interfaces/CreateUserResponse';
const LabelInputColumn = defineAsyncComponent(() => import('@/components/LabelInputColumn.vue'))

const router = useRouter()
const store = useAuthStore()
const email = ref('');
const password = ref('');
const isFormValid = computed(() => {
  return (
    email.value.trim() !== '' &&
    password.value.trim() !== ''
  )
})
const isLogged = computed<string>(() => store.isLoggedIn!)
watch(isLogged, () => {
  if(isLogged.value){
      router.push('/')
    }
})
const formSubmitted = ref(false)

async function LoginAccount() {
  formSubmitted.value = true

  if (!isFormValid.value) {
    return
  }

  const userData: signInSingInterface = {
    email: email.value,
    password: password.value
  }

  try {
    const response = await signIn(userData) as CreateUserResponse

    if (response && response.idToken) {
      store.setUser(response)

      router.push('/')
    } else {
      alert("Falha no login. Verifique suas credenciais e tente novamente.")
    }

  } catch (error) {
    console.error("Erro no login:", error)
    alert("Ocorreu um erro ao tentar logar. Tente novamente.")
  }
}

</script>

<style scoped>
a{
  text-decoration: none;
  color: #2a4384;
}
a:hover{
  text-decoration: underline;
}
.formInvalid{
  color: red;
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
.lembrar-de-mim input{
  margin: 0;
}
.lembrar-de-mim p{
  color: black;
}

.lembrar-de-mim{
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
