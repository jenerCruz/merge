import React, { useState } from "react";
import {
  FeatherKey,
  FeatherPlus,
  FeatherTrash,
  FeatherEye,
  FeatherEyeOff,
  FeatherCopy,
  FeatherLock,
} from "@subframe/core";
import { Button } from "../ui/components/Button";
import { TextField } from "../ui/components/TextField";
import { TextArea } from "../ui/components/TextArea";
import { Badge } from "../ui/components/Badge";
import { IconButton } from "../ui/components/IconButton";
import { Dialog } from "../ui/components/Dialog";
import * as SubframeCore from "@subframe/core";

interface Secret {
  id: string;
  name: string;
  type: string;
  value: string;
  createdAt: string;
}

function SecretsManager() {
  const [secrets, setSecrets] = useState<Secret[]>([
    {
      id: "1",
      name: "google-client-id",
      type: "OAuth Client ID",
      value: "123456789.apps.googleusercontent.com",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "google-client-secret",
      type: "OAuth Client Secret",
      value: "GOCSPX-xxxxxxxxxxxxxxxxxxxx",
      createdAt: "2024-01-15",
    },
    {
      id: "3",
      name: "service-account-key",
      type: "Service Account",
      value: '{"type": "service_account", "project_id": "..."}',
      createdAt: "2024-01-20",
    },
  ]);

  const [showSecret, setShowSecret] = useState<{ [key: string]: boolean }>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSecret, setNewSecret] = useState({ name: "", type: "", value: "" });

  const toggleSecretVisibility = (id: string) => {
    setShowSecret((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddSecret = () => {
    if (newSecret.name && newSecret.type && newSecret.value) {
      const secret: Secret = {
        id: Date.now().toString(),
        name: newSecret.name,
        type: newSecret.type,
        value: newSecret.value,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setSecrets([...secrets, secret]);
      setNewSecret({ name: "", type: "", value: "" });
      setIsDialogOpen(false);
    }
  };

  const handleDeleteSecret = (id: string) => {
    setSecrets(secrets.filter((s) => s.id !== id));
  };

  return (
    <div className="flex h-full w-full flex-col items-start bg-default-background">
      <div className="flex w-full items-center justify-between border-b border-solid border-neutral-border px-6 py-4">
        <div className="flex items-center gap-3">
          <FeatherLock className="text-heading-2 font-heading-2 text-brand-600" />
          <span className="text-heading-2 font-heading-2 text-default-font">
            Google Cloud Secrets Manager
          </span>
        </div>
        <Button
          variant="brand-primary"
          icon={<FeatherPlus />}
          onClick={() => setIsDialogOpen(true)}
        >
          Add Secret
        </Button>
      </div>

      <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-4 overflow-y-auto px-6 py-6">
        {secrets.map((secret) => (
          <div
            key={secret.id}
            className="flex w-full flex-col items-start gap-3 rounded-lg border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm"
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100">
                  <FeatherKey className="text-body font-body text-brand-600" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-body-bold font-body-bold text-default-font">
                    {secret.name}
                  </span>
                  <span className="text-caption font-caption text-subtext-color">
                    {secret.type}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="neutral">Created {secret.createdAt}</Badge>
                <IconButton
                  size="small"
                  icon={showSecret[secret.id] ? <FeatherEyeOff /> : <FeatherEye />}
                  onClick={() => toggleSecretVisibility(secret.id)}
                />
                <IconButton
                  size="small"
                  icon={<FeatherCopy />}
                  onClick={() => navigator.clipboard.writeText(secret.value)}
                />
                <IconButton
                  size="small"
                  icon={<FeatherTrash />}
                  onClick={() => handleDeleteSecret(secret.id)}
                />
              </div>
            </div>
            <div className="w-full rounded-md bg-neutral-50 px-3 py-2">
              <span className="font-mono text-caption text-default-font break-all">
                {showSecret[secret.id] ? secret.value : "••••••••••••••••••••"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <SubframeCore.Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <SubframeCore.Dialog.Portal>
          <SubframeCore.Dialog.Overlay asChild={true}>
            <Dialog>
              <Dialog.Content>
                <div className="flex w-full flex-col items-start gap-4">
                  <span className="text-heading-3 font-heading-3 text-default-font">
                    Add New Secret
                  </span>
                  <TextField
                    className="h-auto w-full flex-none"
                    variant="filled"
                    label="Secret Name"
                    helpText="e.g., google-client-id"
                  >
                    <TextField.Input
                      placeholder="secret-name"
                      value={newSecret.name}
                      onChange={(e) =>
                        setNewSecret({ ...newSecret, name: e.target.value })
                      }
                    />
                  </TextField>
                  <TextField
                    className="h-auto w-full flex-none"
                    variant="filled"
                    label="Secret Type"
                    helpText="e.g., OAuth Client ID, API Key"
                  >
                    <TextField.Input
                      placeholder="OAuth Client ID"
                      value={newSecret.type}
                      onChange={(e) =>
                        setNewSecret({ ...newSecret, type: e.target.value })
                      }
                    />
                  </TextField>
                  <TextArea
                    className="h-auto w-full flex-none"
                    variant="filled"
                    label="Secret Value"
                    helpText="Paste your secret value here"
                  >
                    <TextArea.Input
                      placeholder="Paste secret value..."
                      value={newSecret.value}
                      onChange={(e) =>
                        setNewSecret({ ...newSecret, value: e.target.value })
                      }
                    />
                  </TextArea>
                  <div className="flex w-full items-center gap-2">
                    <Button
                      className="grow shrink-0 basis-0"
                      variant="neutral-secondary"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="grow shrink-0 basis-0"
                      variant="brand-primary"
                      icon={<FeatherPlus />}
                      onClick={handleAddSecret}
                    >
                      Add Secret
                    </Button>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog>
          </SubframeCore.Dialog.Overlay>
        </SubframeCore.Dialog.Portal>
      </SubframeCore.Dialog.Root>
    </div>
  );
}

export default SecretsManager;
