<template>
  <div class="Login">
    <section class="hero is-fullheight is-medium gradient_login">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-two-thirds-tablet is-one-third-desktop">
              <h1 class="title">
                <img
                  src="~assets/buefy.png"
                  alt="Buefy"
                  height="28"
                  width="200"
                />
              </h1>
              <div class="box">
                <b-field
                  label="Email"
                  :type="errors.first('email') ? 'is-danger' : ''"
                  :message="errors.first('email')"
                >
                  <b-input
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
                    v-validate="'required|min:8'"
                    placeholder="Senha"
                    type="password"
                    icon="lock"
                    name="senha"
                    password-reveal
                  >
                  </b-input>
                </b-field>
                <br />
                <div class="control">
                  <button
                    class="button is-medium is-fullwidth bg_first color_white is-rounded"
                  >
                    Login
                  </button>
                  <br />
                  <nuxt-link
                    :to="{ name: 'login' }"
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
  name: 'Login'
}
</script>

<style lang="scss" scoped>
.gradient_login {
  background-image: linear-gradient(
    to top left,
    darken($myfood_second_color, 10%),
    lighten($myfood_second_color, 10%)
  );
}
</style>
