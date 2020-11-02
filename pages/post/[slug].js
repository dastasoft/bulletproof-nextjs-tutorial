import ms from 'ms';
import Markdown from 'markdown-to-jsx';

import Youtube from '../../components/Youtube';
import githubCms from '../../lib/github-cms';

export default function Post({ post }) {
  return (
    <div className="post">
      <div className="time">
        Published {ms(Date.now() - post.createdAt, { long: true })} ago
      </div>
      <h1>{post.title}</h1>
      <Markdown
        options={{
          overrides: {
            Youtube: { component: Youtube }
          }
        }}
      >
        {post.content}
      </Markdown>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const post = await githubCms.getPost(params.slug);

  return {
    props: {
      post
    }
  };
}
