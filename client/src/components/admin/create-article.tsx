import * as React from 'react';
import { Button, H1, EditableText } from '@blueprintjs/core';

import { Editor } from '@toast-ui/react-editor';
import api from '../../lib/api';

import '@toast-ui/editor/dist/toastui-editor.css';

const CreateArticle: React.FC = () => {
  const tuiEditorRef = React.createRef<Editor>();
  const [article, setArticle] = React.useState<{
    title?: string;
    content?: string;
  }>({ title: '', content: '' });

  const saveArticle = (title?: string, content?: string) => {
    setArticle({
      ...article,
      title,
      content,
    });
  };

  const createArticle = () => {
    api.createArticle(article as Record<any, any>);
  };

  return (
    <div>
      <h1>Create article</h1>
      <Button
        text="Create post"
        style={{ margin: '1em', alignSelf: 'center' }}
        onClick={() => createArticle()}
      />
      <H1>
        <EditableText
          placeholder="Click to edit the title"
          onConfirm={value => saveArticle(value)}
        />
      </H1>
      <Editor
        initialValue="hello react editor world!"
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        ref={tuiEditorRef}
        onChange={() => {
          saveArticle(
            article!.title,
            tuiEditorRef.current!.getInstance().getMarkdown()
          );
        }}
      />
    </div>
  );
};

export default CreateArticle;
