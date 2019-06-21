<template>
  <div class="Cadastro">
    <br />
    <div class="columns">
      <div class="column has-text-centered">
        <h1 class="is-size-4 has-text-weight-bold">
          Cadastro
        </h1>
      </div>
    </div>
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-two-thirds-tablet is-two-quarters-desktop">
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
                  identifier="confirmacao"
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
                  type="select"
                  :options="estados"
                  validations="required"
                />
                <br />
                <!-- <FormField
                  label="Cidade"
                  placeholder="Informe a sua cidade"
                  identifier="cidade"
                  type="autocomplete"
                  :options="cidades"
                  :loading="loadingCidades"
                  :typing="digitandoCidade"
                  :disabled="disableCidade"
                  validations="required"
                /> -->
                <FormField
                  label="Cidade"
                  placeholder="Informe a sua cidade"
                  identifier="cidade"
                  type="text"
                  validations="required"
                />
                <br />
                <FormField
                  label="Bairro"
                  placeholder="Informe o seu bairro"
                  identifier="bairro"
                  type="text"
                  validations="required"
                />
                <br />
                <FormField
                  label="Endereço"
                  placeholder="Informe o seu endereço"
                  identifier="endereco"
                  type="text"
                  validations="required"
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
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import debounce from 'lodash/debounce'
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
      disableCidade: true,
      loadingCidades: false,
      cidades: []
    }
  },
  computed: {
    ...mapState({
      baseState: state => state.baseModule.baseState
    }),
    estados() {
      return [
        { label: 'Acre', value: 'AC' },
        { label: 'Alagoas', value: 'AL' },
        { label: 'Amapá', value: 'AP' },
        { label: 'Amazonas', value: 'AM' },
        { label: 'Bahia', value: 'BA' },
        { label: 'Ceará', value: 'CE' },
        { label: 'Distrito Federal', value: 'DF' },
        { label: 'Espírito Santo', value: 'ES' },
        { label: 'Goiás', value: 'GO' },
        { label: 'Maranhão', value: 'MA' },
        { label: 'Mato Grosso', value: 'MT' },
        { label: 'Mato Grosso do Sul', value: 'MS' },
        { label: 'Minas Gerais', value: 'MG' },
        { label: 'Paraná', value: 'PR' },
        { label: 'Paraíba', value: 'PB' },
        { label: 'Pará', value: 'PA' },
        { label: 'Pernambuco', value: 'PE' },
        { label: 'Piauí', value: 'PI' },
        { label: 'Rio Grande do Norte', value: 'RN' },
        { label: 'Rio Grande do Sul', value: 'RS' },
        { label: 'Rio de Janeiro', value: 'RJ' },
        { label: 'Rondónia', value: 'RO' },
        { label: 'Roraima', value: 'RR' },
        { label: 'Santa Catarina', value: 'SC' },
        { label: 'Sergipe', value: 'SE' },
        { label: 'São Paulo', value: 'SP' },
        { label: 'Tocantins', value: 'TO' }
      ]
    }
  },
  created() {
    this.addAttributes({
      nome: '',
      email: '',
      senha: '',
      confirmacao: '',
      cep: '',
      estado: 'ES',
      cidade: '',
      bairro: '',
      endereco: ''
    })
  },
  methods: {
    ...mapActions({
      addAttributes: 'baseModule/addAttributes',
      updateAttribute: 'baseModule/updateAttribute',
      updateAttributes: 'baseModule/updateAttributes'
    }),
    digitandoCidade: debounce(async function(val) {
      if (val && val.length >= 3) {
        const estado = this.baseState.estado
        this.loadingCidades = true
        const result = await this.$axios.get(
          `https://viacep.com.br/ws/${estado}/${val}/json/`
        )
        this.loadingCidades = false
        console.log(result)
        if (result.status === 200) {
          this.cidades = result.data
        }
      }
    }, 600),
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
          const { uf, localidade, logradouro, bairro } = result.data
          this.updateAttributes({
            estado: uf,
            cidade: localidade,
            endereco: logradouro,
            bairro
          })
        }
      } catch (e) {
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
        this.$validator.validateAll().then(validated => {
          if (!validated) {
            this.$toast.open({
              duration: 5000,
              message:
                'Preencha corretamente todos os campos antes de prosseguir',
              position: 'is-bottom',
              type: 'is-danger'
            })
          }
        })
      } catch (error) {
        this.$swal('Ops..', 'Erro ao efetuar login', 'error')
      }
    }
  }
}
</script>
