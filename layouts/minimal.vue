<template>
  <div>
    <nav
      class="navbar header bg_first"
      role="navigation"
      aria-label="main navigation"
    >
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
    <nuxt />
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
</style>
