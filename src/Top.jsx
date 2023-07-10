// components/MainComponent.js
"use client"

import MM from "./MM"
import MF from "./MF"
import FM from "./FM"
import FF from "./FF"
import styles from "./styles/Top.css"
import React, { useState, useRef } from "react"

const Top = () => {
  const [agentName, setAgentName] = useState("")
  const [clientName, setClientName] = useState("")
  const [caseId, setCaseId] = useState("")
  const [issue, setIssue] = useState("")
  const [isMaleVisible, setIsMaleVisible] = useState(true)
  const [isAgentMale, setIsAgentMale] = useState(true)
  const [isAgentFemale, setIsAgentFemale] = useState(false)
  const [isFemaleVisible, setIsFemaleVisible] = useState(false)

  const maleBtnRef = useRef(null)
  const femaleBtnRef = useRef(null)
  const agentMaleBtnRef = useRef(null)
  const agentFemaleBtnRef = useRef(null)

  const showMale = () => {
    setIsMaleVisible(true)
    setIsFemaleVisible(false)
    maleBtnRef.current.classList.add("active")
    femaleBtnRef.current.classList.remove("active")
  }
  const agentMale = () => {
    setIsAgentMale(true)
    setIsAgentFemale(false)
    agentMaleBtnRef.current.classList.add("active")
    agentFemaleBtnRef.current.classList.remove("active")
  }
  const agentFemale = () => {
    setIsAgentFemale(true)
    setIsAgentMale(false)
    agentFemaleBtnRef.current.classList.add("active")
    agentMaleBtnRef.current.classList.remove("active")
  }

  const showFemale = () => {
    setIsMaleVisible(false)
    setIsFemaleVisible(true)
    femaleBtnRef.current.classList.add("active")
    maleBtnRef.current.classList.remove("active")
  }

  return (
    <div dir="rtl" className="relative">
      {isAgentMale && <div className="top"></div>}
      {isAgentFemale && (
        <div className="top-0 h-32 -mb-32 border-8 border-pink-200 bg"></div>
      )}
      <div className="topFormInner">
        <div className="h-full flex flex-col mt-2 mb-12">
          <div className="iconsAgent">
            <div
              onClick={agentMale}
              ref={agentMaleBtnRef}
              className={`${styles.icon} icon man`}
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
              onClick={agentFemale}
              ref={agentFemaleBtnRef}
              className={`${styles.icon} icon woman bg-pink-300`}
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
          <div className="flex items-center justify-between iconsClient mt-3">
            <div
              onClick={showMale}
              ref={maleBtnRef}
              className={`${styles.icon} icon man`}
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
              onClick={showFemale}
              ref={femaleBtnRef}
              className={`${styles.icon} icon woman`}
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
        <div className=" agent client">
          <div className="flex justify-between gap-2 p-4">
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
          <div className="flex justify-between gap-2 p-4">
            <label htmlFor="client">
              {isMaleVisible ? "שם הלקוח: " : "שם הלקוחה: "}
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

        <div className="">
          <div className="flex justify-between gap-2 p-4">
            <label htmlFor="caseId">מספר הפנייה: </label>
            <input
              value={caseId}
              onChange={(e) => setCaseId(e.target.value)}
              name="caseId"
              type="text"
              className="mx-2"
            />
          </div>
          <div className="flex justify-between p-4">
            <label htmlFor="caseId">סיבת הפנייה: </label>
            <input
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              name="caseId"
              type="text"
              className="mx-2"
            />
          </div>
        </div>
      </div>
      {isMaleVisible && isAgentMale && (
        <MM
          name={clientName}
          caseId={caseId}
          issue={issue}
          agentName={agentName}
        />
      )}
      {isFemaleVisible && isAgentMale && (
        <MF
          name={clientName}
          caseId={caseId}
          issue={issue}
          agentName={agentName}
        />
      )}
      {isMaleVisible && isAgentFemale && (
        <FM
          name={clientName}
          caseId={caseId}
          issue={issue}
          agentName={agentName}
        />
      )}
      {isFemaleVisible && isAgentFemale && (
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
