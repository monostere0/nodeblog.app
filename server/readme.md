cloud-blog MVP 1

Entities

- Posts
  - Title
  - Content
  - Date
  - Author_name
  - Slug
   
- Users
 - Name
 - Email
 - Password
 - Date_created
 - Access_level

 Tech

 - Lambda
 - Dynamo
 - Node
 - Gatsby
 - Cognito
 - React
 - https://github.com/nhn/tui.editor
 - date-fns
 - blueprintjs
 - uuid/v4


 # architecture
 ### lambdas
  - getAllArticles
  - getArticleById
  - getArticleBySlug
  - createArticle
  - createAuthor

### tables
  - Posts
  - Users