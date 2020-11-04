import ms from "ms";
import Markdown from "markdown-to-jsx";
import { useRouter } from "next/router";

import Youtube from "../../components/Youtube";
import Comments from "../../components/Comments";
import { getPostList, getPost } from "../../lib/data";

export default function Post({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return <span>loading...</span>;
  }

  if (!post) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        404 - Page not found!
      </>
    );
  }

  return (
    <div className="post">
      <div className="time">
        Published {ms(Date.now() - post.createdAt, { long: true })} ago
      </div>
      <h1>{post.title}</h1>
      <div className="content">
        <Markdown
          options={{
            overrides: {
              Youtube: { component: Youtube },
            },
          }}
        >
          {post.content}
        </Markdown>
      </div>
      <b>Comments</b>
      <Comments slug={post.slug} />
    </div>
  );
}

export async function getStaticPaths() {
  const postList = await getPostList();
  const paths = postList.map(post => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  let post = null;

  try {
    post = await getPost(params.slug);
  } catch (err) {
    if (err.status !== 404) {
      throw err;
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 2,
  };
}
