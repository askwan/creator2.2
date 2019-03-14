import Style from './Style'
class FormStyles extends Array {
  constructor(lists=[]){
    super();
    lists.forEach(el=>this.add(el));
  }
  add(object){
    let style = new Style(object);
    let index = this.findIndex(el=>el.id==style.id);
    if(index==-1) this.push(style);
  }
  toJson(){
    return {
      styles:this
    }
  }
}
export default FormStyles