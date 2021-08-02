import * as React from 'react';
import { Link } from 'gatsby';
import { Button, H1, EditableText } from '@blueprintjs/core';

import Layout from '../../components/layout';
import Seo from '../../components/seo';
import api from '../../api';

// import { Editor } from '@toast-ui/react-editor';

// import '@toast-ui/editor/dist/toastui-editor.css';

const CreateArticlePage = () => {
  const tuiEditorRef = React.createRef<any>();
  const [article, setArticle] =
    React.useState<{ title: string; content: string }>();

  const saveArticle = (title?: string, content?: string) => {
    setArticle({
      ...article,
      title,
      content,
    });
  };

  const createArticle = () => {
    api.createArticle(article);
  };

  return (
    <Layout>
      <Seo title="Page two" />
      <h1>Articles page</h1>
      <p>Welcome to page 2</p>
      <Link to="/">Go back to the homepage</Link>
      <Button
        text="Create post"
        style={{ margin: '1em', alignSelf: 'center' }}
        onClick={() => createArticle()}
      />
      <H1>
        {/* <EditableText
          placeholder="Click to edit the title"
          onConfirm={value => saveArticle(value)}
        /> */}
      </H1>
      {/* <Editor
        initialValue="hello react editor world!"
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        ref={tuiEditorRef}
        onChange={() =>
          saveArticle(
            article.title,
            tuiEditorRef.current.getInstance().getMarkdown()
          )
        }
      /> */}
    </Layout>
  );
};

export default CreateArticlePage;
