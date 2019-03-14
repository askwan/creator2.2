<template>
  <div class='editor-box fill flex'>
    <div class="left-box width-300 shrink"></div>
    <div class="right-box grow">
      <div id="map-editor" class="map fill"></div>
    </div>
  </div>
</template>
<script>
  import Editor from '@/script/Editor';
  import {getEditor} from '@/script/operate'
  export default {
    data(){
      return {

      }
    },
    props:{},
    components:{},
    computed:{},
    mounted(){
      this.initMap();
    },
    methods:{
      initMap(){
        let editor = new Editor(document.getElementById('map-editor'),()=>{
          console.log('ready');
        });
        getEditor(editor);
        
      }
    }
  }
</script>
<style lang='scss' scoped>
  .editor-box{
    // background-color: #f1f1f1;
    .left-box{
      // background-color: blueviolet;
    }
    .right-box{
      // background-color: red;
      .map{
        // background-color: blue;
      }
    }
  }
</style>