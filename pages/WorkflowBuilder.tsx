import React, { useState } from "react";
import ReactFlowCanvas from "../components/ReactFlowCanvas";
import { Node } from "reactflow";

function WorkflowBuilder() {
  const [project, setProject] = useState<string>("prod");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    functions: true,
    storage: false,
    pubsub: false,
    api: false,
    secrets: false,
    run: false,
  });

  const handleNodeSelect = (node: Node | null) => {
    setSelectedNode(node);
  };

  const toggleFolder = (folder: string) => {
    setExpandedFolders((prev) => ({ ...prev, [folder]: !prev[folder] }));
  };

  return (
    <div className="flex h-full w-full flex-col items-start bg-gray-50">
      <div className="flex w-full items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-gray-400">Workflows</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">GCP Integration Flow</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={project}
            onChange={(e) => setProject(e.target.value)}
            className="h-9 px-3 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="prod">prod</option>
            <option value="staging">staging</option>
            <option value="dev">dev</option>
          </select>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            Deployed
          </span>
          <button className="px-4 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Run
          </button>
          <button className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Deploy
          </button>
        </div>
      </div>

      <div className="flex w-full grow shrink-0 basis-0 items-start overflow-hidden">
        <div className="flex w-80 flex-none flex-col items-start self-stretch border-r border-gray-200 bg-white overflow-y-auto">
          <div className="flex w-full flex-col items-start gap-2 px-4 py-4">
            <div className="flex w-full items-center justify-between">
              <span className="text-base font-semibold text-gray-900">
                GCP Resources
              </span>
            </div>
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex w-full flex-col items-start">
            {["Cloud Functions", "Cloud Storage", "Pub/Sub", "API Gateway", "Secret Manager", "Cloud Run"].map((folder, idx) => (
              <div key={idx} className="w-full">
                <button
                  onClick={() => toggleFolder(folder.toLowerCase().replace(/\s+/g, ""))}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  {folder}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex grow shrink-0 basis-0 flex-col items-start self-stretch bg-gray-50">
          <div className="flex w-full items-center gap-2 border-b border-gray-200 bg-white px-4 py-3">
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
              Function
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
              API Call
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
              Condition
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
              Loop
            </button>
          </div>

          <div className="flex w-full grow shrink-0 basis-0 flex-col items-center justify-center overflow-hidden">
            <ReactFlowCanvas onNodeSelect={handleNodeSelect} />
          </div>
        </div>

        <div className="flex w-96 flex-none flex-col items-start self-stretch border-l border-gray-200 bg-white overflow-y-auto">
          <div className="flex w-full border-b border-gray-200">
            <button className="px-4 py-3 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
              Properties
            </button>
            <button className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">
              Environment
            </button>
            <button className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">
              Secrets
            </button>
          </div>

          <div className="flex w-full grow shrink-0 basis-0 flex-col items-start">
            {selectedNode ? (
              <div className="w-full p-4 space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Node Name
                  </label>
                  <input
                    type="text"
                    value={selectedNode.data.label || ""}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Node name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Node Type
                  </label>
                  <select
                    value={selectedNode.type || ""}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="trigger">Trigger</option>
                    <option value="function">Function</option>
                    <option value="api">API</option>
                    <option value="condition">Condition</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={selectedNode.data.description || ""}
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe the node purpose"
                  />
                </div>
              </div>
            ) : (
              <div className="flex w-full grow items-center justify-center p-6">
                <div className="text-center space-y-2">
                  <div className="text-sm font-medium text-gray-900">No Node Selected</div>
                  <div className="text-xs text-gray-500">Select a node from the canvas to edit its properties</div>
                </div>
              </div>
            )}
          </div>

          {selectedNode && (
            <div className="flex w-full items-center gap-2 border-t border-gray-200 px-4 py-4">
              <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Reset
              </button>
              <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Apply Changes
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex w-full items-center justify-between border-t border-gray-200 bg-white px-6 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-xs text-gray-600">Connected to GCP</span>
          </div>
          <div className="w-px h-4 bg-gray-300" />
          <span className="text-xs text-gray-500">Last saved: 2 minutes ago</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-600">4 Nodes</span>
          <span className="text-xs text-gray-600">3 Connections</span>
          <span className="text-xs text-green-600 font-medium">Ready to execute</span>
        </div>
      </div>
    </div>
  );
}

export default WorkflowBuilder;