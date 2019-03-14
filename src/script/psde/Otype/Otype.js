import Fields from './Fields'
import Srs from './Srs'
import Connectors from './Connectors'
import FormStyles from './FormStyles'
import User from './User'

class Otype {
  constructor(option){
    this.setData(option);
  }
  setData(option){
    let otype = {
      id:'',
      des:'',
      editType:'',
      fields:{},
      formStyles:{},
      connectors:{},
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
    otype.connectors = new Connectors(otype.connectors.connectors);
    otype.formStyles = new FormStyles(otype.formStyles.styles);
    otype.user = new User(otype.user);
    Object.assign(this,otype)
  }
}

export default Otype