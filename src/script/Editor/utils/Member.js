export default class Member {
  constructor(id,role,type){
    this.id = id;
    this.role = role;
    this.type = type;
  }
  clone(){
    return Object.assign({},this);
  }
}