import { useMemo, useState } from "react"
import { Badge, Card, Col, Form, Modal, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import ReactSelect from "react-select"
import "./styles/NoteList.css"
import ReactMarkdown from "react-markdown"
import Top from "./Top"
import Logo from "./assets/quipper-logo.png"
import USA from "./assets/usa.png"
import ISR from "./assets/isr.png"

export function NoteList({ availableTags, notes, onUpdateTag, onDeleteTag }) {
  const [selectedTags, setSelectedTags] = useState([])
  const [title, setTitle] = useState("")
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false)

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      )
    })
  }, [title, selectedTags, notes])
  return (
    <>
      <Row className="mb-4 align-items-center">
        <Col>
          <img width="200px" src={Logo} alt="" />
          <h3 className="logo">סְנִיפֶּטְס</h3>
        </Col>
        <Col>
          
          <div className="lang">
            <Link to="/">
              <img src={ISR} alt="" />
            </Link>
            <Link to="https://quipper-en.netlify.app">
              <img src={USA} alt="" />
            </Link>
          </div>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <button className="primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  fill="#ffffff"
                >
                  <path d="M453-280h60v-166h167v-60H513v-174h-60v174H280v60h173v166Zm27.266 200q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80-397.681 80-480.5q0-82.819 31.5-155.659Q143-709 197.5-763t127.341-85.5Q397.681-880 480.5-880q82.819 0 155.659 31.5Q709-817 763-763t85.5 127Q880-563 880-480.266q0 82.734-31.5 155.5T763-197.684q-54 54.316-127 86Q563-80 480.266-80Zm.234-60Q622-140 721-239.5t99-241Q820-622 721.188-721 622.375-820 480-820q-141 0-240.5 98.812Q140-622.375 140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z" />
                </svg>
              </button>
            </Link>
            <button
              onClick={() => setEditTagsModalIsOpen(true)}
              className="outline-secondary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                fill="#fff"
              >
                <path d="M120-40v-700q0-24 18-42t42-18h480q24 0 42.5 18t18.5 42v700L420-167 120-40Zm60-91 240-103 240 103v-609H180v609Zm600 1v-730H233v-60h547q24 0 42 18t18 42v730h-60ZM180-740h480-480Z" />
              </svg>
            </button>
          </Stack>
        </Col>
      </Row>
      <Row>
        <Col>
          <Top />
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>חיפוש טקסט</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>חיפוש תגיות</Form.Label>
              <ReactSelect
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
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard
              id={note.id}
              title={note.title}
              tags={note.tags}
              markdown={note.markdown}
            />
          </Col>
        ))}
      </Row>
      <EditTagsModal
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
        availableTags={availableTags}
      />
    </>
  )
}

function NoteCard({ id, title, tags, markdown }) {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(markdown).then(() => {
      console.log("Markdown text copied to clipboard")
    })
  }

  return (
    <div className="h-100 text-reset text-decoration-none card">
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-between h-100"
        >
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="flex-wrap justify-content-center"
            >
              {tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
          <div className="note-content">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
          <div className="cardBtns">
            {/* Edit button */}
            <div className="editBtn">
              <Link to={`/${id}`}>
                <button className="primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 15 15"
                  >
                    <path
                      fill="#FFF"
                      fill-rule="evenodd"
                      d="M7.5 11c-2.697 0-4.97-1.378-6.404-3.5C2.53 5.378 4.803 4 7.5 4s4.97 1.378 6.404 3.5C12.47 9.622 10.197 11 7.5 11Zm0-8C4.308 3 1.656 4.706.076 7.235a.5.5 0 0 0 0 .53C1.656 10.294 4.308 12 7.5 12s5.844-1.706 7.424-4.235a.5.5 0 0 0 0-.53C13.344 4.706 10.692 3 7.5 3Zm0 6.5a2 2 0 1 0 0-4a2 2 0 0 0 0 4Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </Link>
            </div>
            {/* Copy button */}
            <div className="copyBttn">
              <button className="secondary copyBttn" onClick={handleCopyClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#ffffff"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                </svg>
              </button>
            </div>
          </div>
        </Stack>
      </Card.Body>
    </div>
  )
}
function EditTagsModal({
  availableTags,
  handleClose,
  show,
  onDeleteTag,
  onUpdateTag,
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <button
                    onClick={() => onDeleteTag(tag.id)}
                    className="danger"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                      fill="#fff"
                    >
                      <path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z" />
                    </svg>
                  </button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
