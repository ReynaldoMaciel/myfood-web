<template>
  <div class="Login">
    <section class="hero is-fullheight is-medium">
      <div class="hero-body">
        <div class="container">
          <div class="column has-text-centered">
            <h1 class="is-size-4 has-text-weight-bold">
              Login
            </h1>
          </div>
          <div class="columns is-centered">
            <div class="column is-two-thirds-tablet is-one-third-desktop">
              <div class="box">
                <b-field
                  label="Email"
                  :type="errors.first('email') ? 'is-danger' : ''"
                  :message="errors.first('email')"
                >
                  <b-input
                    v-model="email"
                    v-validate="'required|email'"
                    placeholder="Email"
                    icon="email"
                    name="email"
                  >
                  </b-input>
                </b-field>
                <b-field
                  label="Senha"
                  :type="errors.first('senha') ? 'is-danger' : ''"
                  :message="errors.first('senha')"
                >
                  <b-input
                    v-model="senha"
                    v-validate="'required|min:8'"
                    placeholder="Senha"
                    type="password"
                    icon="lock"
                    name="senha"
                    :use-html5-validation="false"
                    password-reveal
                  >
                  </b-input>
                </b-field>
                <br />
                <div class="control">
                  <button
                    class="button is-medium is-fullwidth bg_first color_white is-rounded"
                    @click="authenticate"
                  >
                    Login
                  </button>
                  <br />
                  <nuxt-link
                    :to="{ name: 'cadastro' }"
                    class="buttons is-centered"
                  >
                    <div class="button is-danger is-small is-outlined">
                      Não possuo conta
                    </div>
                  </nuxt-link>
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'minimal',
  name: 'Login',
  data() {
    return {
      email: '',
      senha: ''
    }
  },
  methods: {
    authenticate() {
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
