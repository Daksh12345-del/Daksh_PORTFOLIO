// Shared guided-tour sequence — used by both the terminal ("tour" command)
// and the agent chat ("give me a tour").
export const TOUR_STEPS = [
  { id: 'about', delay: 900, msg: 'This is who I am. Next, my skills...' },
  { id: 'skills', delay: 2400, msg: 'React, Node, PostgreSQL, AWS and more. Now a project...' },
  { id: 'projects', delay: 3900, msg: "GradeWallah — a SaaS platform I founded. Let's check the resume..." },
  { id: 'resume', delay: 5400, msg: "That's the full picture. If you'd like to reach out, here's contact.sh." },
  { id: 'contact', delay: 6900, msg: "That's the tour! Ask me anything else, or send a message." },
]

export function runTour(onOpen, appendLine) {
  TOUR_STEPS.forEach(({ id, delay, msg }) => {
    setTimeout(() => {
      onOpen(id)
      appendLine(msg)
    }, delay)
  })
}
