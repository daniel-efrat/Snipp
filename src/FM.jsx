import React, { useState, useMemo } from "react"
import "./styles/mm.css"

const FF = ({ name, agentName, caseId, issue }) => {
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
        content: `תודה ${name}, ברשותך אקח כחמש דקות לבדוק את הפרטים מהצד שלי. מיד חוזרת!`,
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
      <div className="m-auto w-250">
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          placeholder="חיפוש..."
          className="p-2 m-2 border w-250 search_input"
        />
      </div>
      <div className="p-6 d-flex w-100">
        {/* Loop through filtered text snippets */}
        {filteredSnippets.map((snippet, index) => (
          <div
            key={index}
            className="p-2 m-2 text-right d-flex flex-column w-25 min-h-230 boxi"
            style={{ minHeight: "230px", wordWrap: "break-word" }}
          >
            <div className="box-body">
              <div dangerouslySetInnerHTML={{ __html: snippet.content }} />
            </div>
            <button
              onClick={() => copyToClipboard(snippet.content)}
              className="mt-4 copyBtn blueBtn"
            >
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
        ))}
      </div>
    </div>
  )
}

export default FF
