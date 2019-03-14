import OsmEntity from './OsmEntity';
import OsmWay from './OsmWay';
import OsmNode from './OsmNode';


class Member {
  constructor(member){
    this.setData(member)
  }
  setData(option){
    let member = {
      id:'',
      type:'',
      role:'',
      refEntity:{}
    }
    Object.assign(member,option);
    if(member.type=='way'){
      member.refEntity = new OsmWay(member.refEntity)
    }else if(member.type=='node'){
      member.refEntity = new OsmNode(member.refEntity);
    }else if(member.type=='relation'){
      member.refEntity = new OsmRelation(member.refEntity);
    }
    Object.assign(this,member);
  }
}

class OsmRelation extends OsmEntity {
  constructor(relation){
    super();
    this.setData(relation);
    // this['@type'] = 'Relation'
  }
  setData(option){
    let relation = {
      id:'',
      flag:0,
      type:'relation',
      members:[],
      tags:{
        type:'multipolygon'
      },
      uuid:'',
      vid:''
    }
    Object.assign(relation,option);
    relation.members = relation.members.map(member=>new Member(member));
    Object.assign(this,relation);
  }
  toGeoJson(){
    
  }
  isRelated(id){
    id = this.clearId(id);
    let member = this.members.find(el=>el.refEntity.isRelated(id));
    return Boolean(member);
  }
}

export default OsmRelation