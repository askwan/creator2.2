<template>
  <div class='root'>
    
  </div>
</template>
<script>
  import Psde from '@/script/psde'
  export default {
    data(){
      return {

      }
    },
    props:{},
    components:{},
    computed:{},
    mounted(){
      let psde = new Psde();
      psde.objectServer.queryBySobjectId('1090403106535120896').then(sobject=>{
        console.log(sobject);
      })
    },
    methods:{

    }
  }
</script>
<style lang='scss' scoped>

</style>
