<template>
  <div class='root'>
    <el-button @click="save">save</el-button>
  </div>
</template>
<script>
  import Psde from '@/script/psde';
  let sobj,psde;
  export default {
    data(){
      return {

      }
    },
    props:{},
    components:{},
    computed:{},
    mounted(){
      // 1283767861248 1284128571392
      psde = new Psde({
        sdomains:"2345495560192"
      });
      localStorage.setItem('token','eyJ1aWQiOjE4OTQwLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vd3d3LmJsdWV0aGluay5jbiIsInR5cCI6IkpXVCIsImFsZyI6IkhTMjU2IiwiaWF0IjoxNTU2MDA0MTYyfQ.Ztzt9Q7yZLd0_umXXz_EcCQkwB9aDaqX-jCzIOsqciI')
      psde.objectServer.queryBySobjectId("1105364960309678080").then(sobject=>{
        console.log(sobject);
        sobj = sobject[0];
        // console.log(sobj,666)
        // sobj = sobject[0].modifyAttribute({
        //   fid:'4113',
        //   name:'name',
        //   value:'巡检船9'
        // })
        // psde.objectServer.save(sobject)
      })
      
      // psde.objectServer.queryTrackByBBox({minx:-180,maxx:180,miny:-90,maxy:90}).then(res=>{
      //   console.log(res,'2222')
      // })
      // psde.objectServer.queryTrackBySobjectId('1283767861248,1284128571392').then(res=>{
      //   console.log(res)
      // })
    },
    methods:{
      save(){
        sobj = sobj.modifyObject({name:'巡检船001'});
        // sobj = sobj.modifyAttribute({
        //   fid:'4113',
        //   name:'name',
        //   value:'巡检船009'
        // })
        psde.objectServer.save([sobj]).then(res=>{
          console.log(res);
        })
      }
    }
  }
</script>
<style lang='scss' scoped>

</style>
