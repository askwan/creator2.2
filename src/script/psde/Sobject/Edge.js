import {Otype} from '../Otype';
import Properties from './Properties';
class Edge {
  constructor(edge){
    this.id = edge.id;
    this.intensity = edge.intensity;
    this.label = edge.label;
    this.properties = new Properties(edge.properties);
    this.relatedObjectId = edge.relatedObjectId;
    this.relation = new Otype(edge.relation);
    this.rules = edge.rules
  }
}

export default Edge;