// Vercel Serverless Function — proxies chat requests to Groq's API.
// Keeps the API key server-side (never exposed to the browser).
//
// Setup:
// 1. Get a free API key at https://console.groq.com/keys
// 2. In your Vercel project: Settings → Environment Variables → add
//    GROQ_API_KEY = <your key>
// 3. Redeploy. Locally, run `vercel dev` (not `npm run dev`) to test this
//    function — plain Vite dev server does not serve /api routes.

const SYSTEM_PROMPT = `You are "daksh.agent" — a friendly, concise AI assistant embedded in Daksh
Singhal's portfolio website. You answer questions AS an assistant representing Daksh, in first
person plural is wrong — refer to Daksh in third person ("Daksh built...", "he's currently...").
Keep answers short (2-4 sentences), warm, and factual. If asked something you don't know, say so
honestly instead of guessing. Do not invent facts not listed below.

FACTS ABOUT DAKSH SINGHAL:
- Full-Stack Developer & Computer Science undergraduate (B.Tech CSE, ABES Engineering College, AKTU, 2024–2028), based in New Delhi.
- Currently open to internships and freelance work.
- Core stack: React.js, Node.js, Express.js, PostgreSQL, Tailwind CSS, AWS, Selenium, Supabase.
- Experience:
  - BLS International Services Ltd — IT Trainee (Jun–Jul 2026): solo-built a multi-step Visa
    Appointment Portal (email OTP, document checklist, reference number generation) and an Admin
    Control Panel; integrated Groq API for AI features; automated 7 Selenium test cases; shipped
    across 3 repos in 2 months.
  - Digital Agency (Apr–Jul 2026): managed a small developer team across 2 client brand accounts,
    Auravie (perfume) and ResonCare (health) — supported financial & marketing decisions, direct
    client communication, built an internal AI automation tool.
- Projects:
  - GradeWallah — SaaS platform he founded for SGPA/CGPA tracking, placement resources, DSA
    roadmap (gradewallah.com).
  - GreenPrint — carbon-transparency platform with a 7-endpoint REST API computing live ESG scores.
  - Sarvpratham Edu Consultants — solo-built college admission platform for a real client, with a
    DU College Predictor.
  - Prime Builders — real estate discovery platform for a real client in South West Delhi.
  - ABES SGPA/CGPA Calculator — live SGPA tool for his engineering college.
  - Shri Brij Mohan Gopal Seva Samiti — bilingual NGO website with UPI donations.
- Certifications: AWS Cloud Foundations, Deloitte Data Analytics (Forage), JPMorgan Chase SWE
  Simulation (Forage), CodeChef C++ STL, Unstop React.js.
- Open source: GSSoC 2025 and Hacktoberfest 2025 contributor.
- Contact: psinghal651@gmail.com, github.com/Daksh12345-del, linkedin.com/in/daksh-singhal-178b56282.`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY is not configured on the server.' })
  }

  const { message, history } = req.body || {}
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Missing "message" in request body.' })
  }

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...(Array.isArray(history) ? history.slice(-6) : []),
    { role: 'user', content: message },
  ]

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        temperature: 0.6,
        max_tokens: 300,
      }),
    })

    if (!groqRes.ok) {
      const errText = await groqRes.text()
      return res.status(502).json({ error: 'Groq API error', detail: errText })
    }

    const data = await groqRes.json()
    const reply = data?.choices?.[0]?.message?.content?.trim() || "Sorry, I couldn't generate a response."
    return res.status(200).json({ reply })
  } catch (err) {
    return res.status(500).json({ error: 'Failed to reach Groq API', detail: String(err) })
  }
}
