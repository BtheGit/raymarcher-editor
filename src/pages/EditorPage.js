import React from 'react';
import Editor from '../components/editor';
import PreviewPane from '../components/preview-pane';
import './EditorPage.css';

const EditorPage = () => {
  return (
    <>
      <Editor />
      <PreviewPane />
    </>
  );
}

export default EditorPage;