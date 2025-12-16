import React from "react";
import { Handle, Position, NodeProps } from "reactflow";

function ConditionNode({ data, selected }: NodeProps) {
  return (
    <div
      className={`flex w-64 flex-col items-start gap-2 rounded-lg border bg-white px-4 py-3 shadow-sm transition-all ${
        selected
          ? "border-2 border-solid border-blue-500 shadow-md"
          : "border border-solid border-gray-300 hover:border-blue-500"
      }`}
    >
      <div className="flex w-full items-center gap-2">
        <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-purple-100">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-purple-600"
          >
            <line x1="6" y1="3" x2="6" y2="15"></line>
            <circle cx="18" cy="6" r="3"></circle>
            <circle cx="6" cy="18" r="3"></circle>
            <path d="M18 9a9 9 0 0 1-9 9"></path>
          </svg>
        </div>
        <span className="text-sm font-semibold text-gray-900">
          {data.label}
        </span>
      </div>
      <span className="text-xs text-gray-600">
        {data.description}
      </span>
      <div className="flex w-full justify-between text-xs mt-1">
        <span className="text-green-600">True</span>
        <span className="text-red-600">False</span>
      </div>
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-purple-500 !border-2 !border-white"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="true"
        style={{ left: "33%" }}
        className="!w-3 !h-3 !bg-green-500 !border-2 !border-white"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="false"
        style={{ left: "66%" }}
        className="!w-3 !h-3 !bg-red-500 !border-2 !border-white"
      />
    </div>
  );
}

export default ConditionNode;