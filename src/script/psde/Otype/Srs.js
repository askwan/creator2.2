

class Srs {
  constructor(srs){
    this.setData(srs)
  }
  setData(option){
    let srs = {
      id:'',
      content:''
    }
    Object.assign(this,srs,option);
  }
}
export default Srs;