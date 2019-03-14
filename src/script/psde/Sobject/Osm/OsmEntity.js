class OsmEntity {
  constructor () {
    this.id = 0

    /* 0:默认
     * 1:新增
     * 2:修改
     * 3:删除*/
    this.flag = 0
    // 引用对象
    this.refOb = {}
    this.type = ''
  }
  /**
   * 设置osm的上下文对象
   * @param {*} content 
   */
  setOsmContent (content) {
    this.content = content
  }
  updateFlag (flag) {
    // console.log(flag,this)
    if(this.flag==1) return;
    if(this.flag==3) return;
    if(this.id.includes('-')) return this.flag = 1;
    this.flag = flag
  }
  clearId(id){
    // delete this.refOb;
    if(typeof id == 'string') id = id.replace(/[^0-9]/ig,"");
    return id;
  }
  copy(form){
    Object.assign(this,form);
    return this;
  }
  
}

export default OsmEntity