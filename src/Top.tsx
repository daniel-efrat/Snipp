// components/MainComponent.js
"use client"

import MM from "./MM"
import MF from "./MF"
import FM from "./FM"
import FF from "./FF"
import "./styles/Top.css"
import React, { useState, useRef } from "react"

const Top = () => {
  const [agentName, setAgentName] = useState("")
  const [clientName, setClientName] = useState("")
  const [caseId, setCaseId] = useState("")
  const [issue, setIssue] = useState("")
  const [isClientMale, setIsClientMale] = useState(true)
  const [isAgentMale, setIsAgentMale] = useState(true)
  const [isAgentFemale, setIsAgentFemale] = useState(false)
  const [isClientFemale, setIsClientFemale] = useState(false)

  const clientMaleBtnRef = useRef(null)
  const clientFemaleBtnRef = useRef(null)
  const agentMaleBtnRef = useRef(null)
  const agentFemaleBtnRef = useRef(null)

  const clientMale = () => {
    setIsClientMale(true)
    setIsClientFemale(false)
  }
  const agentMale = () => {
    setIsAgentMale(true)
    setIsAgentFemale(false)
  }
  const agentFemale = () => {
    setIsAgentFemale(true)
    setIsAgentMale(false)
  }

  const clientFemale = () => {
    setIsClientMale(false)
    setIsClientFemale(true)
  }

  return (
    <div dir="rtl" className="relative">
      <div className="topFormInner">
        <div className="mt-2 icons">
          <div className="iconsAgent">
            <div onClick={agentMale} ref={agentMaleBtnRef} className="icon man">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32"
                viewBox="0 -960 960 960"
                width="32"
              >
                <path d="M420-80v-280h-80v-253q0-24.75 17.625-42.375T400-673h160q24.75 0 42.375 17.625T620-613v253h-80v280H420Zm60.08-654q-30.08 0-51.58-21.42-21.5-21.421-21.5-51.5 0-30.08 21.42-51.58 21.421-21.5 51.5-21.5 30.08 0 51.58 21.42 21.5 21.421 21.5 51.5 0 30.08-21.42 51.58-21.421 21.5-51.5 21.5Z" />
              </svg>
            </div>
            <div
              onClick={agentFemale}
              ref={agentFemaleBtnRef}
              className="icon woman"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32"
                viewBox="0 -960 960 960"
                width="32"
              >
                <path d="M420-80v-220H300l102-328q8-25 30-38.5t48-13.5q26 0 48 13.5t30 38.5l102 328H540v220H420Zm60.08-654q-30.08 0-51.58-21.42-21.5-21.421-21.5-51.5 0-30.08 21.42-51.58 21.421-21.5 51.5-21.5 30.08 0 51.58 21.42 21.5 21.421 21.5 51.5 0 30.08-21.42 51.58-21.421 21.5-51.5 21.5Z" />
              </svg>
            </div>
          </div>
          <div className="iconsClient mt-3">
            <div
              onClick={clientMale}
              ref={clientMaleBtnRef}
              className="icon man"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32"
                viewBox="0 -960 960 960"
                width="32"
              >
                <path d="M420-80v-280h-80v-253q0-24.75 17.625-42.375T400-673h160q24.75 0 42.375 17.625T620-613v253h-80v280H420Zm60.08-654q-30.08 0-51.58-21.42-21.5-21.421-21.5-51.5 0-30.08 21.42-51.58 21.421-21.5 51.5-21.5 30.08 0 51.58 21.42 21.5 21.421 21.5 51.5 0 30.08-21.42 51.58-21.421 21.5-51.5 21.5Z" />
              </svg>
            </div>
            <div
              onClick={clientFemale}
              ref={clientFemaleBtnRef}
              className="icon woman"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32"
                viewBox="0 -960 960 960"
                width="32"
              >
                <path d="M420-80v-220H300l102-328q8-25 30-38.5t48-13.5q26 0 48 13.5t30 38.5l102 328H540v220H420Zm60.08-654q-30.08 0-51.58-21.42-21.5-21.421-21.5-51.5 0-30.08 21.42-51.58 21.421-21.5 51.5-21.5 30.08 0 51.58 21.42 21.5 21.421 21.5 51.5 0 30.08-21.42 51.58-21.421 21.5-51.5 21.5Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="names">
          <div className="p-4 agentName">
            <label htmlFor="agentName">
              {isAgentMale ? "שם הנציג: " : "שם הנציגה: "}
            </label>
            <input
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              name="agentName"
              type="text"
              className="mx-2"
            />
          </div>
          <div className="p-4 clientName">
            <label htmlFor="client">
              {isClientMale ? "שם הלקוח: " : "שם הלקוחה: "}
            </label>
            <input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              name="client"
              type="text"
              className="mx-2"
            />
          </div>
        </div>

        <div className="case">
          <div className="p-4 caseNumber">
            <label htmlFor="caseId">מספר הפנייה: </label>
            <input
              value={caseId}
              onChange={(e) => setCaseId(e.target.value)}
              name="caseId"
              type="text"
              className="mx-2"
            />
          </div>
          <div className="caseIssue p-4">
            <label htmlFor="issue">סיבת הפנייה: </label>
            <input
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              name="issue"
              type="text"
              className="mx-2"
            />
          </div>
        </div>
      </div>
      {isClientMale && isAgentMale && (
        <MM
          name={clientName}
          caseId={caseId}
          issue={issue}
          agentName={agentName}
        />
      )}
      {isClientFemale && isAgentMale && (
        <MF
          name={clientName}
          caseId={caseId}
          issue={issue}
          agentName={agentName}
        />
      )}
      {isClientMale && isAgentFemale && (
        <FM
          name={clientName}
          caseId={caseId}
          issue={issue}
          agentName={agentName}
        />
      )}
      {isClientFemale && isAgentFemale && (
        <FF
          name={clientName}
          caseId={caseId}
          issue={issue}
          agentName={agentName}
        />
      )}
    </div>
  )
}

export default Top
