import { getPosts } from "@/lib/pocketbase";

export async function GET() {
  const postsRes = await getPosts({ perPage: 50 });
  const posts = postsRes.items;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.xyzus.my.id";

  const feedItems = posts
    .map((post) => {
      const postUrl = `${siteUrl}/blog/${post.slug}`;
      const pubDate = post.published_at
        ? new Date(post.published_at).toUTCString()
        : new Date().toUTCString();

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.excerpt || post.abstract || ""}]]></description>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${post.category || "General"}]]></category>
    </item>`;
    })
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Mahesa Tirtha Agung Permana - Publikasi &amp; Karya Tulis</title>
    <link>${siteUrl}</link>
    <description>Publikasi ilmiah, paper riset, dan catatan rekayasa mekatronika &amp; IoT.</description>
    <language>id</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${feedItems}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
