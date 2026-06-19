---
title: 'Reading the city''s open data — without losing your mind'
excerpt: How the Open Data Dashboard project turns messy CSVs into maps residents can actually use.
tags:
  - Deep dive
author: cayden-rho
date: 2026-03-21
kicker: Deep dive
readingTime: 8 min read
---

Kansas City publishes a surprising amount of open data — 311 requests, building permits, pothole reports, transit stops. The catch is that "open" often means "a 40-megabyte CSV with inconsistent column names and three different date formats." Useful in theory, unusable in practice.

The KCTE Open Data Dashboard project exists to close that gap. We built a small pipeline that ingests the raw exports, normalizes the mess, and renders the result as maps and charts a resident can read in ten seconds. This deep dive walks through the ugly parts: deduping addresses, reconciling geocodes that disagree, and deciding what to do when the city changes a schema without telling anyone.

It's not glamorous work, but it's the kind that makes public data actually public. If wrangling CSVs into something people can use sounds like your idea of a good time, we'd love the help.
