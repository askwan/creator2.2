<template>
  <div id="app" class="fill">
    <router-view/>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  watch:{
    "$route"(from,to){
      // console.log(from,to)
    }
  }
}
</script>

<style lang="scss">

</style>
