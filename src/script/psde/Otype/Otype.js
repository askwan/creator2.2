import Fields from './Fields'
import Srs from './Srs'
import Connectors from './Connectors'
import FormStyles from './FormStyles'
import User from './User'
import Models from './Models';
import Trs from './Trs';

class Otype {
  constructor(option){
    this.setData(option);
  }
  setData(option){
    let otype = {
      id:'',
      des:'',
      editType:'',
      fields:[],
      formStyles:[],
      connectors:[],
      models:[],
      name:'',
      srs:{},
      tags:'',
      user:{},
      x:0,
      y:0
    }
    Object.assign(otype,option);
    otype.fields = new Fields(otype.fields.fields);
    otype.srs = new Srs(otype.srs);
    otype.trs = new Trs(otype.trs);
    otype.connectors = new Connectors(otype.connectors.connectors);
    otype.formStyles = new FormStyles(otype.formStyles.styles);
    otype.models = new Models(otype.models.models)
    otype.user = new User(otype.user);
    Object.assign(this,otype)
  }
  toJSON(){
    let obj = {};
    Object.assign(obj,this);
    obj.fields = {
      fields:obj.fields
    };
    obj.connectors = {
      connectors:obj.connectors
    }
    obj.formStyles = {
      styles:obj.formStyles
    }
    obj.models = {
      models:obj.models
    }
  }
}

export default Otype