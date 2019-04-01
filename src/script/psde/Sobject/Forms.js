import Form from './Form'

class Forms extends Array {
  constructor(lists=[]){
    super();
    lists.forEach(el=>this.add(el));
  }
  add(option){
    let index = this.findIndex(el=>el.id==option.id);
    if(index==-1){
      this.push(new Form(option))
    }
  }
  modify(form){
    let aim = this.findIndex(el=>el.id==form.id);
    Object.assign(aim,form);
  }
  remove(){
    
  }
  getFormByEntityId(id){
    let form = this.find(()=>this.geom.isRelated(id));
    return form;
  }
  getFormByFormId(formid){
    return this.find(form=>form.id==formid);
  }
}

export default Forms