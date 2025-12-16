import React from "react";
import { Handle, Position, NodeProps } from "reactflow";

function CustomNode({ data, selected }: NodeProps) {
  const variant = data.variant || "default";
  
  const getIcon = () => {
    switch (variant) {
      case "success":
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-600"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        );
      case "error":
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-red-600"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        );
      default:
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-600"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          </svg>
        );
    }
  };

  const getBgColor = () => {
    switch (variant) {
      case "success":
        return "bg-green-100";
      case "error":
        return "bg-red-100";
      default:
        return "bg-gray-100";
    }
  };

  const getHandleColor = () => {
    switch (variant) {
      case "success":
        return "!bg-green-500";
      case "error":
        return "!bg-red-500";
      default:
        return "!bg-gray-500";
    }
  };

  return (
    <div
      className={`flex w-64 flex-col items-start gap-2 rounded-lg border bg-white px-4 py-3 shadow-sm transition-all ${
        selected
          ? "border-2 border-solid border-blue-500 shadow-md"
          : "border border-solid border-gray-300 hover:border-blue-500"
      }`}
    >
      <div className="flex w-full items-center gap-2">
        <div className={`flex h-8 w-8 flex-none items-center justify-center rounded-full ${getBgColor()}`}>
          {getIcon()}
        </div>
        <span className="text-sm font-semibold text-gray-900">
          {data.label}
        </span>
      </div>
      <span className="text-xs text-gray-600">
        {data.description}
      </span>
      <Handle
        type="target"
        position={Position.Top}
        className={`!w-3 !h-3 ${getHandleColor()} !border-2 !border-white`}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className={`!w-3 !h-3 ${getHandleColor()} !border-2 !border-white`}
      />
    </div>
  );
}

export default CustomNode;