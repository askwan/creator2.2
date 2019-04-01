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
  normalized(context,entity){
    this.id = this.clearId(entity.id);
    this.uuid = entity.uuid;
    this.vid = entity.vid;
    this.members = entity.members.map(member=>{
      let refEntity;
      if(member.type==='node'){
        refEntity = new OsmNode().normalized(context,context.entity(member.id));
      }else if(member.type== 'way'){
        refEntity = new OsmWay().normalized(context,context.entity(member.id));
      }else if(member.type=='relation'){
        refEntity = new OsmRelation().normalized(context,context.entity(member.id));
      }
      return new Member({
        id:this.clearId(member.id),
        role:member.role,
        refEntity:refEntity
      });
    });
    return this;
  }
}

export default OsmRelation