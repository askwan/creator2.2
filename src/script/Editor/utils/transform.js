import * as iD from '../modules'
import Member from './Member'

function createOsmNode (geom, tags, org,_t) {
  org = org || {}
  _t = _t || 'vertex';
  let nid = 'n' + geom.id;
  // console.log(geom,'geom');
  let node = new iD.osmNode({
    id: nid,
    visible: true,
    version: 1,
    changeset: 1,
    timestamp: org.realTime,
    user: 'min',
    uid: 0,
    loc: [geom.x,geom.y],
    tags: tags,
    orgData: org,
    uuid:geom.uuid,
    vid:geom.vid,
    _t:_t,
    height:getHeight(org).height
  })
  return node
}

function createOsmWay (geom,tags,org,collection){
  org = org || {};
  let nodes = [];
  geom.nodes.forEach(n=>{
    let node = createOsmNode(n,{},org);
    collection.push(node);
    nodes.push(node.id);
  });

  let _way = createWay(nodes,geom.id,tags,org);
  _way.uuid = geom.uuid;
  collection.push(_way);
  return {
    lists:collection,
    entity:_way
  }

}

function createWay (nodes, id, tags, org) {
  org = org || {}
  let wid = 'w' + id
  let way = new iD.osmWay({
    id: wid,
    visible: true,
    version: 1,
    changeset: 1,
    timestamp: org.realTime,
    user: 'min',
    uid: 0,
    tags: tags,
    nodes: nodes,
    orgData: org,
    height:getHeight(org).height
  })
  return way
}


function createOsmRelation (geom,tags,org,collection){
  Object.assign(tags,{type: "multipolygon",area:'yes'});
  org = org||{};
  let members = [];
  geom.members.forEach(el=>{
    
    if(el.type=='node'){
      let node = createOsmNode(el,{},org);
      collection.push(new Member(node.id,el.role,node.type));
      members.push(node.id);
    }else if(el.type=='way'){
      if(el.refEntity && typeof el.refEntity=='object'){
        let option = {}
        // if(!el.refEntity) console.log(el,org,'entity')
        el.refEntity.id = el.id;
        if(el.refEntity.nodes[0].id===el.refEntity.nodes[el.refEntity.nodes.length-1].id){
          option.area = 'yes';
        }
        let obj = createOsmWay(el.refEntity,option,org,collection);
        obj.entity.vid = el.refEntity.vid;
        members.push(new Member(obj.entity.id,el.role,obj.entity.type));
        collection = obj.lists;
      }else{
        members.push(new Member('w'+el.id,el.role,el.type));
        collection = collection.concat([]);
      }
    }else if(el.type=='relation'){
      let obj = createOsmRelation(el.refEntity,{},org,collection)
      members.push(new Member(obj.entity.id,el.role,obj.entity.type));
      collection = obj.lists;
    }
  })
  let relation = createRelation(members,geom.id,tags,org);
  relation.uuid = geom.uuid;
  relation.vid = geom.vid;
  return {
    lists:collection,
    entity:relation
  }
}

function createRelation (members, id, tags, org) {
  org = org || {}
  let rId = 'r' + id
  let relation = new iD.osmRelation({
    id: rId,
    visible: true,
    version: 1,
    changeset: 1,
    timestamp: org.realTime,
    user: 'min',
    uid: 0,
    tags: tags,
    members: members,
    orgData: org,
    height:getHeight(org).height
  })
  return relation
}

function getTags (attributes) {
  let tags = {};
  if (attributes) {
    attributes.forEach(attr => {
      tags[attr.name] = attr.value
    })
    // tags.name = sobject.name
  // tags[sobject.name] = "*"
  }

  return tags
}

// function transformObject (context,object){
//   let _obj = JSON.parse(JSON.stringify(object));
//   _obj.forms.forEach(form=>{
//     if(form.geom){
//       let entity = context.entity(form.geom);
//       if(entity.type=='node'){
//         form.geom = new osm.OsmNode(entity);
//       }else if(entity.type=='way'){
//         form.geom = new osm.OsmWay();
//         form.geom.setOsmWay(context,entity);
//       }else if(entity.type=='relation'){
//         form.geom = new osm.OsmRelation();
//         form.geom.setOsmRelation(context,entity);
//       } 
//       form.geom.clearId();
//     }
//   });
//   return _obj;
// }

const calcGeoBox = (context,sobject)=>{
  let geoBox = {
    minx:0,
    maxx:0,
    miny:0,
    maxy:0,
    minz:0,
    maxz:0
  };
  let forms = sobject.forms;
  let form = forms.find(el=>el.geom);
  let entity = context.entity(form.geom);
  if(entity.type=='node'){
    geoBox.minx = entity.loc[0];
    geoBox.maxx = entity.loc[0];
    geoBox.miny = entity.loc[1];
    geoBox.maxy = entity.loc[1];
  }else if(entity.type=='way'){
    let nodes = entity.nodes.map(el=>context.entity(el));
    Object.assign(geoBox,getBoundray(nodes));
  }else if(entity.type=='relation'){
    let members = entity.members;
    if(members.length==0){
      return geoBox
    }else{
      let member0 = members[0];
      if(member0){
        let member = context.entity(member0.id);
        if(member.type=='node'){
          geoBox.minx = member.loc[0];
          geoBox.maxx = member.loc[0];
          geoBox.miny = member.loc[1];
          geoBox.maxy = member.loc[1];
        }else if(member.type=='way'){
          let nodes = member.nodes.map(el=>context.entity(el));
          Object.assign(geoBox,getBoundray(nodes));
        }
      }
    }
  }

  return geoBox
}

const getBoundray = list =>{
  let obj = {
    minx:0,
    maxx:0,
    miny:0,
    maxy:0
  }
  list.forEach(el=>{
    let x = el.loc[0];
    let y = el.loc[1];
    if(x<obj.minx) obj.minx = x;
    if(x>obj.maxx) obj.maxx = x;
    if(y<obj.miny) obj.miny = y;
    if(y>obj.maxy) obj.maxy = y
  });
  return obj
}

const getHeight = (obj)=>{
  let height = 0;
  let heightAttr = obj.attributes.find(el=>el.name=='height');
  if(heightAttr){
    height = heightAttr.value = Number(heightAttr.value);
  }
  return {
    height:height
  }
}

export {
  createOsmNode,
  createOsmWay,
  createWay,
  createOsmRelation,
  createRelation,
  getTags,
  calcGeoBox
}