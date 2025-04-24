/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/?redirect=portal#installation/NoNgNARATAdArDADBSBGRAWOBmEBOXAdj0IA5DFCoSpVUNE9STUpDVSR29ERTdkkAKYA7FIjDBUYCROlyAupADGAQ2UAjPqogKgA
 */

import React, { useState, useEffect, useRef, useMemo } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Alignment,
  AutoLink,
  Autosave,
  BlockQuote,
  Bold,
  Bookmark,
  Code,
  CodeBlock,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalLine,
  Indent,
  IndentBlock,
  Italic,
  Link,
  Paragraph,
  PlainTableOutput,
  RemoveFormat,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableLayout,
  TableProperties,
  TableToolbar,
  Underline,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

import "./EditorStyles.css";

const LICENSE_KEY =
  "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDY2NjIzOTksImp0aSI6ImQwOWFjNjcwLTdiODktNDM5MC1iMWI5LTUxODc1Zjk4Mjk2ZCIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImYwMjUyMDJkIn0.AKi7xhrHlDYwc9yCj3kOops9tt5S0_XOmCn4b9ujnhyuh922-CxbQqe2IGD_HWAKbxrdBhEiiudaPVKlo7MdXQ";

export default function Editor({ onChange }) {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }

    return {
      editorConfig: {
        toolbar: {
          items: [
            "heading",
            "|",
            "fontSize",
            "fontFamily",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "subscript",
            "superscript",
            "code",
            "removeFormat",
            "|",
            "horizontalLine",
            "link",
            "bookmark",
            "insertTable",
            "insertTableLayout",
            "highlight",
            "blockQuote",
            "codeBlock",
            "|",
            "alignment",
            "|",
            "outdent",
            "indent",
          ],
          shouldNotGroupWhenFull: false,
        },
        plugins: [
          Alignment,
          AutoLink,
          Autosave,
          BlockQuote,
          Bold,
          Bookmark,
          Code,
          CodeBlock,
          Essentials,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          Heading,
          Highlight,
          HorizontalLine,
          Indent,
          IndentBlock,
          Italic,
          Link,
          Paragraph,
          PlainTableOutput,
          RemoveFormat,
          Strikethrough,
          Subscript,
          Superscript,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableLayout,
          TableProperties,
          TableToolbar,
          Underline,
        ],
        fontFamily: {
          supportAllValues: true,
        },
        fontSize: {
          options: [10, 12, 14, "default", 18, 20, 22],
          supportAllValues: true,
        },
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
            {
              model: "heading1",
              view: "h1",
              title: "Heading 1",
              class: "ck-heading_heading1",
            },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2",
            },
            {
              model: "heading3",
              view: "h3",
              title: "Heading 3",
              class: "ck-heading_heading3",
            },
            {
              model: "heading4",
              view: "h4",
              title: "Heading 4",
              class: "ck-heading_heading4",
            },
            {
              model: "heading5",
              view: "h5",
              title: "Heading 5",
              class: "ck-heading_heading5",
            },
            {
              model: "heading6",
              view: "h6",
              title: "Heading 6",
              class: "ck-heading_heading6",
            },
          ],
        },
        initialData: "",
        licenseKey: LICENSE_KEY,
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: "https://",
          decorators: {
            toggleDownloadable: {
              mode: "manual",
              label: "Downloadable",
              attributes: {
                download: "file",
              },
            },
          },
        },
        placeholder: "Type or paste your content here!",
        table: {
          contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "tableProperties",
            "tableCellProperties",
          ],
        },
      },
    };
  }, [isLayoutReady]);

  return (
    <div className="main-container">
      <div
        className="editor-container editor-container_classic-editor"
        ref={editorContainerRef}
      >
        <div className="editor-container__editor">
          <div ref={editorRef}>
            {editorConfig && (
              <CKEditor
              editor={ClassicEditor}
              config={editorConfig}
              onChange={(event, editor) => {
                const data = editor.getData();
                onChange(data);
              }}
            />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
