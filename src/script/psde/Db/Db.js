export default class DB {
  constructor(options){
    this._dbName = options.dbName;
    this._formName = options.formName;
    this._db = null;
    this._transaction = null;
    if(options.autoClear){
      this.deleteDb().then(()=>{
        this.init(options);
      })
    }else{
      this.init(options);
    }
  }
  init(options){
    this._request = indexedDB.open(options.dbName);
    this._request.onsuccess = (event)=>{
      // console.log('success open');
      this._db = event.target.result;
      this._transaction = this._db.transaction(this._formName,'readwrite');
    }
    this._request.onupgradeneeded = (event)=>{
      let db = event.target.result;
      if(!db.objectStoreNames.contains(this._formName)){
        console.log('创建新的存储对象');
        let objectStore;
        if(options.indexs.find(el=>el=='id')){
          objectStore = db.createObjectStore(this._formName,{keyPath:'id'});
        }else{
          objectStore = db.createObjectStore(this._formName,{keyPath:'id',autoIncrement:true});
        }
        for(let i in options.indexs){
          let key = options.indexs[i];
          objectStore.createIndex(key,key,{unique:false});
        }
      }
      console.log('数据库版本创建成功');
    }
  }
  createSheet(name){
    
  }
  insert(obj){
    return new Promise((resolve,reject)=>{
      this.query(obj).then(result=>{
        if(!result){
          let transaction = this._db.transaction(this._formName,'readwrite');
          let store = transaction.objectStore(this._formName);
          let request = store.add(obj);
          request.onsuccess = ()=>{
            resolve(result);
          }
          request.onerror = err=>{
            reject(err);
          }
        }else{
          Object.assign(result,obj);
          
          this.update(result).then(result=>{
            resolve(result);
          })
        }
      })
    })
  }
  query(obj){
    return new Promise((resolve,reject)=>{
      let transaction = this._db.transaction(this._formName,'readonly');
      let store = transaction.objectStore(this._formName);
      let index = store.index('id');
      let request = index.get(obj.id);
      request.onsuccess = (e)=>{
        resolve(e.target.result);
      };
      request.onerror = err=>{
        reject(err);
      }
    })
  }
  update(obj){
    return new Promise((resolve,reject)=>{
      let transaction = this._db.transaction(this._formName,'readwrite');
      let store = transaction.objectStore(this._formName);
      let request = store.put(obj);
      request.onsuccess = ()=>{
        resolve(obj);
      };
      request.onerror=err=>{
        reject(err)
      };
    })
  }
  querys(value,filter){
    return new Promise((resolve,reject)=>{
      let transaction = this._db.transaction(this._formName);
      let store = transaction.objectStore(this._formName);
      let index = store.index(filter);
      let result = [];
      let request = index.openCursor(value);
      request.onsuccess = event=>{
        let cursor = event.target.result;
        if(cursor){
          result.push(cursor.value);
          cursor.continue();
        }else{
          resolve(result);
        }
      };
      request.onerror = err=>{
        reject(err);
      }
    })
  }
  deleteData(obj){
    return new Promise((resolve,reject)=>{
      let transaction = this._db.transaction(this._formName,'readwrite');
      let store = transaction.objectStore(this._formName);
      this.query(obj).then(result=>{
        let request = store.delete(result._id);
        request.onsuccess = ()=>{
          resolve({
            message:'success'
          })
        };
        request.onerror=err=>{
          reject(err);
        };
      })
      
    })
  }
  deleteDb(){
    return new Promise((resolve,reject)=>{
      let deleteDbRequest = window.indexedDB.deleteDatabase(this._dbName);
      deleteDbRequest.onsuccess = ()=>{
        console.log('delete success');
        resolve();
      };
      deleteDbRequest.onerror = err=>{
        console.log("err",event);
        reject(err)
      }
    })
  }
}