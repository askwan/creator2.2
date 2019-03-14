class Properties {
  constructor(option){
    this.setData(option);
  }
  setData(option){
    let properties = {
      show:true,
      relationId:'',
      status:0
    }
    Object.assign(this,properties,option);
  }
}
export default Properties