class Attribute {
  constructor(option){
    this.setData(option)
  }
  setData(option){
    let attr = {
      fid:'',
      name:'',
      value:'',
      show:true
    }
    Object.assign(this,attr,option);
  }
  delete(){
    this.show = false;
  }
}

export default Attribute