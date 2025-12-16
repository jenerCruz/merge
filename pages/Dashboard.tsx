import React from "react";
import {
  FeatherZap,
  FeatherLock,
  FeatherSettings,
  FeatherFileCode,
  FeatherPlay,
  FeatherClock,
  FeatherCheckCircle,
  FeatherAlertCircle,
} from "@subframe/core";
import { Button } from "../ui/components/Button";
import { Badge } from "../ui/components/Badge";
import { DefaultPageLayout } from "../ui/layouts/DefaultPageLayout";

interface DashboardProps {
  onNavigate: (view: "workflow" | "script" | "secrets" | "oauth") => void;
}

function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start bg-default-background">
        <div className="flex w-full items-center justify-between border-b border-solid border-neutral-border px-6 py-4">
          <span className="text-heading-2 font-heading-2 text-default-font">
            Google Cloud Workflow Orchestrator
          </span>
          <Button
            variant="brand-primary"
            icon={<FeatherPlay />}
            onClick={() => onNavigate("workflow")}
          >
            Create Workflow
          </Button>
        </div>

        <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-6 overflow-y-auto px-6 py-6">
          <div className="grid w-full grid-cols-4 gap-4">
            <div
              className="flex flex-col items-start gap-3 rounded-lg border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm cursor-pointer hover:border-brand-600"
              onClick={() => onNavigate("workflow")}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100">
                <FeatherZap className="text-heading-3 font-heading-3 text-brand-600" />
              </div>
              <div className="flex flex-col items-start gap-1">
                <span className="text-body-bold font-body-bold text-default-font">
                  Workflows
                </span>
                <span className="text-caption font-caption text-subtext-color">
                  Build and manage workflows
                </span>
              </div>
              <Badge variant="neutral">12 Active</Badge>
            </div>

            <div
              className="flex flex-col items-start gap-3 rounded-lg border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm cursor-pointer hover:border-brand-600"
              onClick={() => onNavigate("script")}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success-100">
                <FeatherFileCode className="text-heading-3 font-heading-3 text-success-600" />
              </div>
              <div className="flex flex-col items-start gap-1">
                <span className="text-body-bold font-body-bold text-default-font">
                  Scripts
                </span>
                <span className="text-caption font-caption text-subtext-color">
                  Write and test scripts
                </span>
              </div>
              <Badge variant="neutral">24 Scripts</Badge>
            </div>

            <div
              className="flex flex-col items-start gap-3 rounded-lg border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm cursor-pointer hover:border-brand-600"
              onClick={() => onNavigate("secrets")}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-error-100">
                <FeatherLock className="text-heading-3 font-heading-3 text-error-600" />
              </div>
              <div className="flex flex-col items-start gap-1">
                <span className="text-body-bold font-body-bold text-default-font">
                  Secrets
                </span>
                <span className="text-caption font-caption text-subtext-color">
                  Manage API credentials
                </span>
              </div>
              <Badge variant="neutral">8 Secrets</Badge>
            </div>

            <div
              className="flex flex-col items-start gap-3 rounded-lg border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm cursor-pointer hover:border-brand-600"
              onClick={() => onNavigate("oauth")}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning-100">
                <FeatherSettings className="text-heading-3 font-heading-3 text-warning-600" />
              </div>
              <div className="flex flex-col items-start gap-1">
                <span className="text-body-bold font-body-bold text-default-font">
                  OAuth Config
                </span>
                <span className="text-caption font-caption text-subtext-color">
                  Configure authentication
                </span>
              </div>
              <Badge variant="success" icon={<FeatherCheckCircle />}>
                Connected
              </Badge>
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-3">
            <span className="text-heading-3 font-heading-3 text-default-font">
              Recent Workflows
            </span>
            <div className="flex w-full flex-col items-start gap-2">
              {[
                {
                  name: "GCP Integration Flow",
                  status: "success",
                  lastRun: "2 minutes ago",
                },
                {
                  name: "Data Processing Pipeline",
                  status: "running",
                  lastRun: "5 minutes ago",
                },
                {
                  name: "Payment Workflow",
                  status: "success",
                  lastRun: "1 hour ago",
                },
                {
                  name: "Email Notification Service",
                  status: "error",
                  lastRun: "3 hours ago",
                },
              ].map((workflow, index) => (
                <div
                  key={index}
                  className="flex w-full items-center justify-between rounded-lg border border-solid border-neutral-border bg-default-background px-4 py-3 shadow-sm cursor-pointer hover:border-brand-600"
                  onClick={() => onNavigate("workflow")}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100">
                      <FeatherZap className="text-body font-body text-brand-600" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-body-bold font-body-bold text-default-font">
                        {workflow.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <FeatherClock className="text-caption font-caption text-subtext-color" />
                        <span className="text-caption font-caption text-subtext-color">
                          Last run: {workflow.lastRun}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {workflow.status === "success" && (
                      <Badge variant="success" icon={<FeatherCheckCircle />}>
                        Success
                      </Badge>
                    )}
                    {workflow.status === "running" && (
                      <Badge variant="brand" icon={<FeatherPlay />}>
                        Running
                      </Badge>
                    )}
                    {workflow.status === "error" && (
                      <Badge variant="error" icon={<FeatherAlertCircle />}>
                        Error
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default Dashboard;
