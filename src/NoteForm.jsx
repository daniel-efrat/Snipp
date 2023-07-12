import React, { FormEvent, useRef, useState, useEffect } from "react"
import { Col, Form, Row, Stack } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import CreatableReactSelect from "react-select/creatable"
import { v4 as uuidV4 } from "uuid"
import Editor from "@toast-ui/editor"
import "@toast-ui/editor/dist/toastui-editor.css"
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css"
import "./styles/NoteForm.css"

export function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}) {
  const titleRef = useRef(null)
  const editorRef = useRef(null)
  const editorInstance = useRef(null) // Keep a reference to editor instance
  const navigate = useNavigate()

  useEffect(() => {
    editorInstance.current = new Editor({
      el: editorRef.current,
      height: "500px",
      initialEditType: "wysiwyg",
      theme: "light",
      previewStyle: "tab",
    })

    return () => {
      // destroy editor instance to avoid memory leak
      editorInstance.current?.destroy()
    }
  }, [])

  const [selectedTags, setSelectedTags] = useState(tags)

  function handleSubmit(e) {
    e.preventDefault()

    const markdownContent = editorInstance.current?.getMarkdown() || ""

    onSubmit({
      title: titleRef.current.value,
      markdown: markdownContent,
      tags: selectedTags,
    })

    navigate("..")
  }

  const toggleDirection = (direction) => {
    if (editorRef.current) {
      editorRef.current.classList.toggle("rtl", direction === "rtl")
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>כותרת</Form.Label>
              <Form.Control ref={titleRef} required defaultValue={title} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>תגיות</Form.Label>
              <CreatableReactSelect
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label }
                  onAddTag(newTag)
                  setSelectedTags((prev) => [...prev, newTag])
                }}
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id }
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id }
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value }
                    })
                  )
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>

        <div ref={editorRef} className="editor rtl" id="editor"></div>

        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <button type="submit" className="primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
            </svg>
          </button>
          <Link to="..">
            <button type="button" className="outline-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#fff"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z" />
              </svg>{" "}
            </button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  )
}
