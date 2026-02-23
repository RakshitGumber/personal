import { Link } from "@tanstack/react-router";

export default function BlogCard({ blog }: any) {
  return (
    <div>
      <h2>
        <Link to="/blog/$slug" params={{ slug: blog.slug }}>
          {blog.title}
        </Link>
      </h2>

      <p>{blog.description}</p>
      <small>{blog.date}</small>
    </div>
  );
}
