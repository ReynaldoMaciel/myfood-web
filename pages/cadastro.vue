<template>
  <div class="Cadastro">
    <br />
    <div class="columns">
      <div class="column has-text-centered">
        <h1 class="has-text-white	is-size-4 has-text-weight-bold">
          Cadastro
        </h1>
      </div>
    </div>
    <div class="columns">
      <div class="column teste">
        <div class="box">
          <div class="columns">
            <div class="column">
              <FormField
                label="Nome"
                placeholder="Nome completo"
                icon="account"
                identifier="nome"
                validations="required"
              />
              <br />
              <FormField
                label="Email"
                placeholder="Email"
                icon="email"
                identifier="email"
                validations="required|email"
              />
              <br />
              <FormField
                label="Senha"
                placeholder="Senha"
                icon="lock"
                identifier="senha"
                type="password"
                :password-reveal="true"
                validations="required"
              />
              <br />
              <FormField
                label="Confirme a senha"
                placeholder="Por favor repita a senha"
                icon="lock"
                identifier="senha2"
                type="password"
                :password-reveal="true"
                validations="required|confirmed:senha"
              />
              <br />
              <FormField
                label="CEP"
                placeholder="Informe o seu CEP"
                identifier="cep"
                type="text"
                validations="required|min:8|max:8"
                :on-focus-out="searchByCep"
                :loading="loadingCep"
              />
              <br />
              <FormField
                label="Estado"
                placeholder="Informe o seu estado"
                identifier="estado"
                type="text"
                validations="required"
                :disabled="disableEstado"
              />
              <br />
              <FormField
                label="Cidade"
                placeholder="Informe a sua cidade"
                identifier="cidade"
                type="text"
                validations="required"
                :disabled="disableCidade"
              />
              <br />
              <FormField
                label="Endereço"
                placeholder="Informe o seu endereço"
                identifier="endereco"
                type="text"
                validations="required"
                :disabled="disableEndereco"
              />
              <br />
            </div>
            <br />
          </div>

          <button
            class="button is-medium is-fullwidth bg_first color_white is-rounded"
            @click="cadastrar()"
          >
            Cadastrar
          </button>
          <br />
          <nuxt-link :to="{ name: 'login' }" class="buttons is-centered">
            <div class="button is-danger is-small is-outlined">
              Já possuo uma conta
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import FormField from '../components/FormField'

export default {
  layout: 'minimal',
  name: 'Cadastro',
  components: {
    FormField
  },
  data() {
    return {
      loadingCep: false,
      disableEstado: true,
      disableCidade: true,
      disableEndereco: true
    }
  },
  computed: {
    ...mapState({
      baseState: state => state.baseModule.baseState
    })
  },
  created() {
    this.addAttributes({
      nome: '',
      email: '',
      senha: '',
      senha2: '',
      cep: '',
      estado: '',
      cidade: '',
      bairro: ''
    })
  },
  methods: {
    ...mapActions({
      addAttributes: 'baseModule/addAttributes',
      updateAttribute: 'baseModule/updateAttribute',
      updateAttributes: 'baseModule/updateAttributes'
    }),
    async searchByCep(event) {
      this.loadingCep = true
      try {
        if (!event.target.value) {
          throw new Error('Por favor informe um CEP válido')
        }
        const result = await this.$axios.get(
          `http://viacep.com.br/ws/${event.target.value}/json/unicode/`
        )
        if (!result.status || result.data.erro) {
          throw new Error(
            'Ops erro ao obter dados de endereço pelo CEP informado, por favor, insira os dados manualmente'
          )
        } else {
          const { uf, localidade, logradouro } = result.data
          this.updateAttributes({
            estado: uf,
            cidade: localidade,
            endereco: logradouro
          })
        }
      } catch (e) {
        this.disableEstado = false
        this.disableCidade = false
        this.disableEndereco = false
        this.$swal(
          'Ops..',
          'Erro ao obter dados de endereço com CEP informada',
          'warning'
        )
      }
      this.loadingCep = false
    },
    cadastrar() {
      try {
        this.$validator
          .validateAll()
          .then(result => {
            console.log(result)
            if (!result) {
              this.$toast.open({
                duration: 5000,
                message:
                  'Preencha corretamente todos os campos antes de prosseguir',
                position: 'is-bottom',
                type: 'is-danger'
              })
            }
          })
          .catch(err => {
            console.log(err.message ? err.message : 'Erro ao efetuar login')
          })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss">
.teste {
  margin: 0px 10px;
}
</style>
