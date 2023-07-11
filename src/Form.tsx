import { Link } from "react-router-dom"

interface Post {
  snippet: string
  tag: string
}
interface FormProps {
  type: string
  post: Post
  setPost: React.Dispatch<React.SetStateAction<Post>>
  submitting: boolean
  handleSubmit: () => void
}

const Form: React.FC<FormProps> = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}) => {
  return (
    <section className="flex-col w-full max-w-full flex-center">
      <h1 className="text-left head_text">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="max-w-md text-left desc">
        {type} and share amazing snippets with the world, and left your
        imagination run wild with any AI-powered platform.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-2xl mt-10 gap-7 glassmorphism"
      >
        <label>
          <span className="text-base font-semibold text-gray-700 font-satoshi">
            Your AI Snippet
          </span>
          <textarea
            value={post.snippet}
            onChange={(e) => setPost({ ...post, snippet: e.target.value })}
            placeholder="Write your snippet here..."
            required
            className="form_textarea "
          />
        </label>
        <label>
          <span className="text-base font-semibold text-gray-700 font-satoshi">
            Tag {` `}
            <span className="font-normal">
              (#product, #webdevelopment, #idea)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>
        <div className="gap-4 mx-3 mb-5 flex-end">
          <Link className="text-sm text-gray-500" to="/">
           Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form
