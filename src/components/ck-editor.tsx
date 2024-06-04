import React, { useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { TOOLBAR } from "@/utils/constant";
import handleToast from "@/utils/handleToast";

interface CKeditorProps {
  onChange: (data: string) => void;
  editorLoaded: boolean;
  name: string;
  value: string;
  errorMessage?: string;
  isRequired?: boolean;
}

type EditorRef = {
  CKEditor: typeof CKEditor;
  ClassicEditor: typeof ClassicEditor;
};

export default function CKeditor({
  onChange,
  editorLoaded,
  value,
  errorMessage,
  isRequired,
}: CKeditorProps) {
  const editorRef = useRef<EditorRef>();
  const config = { toolbar: TOOLBAR };

  useEffect(() => {
    editorRef.current = { CKEditor, ClassicEditor };
  }, []);

  useEffect(() => {
    if (isRequired && !value) handleToast(errorMessage, "error");
  }, [value, isRequired, errorMessage]);

  return (
    <>
      <style>{`.ck-editor__editable_inline { min-height: auto; min-width: 1000px; }`}</style>
      {editorLoaded ? (
        <CKEditor
          editor={ClassicEditor}
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
          config={config}
        />
      ) : (
        <div>Editor loading..</div>
      )}
    </>
  );
}
