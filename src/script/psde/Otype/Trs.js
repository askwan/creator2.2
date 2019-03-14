class Trs {
  constructor(trs){
    this.setData(trs);
  }
  setData(option){
    let trs = {
      id:'',
      content:''
    }
    Object.assign(this,trs,option)
  }
}
export default Trs;