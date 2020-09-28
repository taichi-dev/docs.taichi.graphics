<template>
  <div class="columns is-vcentered">
    <div class="column">
      <Content slot-key="install"/>
      <img :src="$withBase('/fractal_small.gif')" alt="fractal">
    </div>
    <div class="column">
      <Content slot-key="fractal"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Branding",
};
</script>

<style lang="sass">
@import "../../../../node_modules/bulma/sass/utilities/_all"
@import "../../../../node_modules/bulma/sass/grid/columns"
</style>

