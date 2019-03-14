class Location {
  constructor(loc){
    this.x = loc.x;
    this.y = loc.y;
    this.z = loc.z;
  }
  toArray(){
    return [this.x,this.y]
  }
}

export default Location;