import * as React from 'react';
import { Button, H1, EditableText } from '@blueprintjs/core';
import { Editor } from '@toast-ui/react-editor';
import { StyleSheet, css } from 'aphrodite';
import { useWindowWidth } from '@react-hook/window-size';

import '@toast-ui/editor/dist/toastui-editor.css';

import api from '../../lib/api';
import { Article } from '../articles/articleContainer';

const styles = StyleSheet.create({
  root: {
    minWidth: '300px',
  },
  fillContainer: {
    width: '99.8%',
  },
  button: {
    marginTop: '1rem',
  },
});

const CreateArticle: React.FC = () => {
  const tuiEditorRef = React.createRef<Editor>();
  const [article, setArticle] = React.useState<{
    title?: string;
    content?: string;
  }>({ title: '', content: '' });
  const windowWidth = useWindowWidth();

  const saveArticle = (title?: string, content?: string) => {
    setArticle({
      ...article,
      title,
      content,
    });
  };

  const createArticle = () => {
    api.createArticle(article as Article);
  };

  return (
    <div className={css(styles.root)}>
      <H1 className={css(styles.fillContainer)}>
        <EditableText
          className={css(styles.fillContainer)}
          placeholder="Click to edit the title"
          onConfirm={value => saveArticle(value)}
        />
      </H1>
      <Editor
        placeholder="Write your awesome markdown powered article."
        previewStyle={windowWidth > 600 ? 'vertical' : 'tab'}
        height="400px"
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
      <Button
        icon="add"
        text="Save post"
        className={css(styles.button)}
        onClick={() => createArticle()}
      />
    </div>
  );
};

export default CreateArticle;
