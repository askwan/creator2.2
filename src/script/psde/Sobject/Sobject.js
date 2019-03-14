import {Otype,Trs,Srs} from '../Otype'
import Actions from '../Action/Actions';
import Forms from './Forms';
import GeoBox from './GeoBox';
import Models from './Models';
import NetWorks from './NetWorks';
import Parents from './Parents';
import Version from './Version';
import Attributes from './Attributes';
class Sobject {
  constructor(sobject){
    this.setData(sobject);
  }
  setData(option){
    let sobject = {
      actions:[],
      children:[],
      code:'',
      datas:{},
      forms:[],
      from:'',
      geoBox:{},
      id:'',
      models:[],
      name:'',
      network:[],
      otype:{},
      parents:[],
      realTime:'',
      sdomain:'',
      srs:{},
      trs:{},
      uuid:'',
      version:{}
    }
    Object.assign(sobject,option);
    sobject.otype = new Otype(sobject.otype);

    sobject.actions = new Actions(sobject.actions);
    sobject.attributes = new Attributes(sobject.attributes);
    sobject.forms = new Forms(sobject.forms);
    sobject.geoBox = new GeoBox(sobject.geoBox);
    sobject.models = new Models(sobject.models.models);
    sobject.network = new NetWorks(sobject.network.nodes);
    sobject.parents = new Parents(sobject.parents);
    sobject.srs = new Srs(sobject.srs);
    sobject.trs = new Trs(sobject.trs);
    sobject.version = new Version(sobject.version);

    


    Object.assign(this,sobject);
  }

  createObject(){
    this.actions.createObject(this.id);
  }
  modifyObject(obj){
    Object.assign(this,obj);
    this.actions.modifyObject(this.id);
  }
  deleteObject(){
    this.actions.deleteObject(this.id);
  }
  //attribute
  addAttribute(attribute){
    this.attributes.add(attribute);
    this.actions.addAttribute(attribute.fid);
  }
  modifyAttribute(attribute){
    this.attributes.modify(attribute);
    this.actions.modifyAttribute(attribute.fid);
  }
  deleteAttribute(attribute){
    this.attributes.remove(attribute);
    this.actions.deleteAttribute(attribute.fid)
  }
  //form
  addForm(){

  }
  modifyForm(){

  }
  deleteForm(){

  }
  //relation
  addRelation(){

  }
  modifyRelation(){

  }
  deleteRelation(){

  }
  //compose
  addCompose(){

  }
  modifyCompose(){

  }
  deleteCompose(){
    
  }
  //position
  addPosition(){

  }
  modifyPosition(){

  }
  deletePosition(){

  }
  isIncludeEntity(entityId){
   let bool = false;
   let reg = /[^0-9]/ig;
   if(typeof entityId === 'string') entityId = entityId.replace(reg,'');
   for(let i=0;i<this.forms.length;i++){
     let form = this.forms[i];
     if(form.geom.id == entityId){
       bool = true;
       return true;
     }
   } 
   return bool;
  }
  isRelatedByEntity(entityId){
    let reg = /[^0-9]/ig;
    if(typeof entityId === 'string') entityId = entityId.replace(reg,'');
    if(this.isIncludeEntity(entityId)) return true;
    for(let i = 0; i<this.forms.length;i++){
      let form = this.forms[i];
      let bool = form.geom.isRelated(entityId);
      if(bool) return true;
    }
    return false;
  }
}

export default Sobject;