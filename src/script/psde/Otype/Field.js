
import User from './User'
class Field {
  constructor(field){
    this.setData(field);
  }
  setData(field={}){
    let obj = {
      caption:'',
      des:'',
      domain:[],
      icon:'',
      id:'',
      mtime:'',
      name:'',
      type:0,
      uitype:''
    }
    Object.assign(obj,field);

    if(obj.user) obj.user = new User(obj.user);
    if(obj.domain){
      obj.domain = JSON.parse(obj.domain);
    }else{
      obj.domain = [];
    }
    Object.assign(this,obj);

  }
  simple(){
    return {
      fid:this.id,
      name:this.caption||this.name,
      value:''
    }
  }
  toJson(){
    let copy = Object.assign({},this);
    copy.domain = JSON.stringify(copy.domain);
    return copy;
  }
}

export default Field