class Style {
  constructor(style){
    this.setData(style);
  }
  setData(option){
    let style = {
      id:'',
      maxGrain:0,
      minGrain:0,
      name:'',
      positions:[],
      style:0,
      type:''
    }
    Object.assign(style,option);
    Object.assign(this,style);
  }
}

export default Style