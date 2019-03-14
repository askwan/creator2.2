
import * as formated from './transform'
// import psde from '../psde'
import Psde from '../../psde'
import {getEditor} from '@/script/operate';
const parse = list =>{
  let entities = [];
  let editor = getEditor();
  for(let i=0;i<list.length;i++){
    // let sobject = new psde.SObject();
    // sobject.copyObject(list[i]);
    editor.sobjectStore.add(new Psde.Sobject(list[i]));
    let sobject = list[i];
    sobject.forms.forEach(form=>{
      let tags = formated.getTags(sobject.attributes);
      if(form.geotype==21){
        let node = formated.createOsmNode(form.geom,tags,sobject,'point');
        entities.push(node);
        // form.geom = oNode.id;
        form.geomref = 'n'+form.geomref;
      }else if(form.geotype==22 || form.geotype==23){
        let geom = form.geom
        let nodeids = []
        if(form.geom.nodes.length==0) return;
        for (let i = 0; i < form.geom.nodes.length; i++) {
          let node = form.geom.nodes[i]
          let oNode = formated.createOsmNode(node, {}, sobject)
          nodeids.push(oNode.id)
          entities.push(oNode)
          // form.geom = oNode.id;
        }
        if(form.geotype==23) tags.area = 'yes';
        let way = formated.createWay(nodeids, geom.uuid, tags, sobject);
        way.uuid = geom.uuid;
        way.vid = geom.vid;
        entities.push(way)
        // form.geom = way.id;
        form.geomref = "w"+form.geomref

      }else if(form.geotype == 24){

        let obj = formated.createOsmRelation(form.geom,tags,sobject,entities);
        entities = obj.lists;

        entities.push(obj.entity)
        // form.geom = obj.entity.id;
        form.geomref = 'r'+form.geomref;
        // State.cacheRelation(obj.entity);

      }
      
    });
    // console.log(sobject)
  }
  return entities;
}

export default (xml, callback, options)=>{
  // console.log(xml,callback,options);
  let arrs = [];
  if(xml.status==200){
    // console.log(xml,xml.data.list);
    arrs =  parse(xml.data.list,options);
  }

  callback(null,arrs);
}


