let sobjects = {};
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
  
}

export default SobjectStore;