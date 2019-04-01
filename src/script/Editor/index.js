import './css/00_reset.css'
import './css/20_map.css'
import './css/25_areas.css'
import './css/30_highways.css'
import './css/35_aeroways.css'
import './css/40_railways.css'
import './css/45_waterways.css'
import './css/50_misc.css'
import './css/55_cursors.css'
import './css/60_photos.css'
import './css/65_data.css'
import './css/70_fills.css'
import './css/80_app.css'

import _debounce from 'lodash-es/debounce';

import Evented from './utils/Evented'
import * as iD from './modules'
import SobjectStore from './store/SobjectStore';
import OtypeStore from './store/OtypeStore'
import HistoryStore from './store/HistoryStore'
import { ACTION } from './operate';
// import psde from ''

let context;


export default class Editor extends Evented {
  constructor(dom,callback){
    super();
    this.sobjectStore = new SobjectStore();
    this.otypeStore = new OtypeStore();
    this.historyStore = new HistoryStore();
    this.debounceFn();
    this.init(dom,callback);
  }
  init(dom,callback){
    context = iD.Context();
    // context.assetPath('/public/')
    context.ui()(dom,()=>{
      this.setCenter({lng:120.9068145226417,lat:38.38792723587976,zoom:18})
      this.listen();
      if(typeof callback === 'function') callback();
    })
  }
  setCenter(option){
    let map = context.map();
    map.centerZoom([option.lng,option.lat],option.zoom);
  }
  listen(){
    context.on('selectEntity',ele=>{
      if(!ele) return
      // console.log(this.historyStore.getHistorys())
      // console.log(ele);
      
      // let sobject = this.sobjectStore.getByEntityId(ele);
      // console.log(sobject);
      // sobject.forms.forEach(el=>{
      //   console.log(el.geom,'form');
      //   console.log(el.geom.normalized(context,context.entity(ele),'transform'))
      // });
      // let sobjects = this.sobjectStore.getRelatedByEntityId(ele);
      // this.getChanged();
    })
    context.on('verifyEntity',()=>{
      this.getChanged();
    })
  }
  debounceFn(){
    let time = 300;
    this.getGeomChange = _debounce(this.getGeomChange,time);
  }
  addHistory(option){
    this.historyStore.addHistory(option)
  }
  getGeomChange(option){
    if(option.operate===ACTION.moveNode){
      let changed = this.changeForm(option.id)
      this.addHistory(changed);
    }
    
    
  }
  changeForm(id){
    let sobjects = this.sobjectStore.getRelatedByEntityId(id);
    // let entity = context.entity(id);
    // console.log(entity);
    // let change = {x:entity.loc[0],y:entity.loc[1],nodeId:id}
    // sobjects.forEach(sobject=>{
    //   let form = sobject.getFormByEntityId(id);
    //   form.geom.update({id:id,x:})
    // })
    // let ways = context.history().graph().parentWays(entity);
    
    
    let changed = {
      change:sobjects,
      operate:ACTION.moveNode
    };
    return changed
  }
  getChanged(){
    let graph = context.history().graph();
    let changes = Object.assign({},graph.entities);
    console.log(graph,'graph');
    // console.log('ways',this.sobjectStore.ways());
    // console.log('nodes',this.sobjectStore.nodes());
    // console.log('relations',this.sobjectStore.relations());
    let nodes = [] ,ways = [],relations = [];
    for(let id in changes){
      let change = changes[id];
      if(id.includes('n')){
        nodes.push({id,change})
      }else if(id.includes('w')){
        ways.push({id,change})
      }else if(id.includes('r')){
        relations.push({id,change})
      }
      // console.log(change);
      // let sobject = this.sobjectStore.getByEntityId(id);
      // let sobjects = this.sobjectStore.getRelatedByEntityId(id);
      // console.log(sobject,sobjects);
      
      // console.log(nodes,ways,relations);
      let a = this.sobjectStore.getFormByEntityId(id);
      console.log(a,888888)
    }

    //nodes
    // nodes.forEach(el=>{
    //   let sobjects = el.sobjectStore.getRelatedByEntityId(el.id);
    //   if(el.change){
    //     sobjects.forEach(sobject=>{
    //       sobject.forms.getFormByEntityId(el);
    //     })
    //   }
    // })

  }
}