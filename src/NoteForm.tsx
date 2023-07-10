import React, { FormEvent, useRef, useState, useEffect } from "react"
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import CreatableReactSelect from "react-select/creatable"
import { NoteData, Tag } from "./App"
import { v4 as uuidV4 } from "uuid"
import Editor from "@toast-ui/editor"
import "@toast-ui/editor/dist/toastui-editor.css"
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css"
import "./styles/NoteForm.css"
import { AiOutlineRollback, AiOutlineSave } from "react-icons/Ai"

type NoteFormProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
} & Partial<NoteData>

export function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)
  const editorInstance = useRef<Editor | null>(null) // Keep a reference to editor instance
  const navigate = useNavigate()

  useEffect(() => {
    editorInstance.current = new Editor({
      el: editorRef.current!,
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

  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const markdownContent = editorInstance.current?.getMarkdown() || ""

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownContent,
      tags: selectedTags,
    })

    navigate("..")
  }

  const toggleDirection = (direction: string) => {
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
          <Button type="submit" variant="primary">
            <AiOutlineSave />
          </Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              <AiOutlineRollback />
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  )
}
