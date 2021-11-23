import React, { useEffect } from 'react';
import {
  Button,
  H1,
  EditableText,
  Toast,
  Toaster,
  Position,
  Intent,
  IToaster,
} from '@blueprintjs/core';
import { Editor } from '@toast-ui/react-editor';
import { StyleSheet, css } from 'aphrodite';
import { useWindowWidth } from '@react-hook/window-size';

import '@toast-ui/editor/dist/toastui-editor.css';

import api from '../../lib/api';
import { Article } from '../../lib/interfaces';

const styles = StyleSheet.create({
  root: {
    minWidth: '300px',
    marginBottom: '1.45rem',
  },
  fillContainer: {
    width: '99.8%',
  },
  button: {
    marginTop: '1rem',
  },
});

const CreateArticle: React.FC = () => {
  const toaster = React.createRef<Toaster>();
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
    try {
      api.createArticle(article as Article);
      (toaster.current as Toaster).show({
        message: 'Succesfully created your post.',
        intent: Intent.SUCCESS,
        timeout: 1000,
        onDismiss: () => {
          alert(1);
        },
      });
    } catch (error) {
      (toaster.current as Toaster).show({
        message: 'Could not create post.',
        intent: Intent.DANGER,
        timeout: 1000,
      });
    }
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
      <Toaster
        canEscapeKeyClear
        position={Position.TOP}
        usePortal
        maxToasts={2}
        ref={toaster}
      ></Toaster>
    </div>
  );
};

export default CreateArticle;
