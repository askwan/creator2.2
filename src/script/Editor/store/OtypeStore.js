
let otypes = {};
class OtypeStore {
  constructor(){
    otypes = {}
  }
  add(otype){
    otypes[otype.id] = otype;
  }
  getById(otId){
    return otypes[otId];
  }
}

export default OtypeStore;