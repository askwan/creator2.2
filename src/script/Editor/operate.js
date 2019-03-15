let editor;

const ACTION = {
  moveNode:'moveNode'
}






const getEditor = (_)=>{
  if(!_) return editor;
  editor = _;
}



export {
  getEditor,
  ACTION
}