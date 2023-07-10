import { Card, Button } from "react-bootstrap"
import React, { useState, useMemo } from "react"
import "./styles/mm.css"
import { FiEdit, FiCopy, FiSave, FiTrash2 } from "react-icons/fi"

const MM = ({ name, agentName, caseId, issue }) => {
  const [searchText, setSearchText] = useState("")

  const snippets = useMemo(
    () => [
      {
        title: "פתיחה בצ'אט",
        content: `
                    היי ${name},
                    כאן ${agentName} מצוות התמיכה של מטא פרו.
                    מספר הפנייה שלך להמשך מעקב: ${caseId}.
                    אני רואה שאתה פונה אלינו בקשר ל${issue},
                    אשמח לבדוק את העניין בשבילך.
                `,
      },
      {
        content: "תוכל בבקשה לומר לי מה מספר חשבון המודעות?",
      },
      {
        content: `תודה ${name}, ברשותך אקח כחמש דקות לבדוק את הפרטים מהצד שלי. מיד חוזר!`,
      },
      {
        content: `תודה על ההמתנה ${name}, האם אתה זמין בטלפון ______?`,
      },
    ],
    [name, caseId, issue, agentName]
  )
  const filteredSnippets = snippets.filter((snippet) =>
    snippet.content.toLowerCase().includes(searchText.toLowerCase())
  )

  const copyToClipboard = (content) => {
    const el = document.createElement("textarea")
    el.value = content
    document.body.appendChild(el)
    el.select()
    document.execCommand("copy")
    document.body.removeChild(el)
  }

  return (
    <div>
      {/* Input for searching */}
      <div className="w-250 m-auto">
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          placeholder="חיפוש..."
          className="w-250 p-2 m-2 border search_input"
        />
      </div>
      <div className="d-flex w-100 p-6">
        {/* Loop through filtered text snippets */}
        {filteredSnippets.map((snippet, index) => (
          <Card
            key={index}
            className="d-flex flex-column w-25 p-2 m-2 text-right min-h-230 card"
            style={{ minHeight: "230px", wordWrap: "break-word" }}
          >
            <Card.Body>
              <div dangerouslySetInnerHTML={{ __html: snippet.content }} />
            </Card.Body>
            <Button
              onClick={() => copyToClipboard(snippet.content)}
              className="mt-4 text-white copyBtn"
            >
              <FiCopy />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default MM
