import Attribute from './Attribute'

export default class Attributes extends Array {
  /**
   * 属性字段集合
   * @param {array} lists 
   */
  constructor(lists=[]){
    super();
    lists.forEach(el=>this.add(el))
  }
  add(option){
    let index = this.findIndex(el=>el.fid==option.fid);
    if(index==-1){
      let attribute = new Attribute(option);
      this.push(attribute);
    }
  }
  modify(option){
    let aim = this.find(el=>el.fid==option.fid);
    Object.assign(aim,option);
  }
  remove(option){
    let aim = this.find(el=>el.fid==option.fid);
    aim.delete();
  }
  toJson(){
    return this;
  }
}