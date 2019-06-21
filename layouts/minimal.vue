<template>
  <div style="width:100%;">
    <nav class="navbar bg_first" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="~assets/buefy.png" alt="Buefy" height="28" />
        </a>

        <div class="navbar-burger">
          <span class="bg_white" />
          <span class="bg_white" />
          <span class="bg_white" />
        </div>
      </div>
    </nav>
    <div class="gradient_login">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' }
        },
        {
          title: 'Login',
          icon: 'login-variant',
          to: { name: 'login' }
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.navbar-burger span {
  background-color: white;
}
.navbar {
  position: sticky;
  top: 0px;
}
.gradient_login {
  display: block;
  min-height: 700px;
  background-color: white;
  // background-image: linear-gradient(
  //   to bottom,
  //   darken($myfood_first_color, 10%),
  //   lighten($myfood_first_color, 30%)
  // );
}
</style>
