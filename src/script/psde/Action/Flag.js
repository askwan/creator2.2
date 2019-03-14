

const ADDING = 1;
const MODIFY = 4
const DELETE = 2;
// const COPY = 8;
const BASE = 32;
const ATTRIBUTE = 64;
const FORM = 128;
const RELATION = 256;
const COMPOSE = 512;
const MODEL = 1024;
const POSITION = 2048;

const FLAG ={
  addAttribute:ADDING|ATTRIBUTE,
  modifyAttribute:MODIFY|ATTRIBUTE,
  deleteAttribute:DELETE|ATTRIBUTE,
  addForm:ADDING|FORM,
  modifyForm:MODIFY|FORM,
  deleteForm:DELETE|FORM,
  addRelation:ADDING|RELATION,
  modifyRelation:MODIFY|RELATION,
  deleteRelation:DELETE|RELATION,
  addCompose:ADDING|COMPOSE,
  modifyCompose:MODIFY|COMPOSE,
  deleteCompose:DELETE|COMPOSE,
  addModel:ADDING|MODEL,
  modifyModel:MODIFY|MODEL,
  deleteModel:DELETE|MODEL,
  addPosition:ADDING|POSITION,
  modifyPosition:ADDING|POSITION,
  deletePosition:DELETE|POSITION,
  createObject:ADDING|BASE,
  modifyObject:MODIFY|BASE,
  deleteObject:DELETE|BASE
}

export default FLAG