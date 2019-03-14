import Action from '../Action/Actions'
export default class Sobject {
  constructor(obj){
    this.srs = {};
    this.actions = [];
    this.forms = [];
    this.models = {
      models:[]
    };
    this.network = {};
    this.compose = {};
    this.relatime = '';
    this.sdomain = 0;
    this.children = [];
    Object.assign(this,obj);
    this.form = this.forms.map(el=>{
      if(el.type===50 || el.type===40) {
        if (el.style.length==0) {
          el.style = [];
          el.style[0] = {
            scale: 1,
            smallPX: 0,
            x: 0,
            y: 0,
            z: 0,
            h:0
          };
        }
      }
      if(typeof el.style == "string" && el.style != "") {
        el.style = JSON.parse(el.style);
        if(el.style[0] && typeof el.style[0] == 'object'){
          let style = el.style[0];
          style.scale = style.scale || 1;
          style.smallPX = style.smallPX || 0;
          style.x = style.x || 0;
          style.y = style.y || 0;
          style.z = style.z || 0;
          style.h = style.h || 0;
        }
      }
      return el
    })
  }
  modifyObject(obj){
    Object.assign(this,obj);
    this.addAction(this.modifyObject,Action.MODIFY|Action.BASE);
  }

  deleteObject () {
    this.addAction(this.id, Action.DELETE | Action.BASE)
    return this
  }
  modyifyOtype(otype){
    this.otype = otype;
    if(!this.actions.find(el=>el.operation==33)){
      this.addAction(this.id, Action.MODIFY | Action.BASE)
    }
    return this;
  }
  addAttr (attr) {
    let index = this.attributes.findIndex(attribute => attribute.name == attr.name)
    if (index == -1) {
      this.attributes.push(attr)
    }else {
      this.attributes.splice(index, 1, attr)
    }
    this.addAction(attr.fid, Action.ADDING | Action.ATTRIBUTE)
    return this
  }
  deleteAttr (attr) {
    let addAction = this.getAction(0, Action.ADDING | Action.ATTRIBUTE)
    if (addAction) return this.deleteAction(addAction, addAction.operation)
    let modifyAction = this.getAction(attr.id, Action.MODIFY | Action.ATTRIBUTE)
    if (modifyAction) this.deleteAction(modifyAction.id, modifyAction.operation)
    // let index = this.attributes.findIndex(attribute => attribute.name == attr.name)
    this.addAction(attr.fid, Action.DELETE | Action.ATTRIBUTE)
    return this
  }
  modifyAttr (attr) {
    this.attributes = attr
    this.addAction(-1, Action.MODIFY | Action.ATTRIBUTE)
    let name = this.getAttrName(attr)
    if (name != null) {
      this.name = name
    }
    return this
  }
  addAction(id=0,operate){
    let addAction = this.actions.find(el=>el.operation==33)
    let deleteAction = this.getAction(id, Action.DELETE | Action.BASE)
    if (!addAction && !deleteAction) {
      let action = this.getAction(id, operate)
      if (!action) this.actions.push({id,operation:operate})
    }
  }
  getAction (id, operate) {
    return this.actions.find(action => action.id == id && operate == action.operation)
  }
  deleteAction (id, operate) {
    let index = this.actions.findIndex(el => el.id == id && el.operation == operate)
    this.actions.splice(index, 1)
  }
  findByOperation (operation) {
    return this.actions.filter(action => action.operation == operation)
  }
  getAttrName (attrs) {
    for (let i = 0;i < attrs.length;i++) {
      let attr = attrs[i]
      if (attr.name == 'name') {
        return attr.value
      }
    }
    return null
  }
}