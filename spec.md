# K-12 AI Teaching Assistant – MVP Specification

## 1. Purpose
Create a web-based AI tool for **K-12 teachers** that instantly generates one multiple-choice question (MCQ) at a time, helping teachers supplement lessons, quizzes, and exit tickets quickly.

## 2. Scope of the MVP
* Covers **all grade levels (K–12)** and **all subjects**.
* Single capability: **auto-generate one MCQ** per request.
* Teachers supply only **grade level** and **subject/topic**.
* Output delivered **as plain text** in the UI (no file export yet).

## 3. Personas
| Persona | Goals | Pain Points Addressed |
|---------|-------|-----------------------|
| Classroom Teacher | Quickly obtain quality MCQs aligned with lesson topic & grade level | Saves time creating questions, ensures variety of distractors |

## 4. User Flow
1. Teacher opens web page.
2. Selects / types `Grade Level` (K, 1 … 12).
3. Enters `Subject/Topic` (e.g. “Photosynthesis”).
4. Clicks **Generate**.
5. System calls backend ➜ LLM prompt.
6. UI displays:
   * Question text
   * Four answer options (A–D)
   * Correct answer highlighted/marked
   * Short explanation
7. Teacher may copy text or click **Generate Another** to repeat.

## 5. Functional Requirements
FR-1  Input form accepts:
  • `gradeLevel : string` ("K"-"12")
  • `subjectTopic : string`

FR-2  On submit, backend requests an LLM to create **exactly 1 MCQ** with:
  • 1 question stem
  • 4 answer choices (labeled A–D)
  • indication of the correct choice
  • 1–3 sentence explanation

FR-3  Output is rendered as plain text in the UI.

FR-4  Average end-to-end response time ≤ 5 s (P95 ≤ 10 s).

## 6. Non-Functional Requirements
* Language: English first release (future i18n ready).
* Compliance: No disallowed content; add moderation filter.
* Reliability: ≥ 99 % uptime.
* Security: Do **not** log student data; only teacher input.
* Accessibility: WCAG 2.1 AA.

## 7. API Contract (Internal)
`POST /api/generate-mcq`
```json
{
  "gradeLevel": "7",
  "subjectTopic": "Fraction addition"
}
```
Response 200
```json
{
  "question": "What is 3/5 + 1/5?",
  "choices": ["1/10","4/5","2/5","3/10"],
  "correctIndex": 1,
  "explanation": "Add numerators since denominators are equal: 3 + 1 = 4, keep denominator 5 => 4/5."
}
```
UI layer converts JSON to plain-text block for display.

## 8. Prompt Template (Baseline)
```
You are an educational content generator.
Generate ONE multiple-choice question for the following:
Grade level: {{gradeLevel}}
Subject/Topic: {{subjectTopic}}
Requirements:
- Provide 4 answer choices.
- Mark the correct answer with "*".
- Include a brief explanation (1-3 sentences).
Return ONLY plain text in the following format:
Question: <question>
A. <choice1>
B. <choice2>
C. <choice3>
D. <choice4>
Answer: <letter>
Explanation: <text>
```

## 9. Technology Stack
* Frontend: Next.js + TypeScript (already in repo)
* State mgmt/UI: React, Tailwind (existing)
* Backend route (Next.js API) + **OpenAI** (or Claude) via server-side call.
* Env var `AI_API_KEY` for provider key.

## 10. Acceptance Criteria
1. Given grade = “4”, topic = “Decimals”, the system returns a valid MCQ with four choices and explanation.
2. Correct choice clearly indicated.
3. Response visible in ≤ 5 s on dev Wi-Fi.
4. Form validation prevents empty inputs.
5. No PII stored in logs.

## 11. Future Extensions (out of MVP)
* Batch generate X questions.
* Difficulty slider.
* Export to PDF/Google Docs.
* Paste passage to generate passage-based questions.
* Lesson-plan generator.

---
**Document version**: v0.1 – 2025-07-11
