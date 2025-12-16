import React, { useState } from "react";
import { FeatherSave, FeatherPlay, FeatherX, FeatherCode } from "@subframe/core";
import { Button } from "../ui/components/Button";
import { TextField } from "../ui/components/TextField";
import { TextArea } from "../ui/components/TextArea";
import { Select } from "../ui/components/Select";
import { Badge } from "../ui/components/Badge";

interface ScriptEditorProps {
  scriptName: string;
  onClose: () => void;
  onSave: (script: any) => void;
}

function ScriptEditor({ scriptName, onClose, onSave }: ScriptEditorProps) {
  const [name, setName] = useState(scriptName);
  const [code, setCode] = useState("// Your Google Cloud API script here\nfunction execute() {\n  // Use Google Cloud APIs\n  return {\n    status: 'success',\n    data: {}\n  };\n}");
  const [language, setLanguage] = useState("javascript");

  const handleSave = () => {
    onSave({ name, code, language });
  };

  return (
    <div className="flex h-full w-full flex-col items-start bg-default-background">
      <div className="flex w-full items-center justify-between border-b border-solid border-neutral-border px-6 py-4">
        <div className="flex items-center gap-3">
          <FeatherCode className="text-heading-3 font-heading-3 text-brand-600" />
          <span className="text-heading-3 font-heading-3 text-default-font">
            Script Editor
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="neutral">JavaScript</Badge>
          <Button
            variant="neutral-secondary"
            icon={<FeatherPlay />}
            onClick={() => {}}
          >
            Test Run
          </Button>
          <Button
            variant="brand-primary"
            icon={<FeatherSave />}
            onClick={handleSave}
          >
            Save Script
          </Button>
          <Button
            variant="neutral-tertiary"
            icon={<FeatherX />}
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>

      <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-4 overflow-y-auto px-6 py-6">
        <TextField
          className="h-auto w-full flex-none"
          variant="filled"
          label="Script Name"
          helpText=""
        >
          <TextField.Input
            placeholder="my-script"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </TextField>

        <Select
          className="h-auto w-full flex-none"
          variant="filled"
          label="Language"
          placeholder="Select language"
          helpText=""
          icon={null}
          value={language}
          onValueChange={setLanguage}
        >
          <Select.Item value="javascript">JavaScript</Select.Item>
          <Select.Item value="python">Python</Select.Item>
          <Select.Item value="typescript">TypeScript</Select.Item>
        </Select>

        <div className="flex w-full flex-col items-start gap-2">
          <span className="text-caption-bold font-caption-bold text-default-font">
            Script Code
          </span>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-96 rounded-md border border-solid border-neutral-border bg-neutral-50 px-4 py-3 font-mono text-body text-default-font resize-none focus:outline-none focus:border-brand-600"
            placeholder="Write your script here..."
          />
        </div>
      </div>
    </div>
  );
}

export default ScriptEditor;
