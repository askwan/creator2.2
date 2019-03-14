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

import Evented from './utils/Evented'
import * as iD from './modules'
import SobjectStore from './store/SobjectStore';
import OtypeStore from './store/OtypeStore'

let context;

export default class Editor extends Evented {
  constructor(dom,callback){
    super();
    this.sobjectStore = new SobjectStore();
    this.otypeStore = new OtypeStore();
    this.init(dom,callback);
  }
  init(dom,callback){
    context = iD.Context();
    // context.assetPath('/public/')
    context.ui()(dom,()=>{
      this.setCenter({lng:116.81213378906251,lat:32.27784451498272,zoom:20})
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
      // console.log(this.sobjectStore.getByEntityId(ele));
      // let sobjects = this.sobjectStore.getRelatedByEntityId(ele);
    })
  }
}