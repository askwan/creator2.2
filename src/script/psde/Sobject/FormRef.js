class FormRef {
  constructor(formref){
    this.setData(formref)
  }
  setData(option){
    let formRef = {
      refid:'',
      name:'',
      des:'',
      fname:'',
      extension:'',
      mtime:''
    }
    Object.assign(formRef,option);
    Object.assign(this,formRef);
  }
}
export default FormRef