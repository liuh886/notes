---
layout: page
title: repositories
permalink: /repositories/
description: Upstream contributions and selected open-source tools.
nav: true
nav_order: 3
---

<!-- profile -->
<div class="repo-page-intro">
  <p>Selected GitHub work, with external stats cards where they are useful and local metadata kept visible when those services are slow or unavailable.</p>
</div>

{% if site.data.repositories.github_users %}

<section class="repo-section" aria-labelledby="github-profile">
  <div class="repo-section__header">
    <h2 id="github-profile">GitHub profile</h2>
  </div>

  <div class="repo-profile-grid">
    {% for user in site.data.repositories.github_users %}
      <div class="repo-profile-card">
        <div class="repo-profile-card__media">
          <img class="repo-light" src="https://github-readme-stats.vercel.app/api?username={{ user }}&show_icons=true&theme=default" alt="GitHub stats for {{ user }}" loading="lazy">
          <img class="repo-dark" src="https://github-readme-stats.vercel.app/api?username={{ user }}&show_icons=true&theme=dark" alt="GitHub stats for {{ user }}" loading="lazy">
        </div>
      </div>
    {% endfor %}
    <div class="repo-profile-card">
      <div class="repo-profile-card__media">
        <img class="repo-light" src="https://github-readme-stats.vercel.app/api/top-langs/?username=liuh886&layout=compact&theme=default" alt="Top languages for liuh886" loading="lazy">
        <img class="repo-dark" src="https://github-readme-stats.vercel.app/api/top-langs/?username=liuh886&layout=compact&theme=dark" alt="Top languages for liuh886" loading="lazy">
      </div>
    </div>
    <div class="repo-profile-card">
      <div class="repo-profile-card__media">
        <img class="repo-light" src="https://github-readme-streak-stats.herokuapp.com/?user=liuh886&theme=default" alt="GitHub streak for liuh886" loading="lazy">
        <img class="repo-dark" src="https://github-readme-streak-stats.herokuapp.com/?user=liuh886&theme=dark" alt="GitHub streak for liuh886" loading="lazy">
      </div>
    </div>
    <div class="repo-profile-card">
      <div class="repo-profile-card__media">
        <img class="repo-light" src="https://github-readme-stats.vercel.app/api/wakatime?username=liuh886&theme=default" alt="Wakatime stats for liuh886" loading="lazy">
        <img class="repo-dark" src="https://github-readme-stats.vercel.app/api/wakatime?username=liuh886&theme=dark" alt="Wakatime stats for liuh886" loading="lazy">
      </div>
    </div>
  </div>
</section>

<section class="repo-section" aria-labelledby="github-trophies">
  <div class="repo-section__header">
    <h2 id="github-trophies">GitHub trophies</h2>
  </div>

  <div class="repo-profile-grid">
    <div class="repo-profile-card">
      <div class="repo-profile-card__media">
        <img class="repo-light" src="https://github-profile-trophy.vercel.app/?username=liuh886&theme=flat&no-frame=true&no-bg=true&column=7" alt="GitHub trophies for liuh886" loading="lazy">
        <img class="repo-dark" src="https://github-profile-trophy.vercel.app/?username=liuh886&theme=dark&no-frame=true&no-bg=true&column=7" alt="GitHub trophies for liuh886" loading="lazy">
      </div>
    </div>
  </div>
</section>

{% endif %}

{% if site.data.repositories.upstream_contributions %}

<section class="repo-section" aria-labelledby="upstream-contributions">
  <div class="repo-section__header">
    <h2 id="upstream-contributions">Upstream contributions</h2>
    <span>{{ site.data.repositories.upstream_contributions | size }} projects</span>
  </div>

  <p>Work merged into libraries maintained by others — described as contributions, not as my own repositories.</p>

  <div class="repo-grid">
    {% for repo in site.data.repositories.upstream_contributions %}
      {% assign owner = repo | split: "/" | first %}
      {% assign name = repo | split: "/" | last %}
      {% assign meta = site.data.repositories.repo_metadata[repo] %}
      {% assign show_owner = true %}
      {% if site.data.repositories.github_users contains owner %}
        {% assign show_owner = false %}
      {% endif %}
      <article class="repo-card">
        <div class="repo-card__header">
          <div>
            <h3>
              <a href="https://github.com/{{ repo }}">{{ repo }}</a>
            </h3>
            {% if meta.language %}
              <span class="repo-card__language">{{ meta.language }}</span>
            {% endif %}
          </div>
          <span class="repo-chip"><i class="fa-solid fa-code-branch"></i> Contribution</span>
        </div>
        <div class="repo-card__body">
          <p>{{ meta.description }}</p>
          {% if meta.stars or meta.forks %}
            <div class="repo-card__stats">
              {% if meta.stars %}<span>★ {{ meta.stars }}</span>{% endif %}
              {% if meta.forks %}<span>⑂ {{ meta.forks }}</span>{% endif %}
            </div>
          {% endif %}
        </div>
        <div class="repo-card__actions">
          <a class="repo-card__cta repo-card__cta--primary" href="https://github.com/{{ repo }}">View Source Code</a>
          {% if meta.live_url %}
            <a class="repo-card__cta" href="{{ meta.live_url }}">{{ meta.live_label | default: "Open live site" }}</a>
          {% endif %}
          {% if meta.secondary_url %}
            <a class="repo-card__cta" href="{{ meta.secondary_url }}">{{ meta.secondary_label | default: "Secondary link" }}</a>
          {% endif %}
        </div>
        <div class="repo-card__media">
          <img class="repo-light" src="https://github-readme-stats.vercel.app/api/pin/?username={{ owner }}&repo={{ name }}&show_owner={{ show_owner }}&theme=default" alt="GitHub repository card for {{ repo }}" loading="lazy">
          <img class="repo-dark" src="https://github-readme-stats.vercel.app/api/pin/?username={{ owner }}&repo={{ name }}&show_owner={{ show_owner }}&theme=dark" alt="GitHub repository card for {{ repo }}" loading="lazy">
        </div>
      </article>
    {% endfor %}
  </div>
</section>

{% endif %}

{% if site.data.repositories.github_repos %}

<section class="repo-section" aria-labelledby="github-repositories">
  <div class="repo-section__header">
    <h2 id="github-repositories">Own tools</h2>
    <span>{{ site.data.repositories.github_repos | size }} repos</span>
  </div>

  <div class="repo-grid">
    {% for repo in site.data.repositories.github_repos %}
      {% assign owner = repo | split: "/" | first %}
      {% assign name = repo | split: "/" | last %}
      {% assign meta = site.data.repositories.repo_metadata[repo] %}
      {% assign show_owner = true %}
      {% if site.data.repositories.github_users contains owner %}
        {% assign show_owner = false %}
      {% endif %}
      <article class="repo-card">
        <div class="repo-card__header">
          <div>
            <h3>
              <a href="https://github.com/{{ repo }}">{{ repo }}</a>
            </h3>
            {% if meta.language %}
              <span class="repo-card__language">{{ meta.language }}</span>
            {% endif %}
          </div>
          <span class="repo-chip"><i class="fa-solid fa-code-branch"></i> Repository</span>
        </div>
        <div class="repo-card__body">
          <p>{{ meta.description }}</p>
          {% if meta.stars or meta.forks %}
            <div class="repo-card__stats">
              {% if meta.stars %}<span>★ {{ meta.stars }}</span>{% endif %}
              {% if meta.forks %}<span>⑂ {{ meta.forks }}</span>{% endif %}
            </div>
          {% endif %}
        </div>
        <div class="repo-card__actions">
          <a class="repo-card__cta repo-card__cta--primary" href="https://github.com/{{ repo }}">View Source Code</a>
          {% if meta.live_url %}
            <a class="repo-card__cta" href="{{ meta.live_url }}">{{ meta.live_label | default: "Open live site" }}</a>
          {% endif %}
          {% if meta.secondary_url %}
            <a class="repo-card__cta" href="{{ meta.secondary_url }}">{{ meta.secondary_label | default: "Secondary link" }}</a>
          {% endif %}
        </div>
        <div class="repo-card__media">
          <img class="repo-light" src="https://github-readme-stats.vercel.app/api/pin/?username={{ owner }}&repo={{ name }}&show_owner={{ show_owner }}&theme=default" alt="GitHub repository card for {{ repo }}" loading="lazy">
          <img class="repo-dark" src="https://github-readme-stats.vercel.app/api/pin/?username={{ owner }}&repo={{ name }}&show_owner={{ show_owner }}&theme=dark" alt="GitHub repository card for {{ repo }}" loading="lazy">
        </div>
      </article>
    {% endfor %}
  </div>
</section>

{% endif %}
