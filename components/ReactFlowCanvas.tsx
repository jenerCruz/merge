import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  BackgroundVariant,
  Node,
  NodeTypes,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./nodes/CustomNode";
import TriggerNode from "./nodes/TriggerNode";
import FunctionNode from "./nodes/FunctionNode";
import ApiNode from "./nodes/ApiNode";
import ConditionNode from "./nodes/ConditionNode";

const nodeTypes: NodeTypes = {
  custom: CustomNode,
  trigger: TriggerNode,
  function: FunctionNode,
  api: ApiNode,
  condition: ConditionNode,
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "trigger",
    data: { label: "Start Trigger", description: "HTTP Request" },
    position: { x: 250, y: 50 },
  },
  {
    id: "2",
    type: "api",
    data: { label: "API Gateway", description: "api-gateway-prod" },
    position: { x: 250, y: 200 },
  },
  {
    id: "3",
    type: "function",
    data: { label: "Cloud Function", description: "process-payment" },
    position: { x: 250, y: 350 },
  },
  {
    id: "4",
    type: "custom",
    data: { label: "Success Response", description: "Return 200 OK", variant: "success" },
    position: { x: 250, y: 500 },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "#3b82f6", strokeWidth: 2 } },
  { id: "e2-3", source: "2", target: "3", animated: true, style: { stroke: "#3b82f6", strokeWidth: 2 } },
  { id: "e3-4", source: "3", target: "4", animated: true, style: { stroke: "#3b82f6", strokeWidth: 2 } },
];

interface ReactFlowCanvasProps {
  onNodeSelect?: (node: Node | null) => void;
  onAddNode?: (type: string) => void;
}

function ReactFlowCanvas({ onNodeSelect, onAddNode }: ReactFlowCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge({
      ...params,
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 2 }
    }, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      if (onNodeSelect) {
        onNodeSelect(node);
      }
    },
    [onNodeSelect]
  );

  const onPaneClick = useCallback(() => {
    if (onNodeSelect) {
      onNodeSelect(null);
    }
  }, [onNodeSelect]);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-50"
      >
        <Controls className="bg-white border border-gray-300 rounded-md" />
        <MiniMap
          className="bg-white border border-gray-300 rounded-md"
          nodeColor={(node) => {
            switch (node.type) {
              case "trigger":
                return "#3b82f6";
              case "api":
                return "#f59e0b";
              case "function":
                return "#3b82f6";
              case "condition":
                return "#a855f7";
              default:
                return "#6b7280";
            }
          }}
        />
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={16} 
          size={1} 
          className="bg-gray-50"
        />
      </ReactFlow>
    </div>
  );
}

export default ReactFlowCanvas;