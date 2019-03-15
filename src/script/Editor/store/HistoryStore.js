let historys = [];
export default class HistoryStore {
  constructor(){
    historys = [];
  }
  getHistorys(){
    return historys;
  }
  addHistory(history){
    historys.push(history);
  }
}