import Base from './Base';

export default class OtypeServer extends Base {
  constructor(option){
    super();
    this.url = option.url+'otype';
    this.name = 'otype';
    this.cache = this.cacheStatus(option.cache);
    this.defaultOption = {

    };
  }
  query(options={}){
    return new Promise((resolve,reject)=>{
      let option = Object.assign({},options,this.defaultOption)
      this.get('/query',option).then(res=>{
        resolve(res)
      },err=>reject(err))
    })
  }
}