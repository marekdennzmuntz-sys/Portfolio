# Mark-Dennis Githinji — Portfolio

Personal portfolio site for Mark-Dennis Githinji, integrated brand & digital strategist. Built as plain static HTML/CSS/JS — no framework, no build step, no dependencies to install.

## Structure

```
index.html                 Homepage
work/
  ats-travel-digital.html  Case study — ATS Travel multi-platform
  ats-travel.html          Case study — ATS Travel World Travel Awards
  a-nanjala-careers.html   Case study — A.Nanjala Careers brand system
insights/
  belief-loop-service-marketing.html
  six-step-experiential-playbook.html
  content-systems-business-goals.html
  steel-fabrication-field-note.html
styles.css                 Shared stylesheet — every page reads this one file
script.js                  Shared JS — nav toggle, scroll reveal, count-up stats, TOC highlight
favicon.svg
sitemap.xml
robots.txt
```

Every page is a real, separate HTML file with its own title, meta description, canonical URL, and OG tags — deliberately not a single-page app with client-side routing, so every page is crawlable and shareable on its own.

## Running locally

No build step — just open `index.html` in a browser. Internal links are relative, so the whole site works straight off disk. If you want it served over `http://` instead of `file://` (some browsers are stricter about that), any simple static server works, e.g. `python3 -m http.server` from the project root.

## Deploying

Connected to Netlify (or Vercel) via this GitHub repo. Build command: none. Publish directory: `/` (repo root). Pushing to `main` redeploys automatically.

## Before pointing a real domain at this

Canonical tags, OG tags, and `sitemap.xml`/`robots.txt` currently point to a placeholder domain (`markdennisgithinji.com`). Once a real domain is live, these need a find-and-replace pass to match it, followed by submitting `sitemap.xml` to Google Search Console.

## Design system

Palette, type, and motion direction are documented separately as a brand guideline (planned as a deliverable once the site itself is finalized). Quick reference: Fraunces (display serif), Titillium Web (body sans), Fragment Mono (labels/data); dark palette derived from Rich Black, Dark Sienna, Cultured, Grullo, and Umber.
