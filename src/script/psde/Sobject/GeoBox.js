export default class GeoBox {
  constructor(option){
    this.setData(option)
  }
  setData(option){
    let geoBox = {
      minx:0,
      miny:0,
      minz:0,
      maxx:0,
      maxy:0,
      maxz:0
    }
    Object.assign(this,geoBox,option);
  }
}