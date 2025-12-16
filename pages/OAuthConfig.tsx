import React, { useState } from "react";
import {
  FeatherKey,
  FeatherCheckCircle,
  FeatherAlertCircle,
  FeatherExternalLink,
  FeatherCopy,
  FeatherSettings,
} from "@subframe/core";
import { Button } from "../ui/components/Button";
import { TextField } from "../ui/components/TextField";
import { TextArea } from "../ui/components/TextArea";
import { Badge } from "../ui/components/Badge";
import { Alert } from "../ui/components/Alert";
import { Switch } from "../ui/components/Switch";
import { Accordion } from "../ui/components/Accordion";

function OAuthConfig() {
  const [clientId, setClientId] = useState("123456789.apps.googleusercontent.com");
  const [clientSecret, setClientSecret] = useState("GOCSPX-xxxxxxxxxxxxxxxxxxxx");
  const [redirectUri, setRedirectUri] = useState("https://localhost:3000/oauth/callback");
  const [scopes, setScopes] = useState(
    "https://www.googleapis.com/auth/cloud-platform\nhttps://www.googleapis.com/auth/compute"
  );
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  const handleTestConnection = () => {
    alert("Testing OAuth connection...");
  };

  return (
    <div className="flex h-full w-full flex-col items-start bg-default-background">
      <div className="flex w-full items-center justify-between border-b border-solid border-neutral-border px-6 py-4">
        <div className="flex items-center gap-3">
          <FeatherSettings className="text-heading-2 font-heading-2 text-brand-600" />
          <span className="text-heading-2 font-heading-2 text-default-font">
            Google Cloud OAuth Configuration
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <Badge variant="success" icon={<FeatherCheckCircle />}>
              Connected
            </Badge>
          ) : (
            <Badge variant="error" icon={<FeatherAlertCircle />}>
              Not Connected
            </Badge>
          )}
        </div>
      </div>

      <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-6 overflow-y-auto px-6 py-6">
        <Alert
          variant="brand"
          icon={<FeatherKey />}
          title="OAuth 2.0 Setup"
          description="Configure your Google Cloud OAuth credentials to authenticate API requests. You'll need to create OAuth 2.0 Client IDs in the Google Cloud Console."
        />

        <div className="flex w-full items-center justify-between rounded-lg border border-solid border-neutral-border bg-default-background px-4 py-4">
          <div className="flex flex-col items-start gap-1">
            <span className="text-body-bold font-body-bold text-default-font">
              Google Cloud Console
            </span>
            <span className="text-caption font-caption text-subtext-color">
              Create and manage OAuth credentials
            </span>
          </div>
          <Button
            variant="neutral-secondary"
            icon={<FeatherExternalLink />}
            onClick={() =>
              window.open("https://console.cloud.google.com/apis/credentials", "_blank")
            }
          >
            Open Console
          </Button>
        </div>

        <div className="flex w-full flex-col items-start gap-4">
          <Accordion
            trigger={
              <div className="flex w-full items-center gap-2 px-4 py-3">
                <span className="grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                  OAuth Client Configuration
                </span>
                <Accordion.Chevron />
              </div>
            }
            defaultOpen={true}
          >
            <div className="flex w-full flex-col items-start gap-4 px-4 pb-4">
              <TextField
                className="h-auto w-full flex-none"
                variant="filled"
                label="Client ID"
                helpText="Your Google Cloud OAuth 2.0 Client ID"
              >
                <TextField.Input
                  placeholder="123456789.apps.googleusercontent.com"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                />
              </TextField>

              <TextField
                className="h-auto w-full flex-none"
                variant="filled"
                label="Client Secret"
                helpText="Your Google Cloud OAuth 2.0 Client Secret"
              >
                <TextField.Input
                  type="password"
                  placeholder="GOCSPX-xxxxxxxxxxxxxxxxxxxx"
                  value={clientSecret}
                  onChange={(e) => setClientSecret(e.target.value)}
                />
              </TextField>

              <TextField
                className="h-auto w-full flex-none"
                variant="filled"
                label="Redirect URI"
                helpText="Authorized redirect URI for your application"
              >
                <TextField.Input
                  placeholder="https://localhost:3000/oauth/callback"
                  value={redirectUri}
                  onChange={(e) => setRedirectUri(e.target.value)}
                />
              </TextField>

              <div className="flex w-full items-center gap-2">
                <Button
                  variant="neutral-tertiary"
                  icon={<FeatherCopy />}
                  onClick={() => navigator.clipboard.writeText(redirectUri)}
                >
                  Copy Redirect URI
                </Button>
              </div>
            </div>
          </Accordion>

          <Accordion
            trigger={
              <div className="flex w-full items-center gap-2 px-4 py-3">
                <span className="grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                  API Scopes
                </span>
                <Accordion.Chevron />
              </div>
            }
            defaultOpen={true}
          >
            <div className="flex w-full flex-col items-start gap-4 px-4 pb-4">
              <TextArea
                className="h-auto w-full flex-none"
                variant="filled"
                label="OAuth Scopes"
                helpText="One scope per line"
              >
                <TextArea.Input
                  placeholder="https://www.googleapis.com/auth/cloud-platform"
                  value={scopes}
                  onChange={(e) => setScopes(e.target.value)}
                />
              </TextArea>

              <div className="flex w-full flex-col items-start gap-2">
                <span className="text-caption-bold font-caption-bold text-default-font">
                  Common Scopes
                </span>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="neutral">cloud-platform</Badge>
                  <Badge variant="neutral">compute</Badge>
                  <Badge variant="neutral">storage</Badge>
                  <Badge variant="neutral">datastore</Badge>
                  <Badge variant="neutral">pubsub</Badge>
                </div>
              </div>
            </div>
          </Accordion>

          <Accordion
            trigger={
              <div className="flex w-full items-center gap-2 px-4 py-3">
                <span className="grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                  Advanced Settings
                </span>
                <Accordion.Chevron />
              </div>
            }
            defaultOpen={false}
          >
            <div className="flex w-full flex-col items-start gap-4 px-4 pb-4">
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col items-start">
                  <span className="text-caption-bold font-caption-bold text-default-font">
                    Auto-refresh tokens
                  </span>
                  <span className="text-caption font-caption text-subtext-color">
                    Automatically refresh access tokens
                  </span>
                </div>
                <Switch checked={true} onCheckedChange={() => {}} />
              </div>

              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col items-start">
                  <span className="text-caption-bold font-caption-bold text-default-font">
                    Store refresh token
                  </span>
                  <span className="text-caption font-caption text-subtext-color">
                    Save refresh token securely
                  </span>
                </div>
                <Switch checked={true} onCheckedChange={() => {}} />
              </div>

              <TextField
                className="h-auto w-full flex-none"
                variant="filled"
                label="Token expiry (seconds)"
                helpText="Access token expiration time"
              >
                <TextField.Input
                  placeholder="3600"
                  value="3600"
                  onChange={() => {}}
                />
              </TextField>
            </div>
          </Accordion>
        </div>

        <div className="flex w-full items-center gap-2">
          <Button
            className="grow shrink-0 basis-0"
            variant="neutral-secondary"
            onClick={handleTestConnection}
          >
            Test Connection
          </Button>
          {isConnected ? (
            <Button
              className="grow shrink-0 basis-0"
              variant="neutral-secondary"
              onClick={handleDisconnect}
            >
              Disconnect
            </Button>
          ) : (
            <Button
              className="grow shrink-0 basis-0"
              variant="brand-primary"
              icon={<FeatherCheckCircle />}
              onClick={handleConnect}
            >
              Connect OAuth
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default OAuthConfig;
