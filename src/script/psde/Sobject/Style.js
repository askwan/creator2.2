let _type;

class Style extends Array {
  constructor(style,type){
    super()
    _type = type;
    this.setData(style)
  }
  setData(option){
    if(typeof option == "string"&&option.length>0){
      let arr = JSON.parse(option);
      arr.forEach(el=>{
        this.push(el);
      })
    }else {
      if(_type>=40){
        this.push({
          scale:0,
          smallPX:0,
          x:0,
          y:0,
          z:0,
          h:0
        })
      }
    }
  }
}

export default Style