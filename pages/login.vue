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
                <label class="label">Email</label>
                <div class="control has-icon">
                  <input class="input" type="email" placeholder="Email" />
                  <i class="fa fa-envelope" />
                </div>
                <br />
                <label class="label">Senha</label>
                <div class="control has-icon">
                  <input class="input" type="password" placeholder="Senha" />
                  <i class="fa fa-lock" />
                </div>
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
