import { geoVecInterp } from '../geo';
import {getEditor,ACTION} from '../../operate'

export function actionMoveNode(nodeID, toLoc) {
    getEditor().getGeomChange({operate:ACTION.moveNode,id:nodeID})    
    var action = function(graph, t) {
        if (t === null || !isFinite(t)) t = 1;
        t = Math.min(Math.max(+t, 0), 1);

        var node = graph.entity(nodeID);
        return graph.replace(
            node.move(geoVecInterp(node.loc, toLoc, t))
        );
    };

    action.transitionable = true;

    return action;
}
