---
layout: page
permalink: /repositories/
title: Repositories
nav_title: repositories
description: Selected open-source repositories and code projects.
nav: true
nav_order: 3
_styles: >
  .repo-section {
    margin-top: 1.5rem;
  }
  .repo-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.9rem;
    margin: 1rem 0 2rem;
  }
  @media (min-width: 768px) {
    .repo-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  .repo-profile,
  .repo-card {
    border: 1px solid var(--global-divider-color);
    border-radius: 8px;
    background: var(--global-bg-color);
    padding: 1rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  }
  .repo-profile:hover,
  .repo-card:hover {
    border-color: var(--global-theme-color);
    transform: translateY(-2px);
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.06);
  }
  html[data-theme='dark'] .repo-profile,
  html[data-theme='dark'] .repo-card {
    background: var(--global-card-bg-color);
  }
  .repo-profile {
    display: flex;
    align-items: center;
    gap: 0.9rem;
  }
  .repo-profile img {
    width: 4rem;
    height: 4rem;
    border-radius: 8px;
    border: 1px solid var(--global-divider-color);
  }
  .repo-profile h3,
  .repo-card h3 {
    margin: 0;
    font-size: 1.05rem;
  }
  .repo-profile p,
  .repo-card p {
    margin: 0.25rem 0 0;
    color: var(--global-text-color);
    opacity: 0.72;
    font-size: 0.92rem;
  }
  .repo-card__top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.75rem;
  }
  .repo-card__meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin-top: 0.85rem;
  }
  .repo-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    border: 1px solid var(--global-divider-color);
    border-radius: 999px;
    padding: 0.22rem 0.55rem;
    font-size: 0.82rem;
    color: var(--global-text-color);
    opacity: 0.78;
  }
  .repo-card__link {
    color: var(--global-theme-color);
    white-space: nowrap;
  }
  .repo-card__cta {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    margin-top: 0.9rem;
    color: var(--global-theme-color);
    font-weight: 600;
    text-decoration: none;
  }
  .repo-card__stats {
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
    margin-top: 0.85rem;
    border-radius: 6px;
  }
---

{% if site.data.repositories.github_users %}

## GitHub users

<div class="repo-grid repo-section">
  {% for user in site.data.repositories.github_users %}
    <a class="repo-profile" href="https://github.com/{{ user }}" target="_blank" rel="noopener noreferrer">
      <img src="https://github.com/{{ user }}.png?size=160" alt="{{ user }} GitHub avatar" loading="lazy">
      <span>
        <h3><i class="fa-brands fa-github"></i> {{ user }}</h3>
        <p>GitHub profile</p>
      </span>
    </a>
  {% endfor %}
</div>

{% endif %}

{% if site.data.repositories.github_repos %}

## GitHub Repositories

<div class="repo-grid repo-section">
  {% for repo in site.data.repositories.github_repos %}
    {% assign repo_parts = repo | split: "/" %}
    {% assign owner = repo_parts[0] %}
    {% assign name = repo_parts[1] %}
    <article class="repo-card">
      <div class="repo-card__top">
        <div>
          <h3>{{ name }}</h3>
          <p>{{ owner }}</p>
        </div>
        <a class="repo-card__link" href="https://github.com/{{ repo }}" target="_blank" rel="noopener noreferrer" aria-label="Open {{ repo }} on GitHub">
          <i class="fa-brands fa-github"></i>
        </a>
      </div>
      <div class="repo-card__meta">
        <span class="repo-chip"><i class="fa-solid fa-code-branch"></i> Repository</span>
        <span class="repo-chip">{{ owner }}/{{ name }}</span>
      </div>
      <a class="repo-card__cta" href="https://github.com/{{ repo }}" target="_blank" rel="noopener noreferrer">View repository <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
      <a href="https://github.com/{{ repo }}" target="_blank" rel="noopener noreferrer">
        <img
          class="repo-card__stats"
          src="{{ site.external_services.github_readme_stats_url }}/api/pin/?username={{ owner }}&repo={{ name }}&theme=transparent&show_owner=true"
          alt="{{ repo }} repository stats"
          loading="lazy"
          onerror="this.style.display='none'"
        >
      </a>
    </article>
  {% endfor %}
</div>

{% endif %}
