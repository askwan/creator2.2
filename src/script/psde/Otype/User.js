export default class User {
  constructor(user){
    this.setData(user)
  }
  setData(option={}){
    let user = {
      uid:'',
      userAvatar:'',
      userNickName:''
    }
    Object.assign(this,user,option);
  }
}