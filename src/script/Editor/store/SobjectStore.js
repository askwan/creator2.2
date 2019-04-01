let sobjects = {};
let ways = {};
let nodes = {};
let relations = {};
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
  nodes(){
    return nodes;
  }
  ways(){
    return ways;
  }
  relations(){
    return relations
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
      if(form.geotype === 21){
        nodes[form.id] = form;
      }else if(form.geotype === 22 || form.geotype === 23){
        ways[form.id] = form;
      }else if(form.geotype === 24){
        relations[form.id] = form;
      }
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
  getParentWays(nodeid){
    let result = [];
    for(let id in ways){
      let way = ways[id];
      let bool = way.geom.isRelated(nodeid);
      if(bool) result.push(way);
    }
    return result
  }
  getParentRelations(entityId){
    let result = [];
    for(let id in relations){
      let relation = relations[id];
      let bool = relation.geom.isRelated(entityId);
      if(bool) result.push(relation);
    }
    return result
  }
  getFormByEntityId(entityId){
    let list,result;
    list = Object.assign(nodes,ways,relations);
    console.log(list,entityId)
    for(let id in ways){
      let form = ways[id];
      if(form.geom.isRelated(entityId)){
        result = form;
        console.log(form,'related')
      }
    }
    return result;
  }
  
}

export default SobjectStore;