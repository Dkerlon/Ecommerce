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
              <p v-if="formSubmitted && !isFormValid" class="formInvalid">Por favor insira as informações corretamente</p>
              <label-input-column id="email" label-text="E-mail" placeHolder="Seu@email.com" type="'email'" v-model="email"></label-input-column>
              <p v-if="formSubmitted && !isFormValid" class="formInvalid">Por favor insira as informações corretamente</p>
              <label for="password">Senha</label>
              <div class="container-input-img">
                <input type="password" name="password" id="password" placeholder="Digite uma senha segura" v-model="password"/>
              </div>
              <p v-if="formSubmitted && !passwordIsEqual" class="formInvalid">As senhas devem ser iguais.</p>
              <label for="confirm-password">Confirmar senha</label>
              <div class="container-input-img">
                <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="Confirme a senha" v-model="confirmPassword"/>
              </div>
              <p v-if="formSubmitted && !passwordIsEqual" class="formInvalid">As senhas devem ser iguais.</p>
              <label for="">Tipo de conta</label>
              <div class="type-accout">
                <label class="type">
                  <input type="radio" name="type-accout" id="radio-comprador" value="comprador" v-model="typeAccount">
                  <img src="/public/img/icons//user-icon.png" alt="">
                  <span>Comprador</span>
                </label>
                <label class="type">
                    <input type="radio" name="type-accout" id="radio-vendedor" value="vendedor" v-model="typeAccount">
                    <img src="/public/img/icons/loja-black-outlined.png" alt="">
                    <span>Vendedor</span>
                </label>
              </div>
              <div class="accept-terms">
                <input type="checkbox" name="accept-checkbox" id="accept-checkbox">
                <p>Aceito os <a href="#">termos e condições</a></p>
              </div>
              <p v-if="formSubmitted && !isFormValid" class="formInvalid">Por favor insira as informações corretamente</p>
              <button type="submit">Criar Conta</button>

              <p>Já tem uma conta? <router-link to="/login">Faça Login</router-link></p>
          </form>
        </main-container>
    </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref, watch } from 'vue';
import MainContainer from '@/components/UI/Container/MainContainer.vue';
import { useAuthStore } from '@/store/auth';
import type signInInterface from '@/interfaces/signIn';
import { useRouter } from 'vue-router';
import registerUser from '@/services/registerUser';
import type { UserRegister } from '@/types/User';
const LabelInputColumn = defineAsyncComponent(() => import('@/components/LabelInputColumn.vue'))

const router = useRouter()
const store = useAuthStore()
const nome = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const typeAccount = ref('');
const isFormValid = computed(() => {
  return (
    nome.value.trim() !== '' &&
    email.value.trim() !== '' &&
    password.value.trim() !== '' &&
    confirmPassword.value.trim() !== '' &&
    typeAccount.value.trim() !== ''
  )
})
const passwordIsEqual = computed(() => {
  return password.value === confirmPassword.value
})
const isLogged = computed<string>(() => store.isLoggedIn!)
watch(
  [nome, email, password, confirmPassword, typeAccount], () => {
    if (formSubmitted.value) {
      formSubmitted.value = false
    }
  }
)
watch(isLogged, () => {
  if(isLogged.value){
      router.push('/')
    }
})
const formSubmitted = ref(false)
async function createAccount() {
  formSubmitted.value = true

  if (!isFormValid.value || !passwordIsEqual.value) {
    return
  }

  const userData: signInInterface = {
    email: email.value,
    password: password.value
  }

  try {
    const response = await store.createAccout(userData)

    if (response?.error?.message) {
      alert(response.error.message)
      return
    }
    if (response && response.idToken) {

      store.setUser(response)

      const user: UserRegister = {
        nome: nome.value,
        email: email.value,
        localId: store.getlocalId,
        tipoConta: typeAccount.value
      }

      await registerUser(user, response.idToken)

      router.push('/')
    } else {
      alert("Não foi possível criar a conta. Tente novamente.")
    }
  } catch (error) {
    console.error("Erro no cadastro:", error)
    alert("Ocorreu um erro ao criar a conta. Tente novamente.")
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
