import { Feed } from "feed";
import { getCollection } from "astro:content";
import { getContainerRenderer as getMDXRenderer } from "@astrojs/mdx";
import { loadRenderers } from "astro:container";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { authorName, siteUrl } from "@globals";

export async function GET() {
  const blog = await getCollection("blog");

  const renderers = await loadRenderers([getMDXRenderer()]);
  const container = await AstroContainer.create({ renderers });

  const feed = new Feed({
    title: authorName,
    id: siteUrl,
    link: siteUrl,
    language: "en",
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss: `${siteUrl}/rss.xml`,
    },
    author: {
      name: "Jan Buchar",
    },
  });

  for (const post of blog) {
    const url = `${siteUrl}/blog/${post.slug}`;

    const { Content } = await post.render();

    feed.addItem({
      title: post.data.title,
      id: url,
      link: url,
      content: await container.renderToString(Content),
      author: [
        {
          name: authorName,
        },
      ],
      date: new Date(post.data.date),
    });
  }

  return new Response(feed.atom1(), {
    headers: {
      "Content-Type": "application/atom+xml",
    },
  });
}
