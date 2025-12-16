import React from "react";
import { Handle, Position, NodeProps } from "reactflow";

function TriggerNode({ data, selected }: NodeProps) {
  return (
    <div
      className={`flex w-64 flex-col items-start gap-2 rounded-lg border bg-white px-4 py-3 shadow-sm transition-all ${
        selected
          ? "border-2 border-solid border-blue-500 shadow-md"
          : "border border-solid border-gray-300 hover:border-blue-500"
      }`}
    >
      <div className="flex w-full items-center gap-2">
        <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-blue-100">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-600"
          >
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </div>
        <span className="text-sm font-semibold text-gray-900">
          {data.label}
        </span>
      </div>
      <span className="text-xs text-gray-600">
        {data.description}
      </span>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white"
      />
    </div>
  );
}

export default TriggerNode;