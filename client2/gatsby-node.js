/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const api = require('./src/api');
const path = require('path');
global.fetch = require('isomorphic-fetch');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const articles = await api.getArticles();

  console.log('articles', articles);

  articles.forEach(article => {
    createPage({
      component: path.resolve(`./src/pages/article.tsx`),
      path: `/articles/${article.slug}`,
      context: {
        slug: article.slug,
      },
    });
  });
};

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /toastui|markdown/,
            use: ['null-loader'],
          },
        ],
      },
    });
  }
};
