let sobjects = {};
// let ways = {};
// let nodes = {};
// let relations = {};
let geoms = {};
/**
 * SobjectStore类，存贮sobject集合
 * 
 */
class SobjectStore {
  constructor(){
    sobjects = {};
  }
  sobjects(){
    return sobjects
  }
  geoms(){
    return geoms
  }
  getById(sid){
    return sobjects[sid];
  }
  /**
   * 通过entityId获取sobject
   * @param {string} entityId 
   */
  getByEntityId(entityId){
    let result;
    for(let id in sobjects){
      let sobject = sobjects[id];
      if(sobject.isIncludeEntity(entityId)){
        return sobject;
      }
    }
    return result;
  }
  add(sobject){
    sobjects[sobject.id] = sobject;
    sobject.forms.forEach(form=>{
      geoms[form.geom.id] = form.geom;
    })
  }
  delete(id){
    delete sobjects[id];
  }
  getRelatedByEntityId(entityId){
    let result = [];
    for(let id in sobjects){
      let sobject = sobjects[id];
      let bool = sobject.isRelatedByEntity(entityId);
      if(bool) result.push(sobject);
    }
    return result;
  }
  getGeomByEntityId(entityId){
    let id = entityId.replace(/[^0-9]/ig,"");
    // console.log(id,'id');
    // console.log(geoms);
    return geoms[id]
  }
  getFormByEntityId(){
    
  }
  
}

export default SobjectStore;