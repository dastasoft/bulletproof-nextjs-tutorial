import ms from "ms";
import Markdown from "markdown-to-jsx";
import { useRouter } from "next/router";
import Head from "next/head";

import Youtube from "../../components/Youtube";
import Comments from "../../components/Comments";
import { getPostList, getPost } from "../../lib/data";
import findImageInMarkdown from "../../lib/find-image-in-markdown";

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
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.summary} />

        <meta name="twitter:card" content="summary_large_image" />

        <meta property="og:site_name" content="My Blog App" />
        <meta property="og:url" content={post.url} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.summary} />
        {post.image && <meta property="og:image" content={post.image} />}
      </Head>
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

  post.url = `${process.env.NEXT_PUBLIC_ROOT_URL}/post/${post.slug}`;
  post.summary = `${post.content.substr(0, 100)}`;
  post.image = findImageInMarkdown(post.content);

  return {
    props: {
      post,
    },
    revalidate: 2,
  };
}
