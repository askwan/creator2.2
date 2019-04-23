import Base from './Base'
// import Sobject from '../Sobject'
import Sobject from '../Sobject/Sobject'
class ObjectServer extends Base {
  constructor(option){
    super(option);
    this.url = option.url+'object';
    this.name = 'sobject';
  }
  query(option={}){
    option = Object.assign({
      sdomains:this.getsdomains()
    },option);
    return new Promise((resolve,reject)=>{
      this.get('/query',option).then(res=>{
        if(res.status==200){
          let sobjects = res.data.list.map(obj=>{
            return new Sobject(obj)
          })
          resolve(sobjects);
        }else{
          reject(res)
        }
      })
      .catch(err=>{
        reject(err)
      })
    })
  }
  find(option={}){
    option = Object.assign({},option);
    return new Promise((resolve,reject)=>{
      this.get('/find',option).then(res=>{
        if(res.status==200){
          let sobjects = res.data.list.map(obj=>{
            return new Sobject(obj)
          })
          resolve(sobjects);
        }else{
          reject(res)
        }
      })
      .catch(err=>{
        reject(err)
      })
    })
  }
  save(list){
    list = list.map(sobject=>{
      return sobject.toJSON();
      // return JSON.parse(JSON.stringify(sobject))
    })
    return new Promise((resolve,reject)=>{
      this.post('/saveObject',list).then(res=>{
        resolve(res)
      })
      .catch(err=>{
        reject(err)
      })
    })
  }
  queryBySobjectId(sobjectId){
    let option = {
      loadAttr:true,
      loadForm:true,
      ids:sobjectId,
      geoEdit:true,
      loadNetwork:true,
      loadCompose:true,
      loadObjType:true,
    };
    return this.query(option)
  }
  queryTrackBySobjectId(sobjectId){
    let option = {
      loadAttr:true,
      loadForm:true,
      ids:sobjectId,
      geoEdit:true,
      loadNetwork:true,
      loadCompose:true,
      loadDynamicData:true
    };
    return this.query(option)
  }
  queryByBBox(bbox,boolean=true){
    let bboxStr = `BBOX(${bbox.minx} ${bbox.maxx} ${bbox.miny} ${bbox.maxy})`;
    let option = {
      geoWkt:bboxStr,
      loadForm:true,
      geoEdit:boolean,
      loadNetwork:true
    }
    return this.query(option)
  }
  queryTrackByBBox(bbox,boolean=true){
    let bboxStr = `BBOX(${bbox.minx} ${bbox.maxx} ${bbox.miny} ${bbox.maxy})`;
    let option = {
      geoWkt:bboxStr,
      loadForm:true,
      geoEdit:boolean,
      loadNetwork:true
    }
    return this.query(option)
  }
}

export default ObjectServer;