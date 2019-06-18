import React from 'react';
import Editor from '../components/editor';
import PreviewPane from '../components/preview-pane';
import OutputEditor from '../components/output-editor';
import './EditorPage.css';

const EditorPage = () => {
  return (
    <>
      <Editor />
      <PreviewPane />
      <OutputEditor />
    </>
  );
}

export default EditorPage;