import OsmNode from "./Osm/OsmNode";
import OsmWay from "./Osm/OsmWay";
import OsmRelation from "./Osm/OsmRelation";
import Style from './Style'
import FormRef from "./FormRef";

class Form {
  constructor(form){
    this.setData(form);
  }
  setData(option){
    let form ={
      id:'',
      dim:2,
      fid:'',
      formref:{},
      geom:{},
      geomref:'',
      geotype:0,
      maxGrain:0,
      minGrain:0,
      style:[],
      type:23,
      show:true
    }
    Object.assign(form,option);
    if(form.geotype==21){
      form.geom = new OsmNode(form.geom)
    }else if(form.geotype==22||form.geotype==23){
      form.geom = new OsmWay(form.geom);
    }else if(form.geotype==24){
      form.geom = new OsmRelation(form.geom);
    }
    form.formref = new FormRef(form.formref);
    form.style = new Style(form.style,form.type);
    Object.assign(this,form);
  }
  isInclude(entityId){
    return this.geom.id == entityId ? true : false;
  }
  delete(){
    this.show = false;
  }
  undo(){
    this.show = true;
  }
}
export default Form;