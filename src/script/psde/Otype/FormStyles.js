import Style from './Style'
class FormStyles extends Array {
  constructor(lists=[]){
    super();
    lists.forEach(el=>this.add(el));
  }
  add(object){
    let style = new Style(object);
    this.push(style);
    // let index = this.findIndex(el=>el.id==style.id);
    // if(index==-1) this.push(style);
  }
  toJSON(){
    return {
      styles:this
    }
  }
}
export default FormStyles