class Parents extends Array {
  constructor(){
    super();
  }
  add(id){
    let index = this.findIndex(el=>el==id);
    if(index!==-1){
      this.push(id);
    }else {
      return new Error('Can not find parent'+id);
    }
  }
  delete(id){
    let index = this.findIndex(el=>el==id);
    if(index==-1) this.splice(index,1)
  }
}

export default Parents