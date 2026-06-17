---
layout: page
permalink: /repositories/
title: Repositories
nav_title: Repositories
description: Selected open-source repositories and code projects.
nav: true
nav_order: 3
---

<p class="repo-page-intro">Selected GitHub work, with external stats cards where they are useful and local metadata kept visible when those services are slow or unavailable.</p>

{% if site.data.repositories.github_users %}

<section class="repo-section" aria-labelledby="github-profile">
  <div class="repo-section__header">
    <h2 id="github-profile">GitHub profile</h2>
    <span>{{ site.data.repositories.github_users | size }} profile</span>
  </div>

  <div class="repo-profile-grid">
    {% for user in site.data.repositories.github_users %}
      <article class="repo-profile-card">
        <a class="repo-profile-card__media" href="https://github.com/{{ user }}" target="_blank" rel="noopener noreferrer" aria-label="Open {{ user }} on GitHub">
          <img
            class="repo-light"
            src="{{ site.external_services.github_readme_stats_url }}/api/?username={{ user }}&theme={{ site.repo_theme_light }}&show_icons=true"
            alt="{{ user }} GitHub profile stats"
            loading="lazy"
            onerror="this.style.display='none'"
          >
          <img
            class="repo-dark"
            src="{{ site.external_services.github_readme_stats_url }}/api/?username={{ user }}&theme={{ site.repo_theme_dark }}&show_icons=true"
            alt="{{ user }} GitHub profile stats"
            loading="lazy"
            onerror="this.style.display='none'"
          >
        </a>
        <a class="repo-profile-card__fallback" href="https://github.com/{{ user }}" target="_blank" rel="noopener noreferrer">
          <img class="repo-profile-card__avatar" src="https://github.com/{{ user }}.png?size=120" alt="{{ user }} avatar" loading="lazy">
          <span>
            <h3><i class="fa-brands fa-github"></i> {{ user }}</h3>
            <p>Open GitHub profile</p>
          </span>
        </a>
      </article>
    {% endfor %}
  </div>

{% if site.repo_trophies.enabled %}
{% for user in site.data.repositories.github_users %}

<article class="repo-trophy-card repo-section">
<a class="repo-trophy-card__media" href="https://github.com/ryo-ma/github-profile-trophy" target="_blank" rel="noopener noreferrer" aria-label="Open GitHub profile trophies">
<img
            class="repo-light"
            src="{{ site.external_services.github_profile_trophy_url }}/?username={{ user }}&theme={{ site.repo_trophies.theme_light }}&locale={{ site.lang }}&margin-w=15&margin-h=15&no-bg=true&rank=-C&column=6"
            alt="{{ user }} GitHub trophies"
            loading="lazy"
            onerror="this.style.display='none'"
          >
<img
            class="repo-dark"
            src="{{ site.external_services.github_profile_trophy_url }}/?username={{ user }}&theme={{ site.repo_trophies.theme_dark }}&locale={{ site.lang }}&margin-w=15&margin-h=15&no-bg=true&rank=-C&column=6"
            alt="{{ user }} GitHub trophies"
            loading="lazy"
            onerror="this.style.display='none'"
          >
</a>
</article>
{% endfor %}
{% endif %}

</section>

{% endif %}

{% if site.data.repositories.github_repos %}

<section class="repo-section" aria-labelledby="github-repositories">
  <div class="repo-section__header">
    <h2 id="github-repositories">Selected repositories</h2>
    <span>{{ site.data.repositories.github_repos | size }} repos</span>
  </div>

  <div class="repo-grid">
    {% for repo in site.data.repositories.github_repos %}
      {% assign repo_parts = repo | split: "/" %}
      {% assign owner = repo_parts[0] %}
      {% assign name = repo_parts[1] %}
      {% assign meta = site.data.repositories.repo_metadata[repo] %}
      {% assign show_owner = true %}
      {% if site.data.repositories.github_users contains owner %}
        {% assign show_owner = false %}
      {% endif %}
      <article class="repo-card">
        <a class="repo-card__stats" href="https://github.com/{{ repo }}" target="_blank" rel="noopener noreferrer" aria-label="Open {{ repo }} on GitHub">
          <img
            class="repo-light"
            src="{{ site.external_services.github_readme_stats_url }}/api/pin/?username={{ owner }}&repo={{ name }}&theme={{ site.repo_theme_light }}&show_owner={{ show_owner }}&description_lines_count={{ site.data.repositories.repo_description_lines_max | default: 2 }}"
            alt="{{ repo }} repository stats"
            loading="lazy"
            onerror="this.style.display='none'"
          >
          <img
            class="repo-dark"
            src="{{ site.external_services.github_readme_stats_url }}/api/pin/?username={{ owner }}&repo={{ name }}&theme={{ site.repo_theme_dark }}&show_owner={{ show_owner }}&description_lines_count={{ site.data.repositories.repo_description_lines_max | default: 2 }}"
            alt="{{ repo }} repository stats"
            loading="lazy"
            onerror="this.style.display='none'"
          >
        </a>
        <div class="repo-card__body">
          <div class="repo-card__title-row">
            <div>
              <h3>{{ name }}</h3>
              <p><span class="repo-card__owner">{{ owner }}</span></p>
            </div>
            <a class="repo-card__cta" href="https://github.com/{{ repo }}" target="_blank" rel="noopener noreferrer" aria-label="Open {{ repo }} on GitHub">
              <i class="fa-brands fa-github"></i>
            </a>
          </div>
          <div class="repo-card__chips">
            <span class="repo-chip"><i class="fa-solid fa-code-branch"></i> Repository</span>
            {% if meta.language %}
              <span class="repo-chip">{{ meta.language }}</span>
            {% endif %}
            <span class="repo-chip">{{ owner }}/{{ name }}</span>
          </div>
          <div class="repo-card__summary">
            {% if meta.description %}
              <p>{{ meta.description }}</p>
            {% else %}
              <p>Selected source code and project artifacts from {{ owner }}.</p>
            {% endif %}
            {% if meta.stars or meta.forks %}
              <div class="repo-card__metrics" aria-label="{{ repo }} GitHub metrics">
                {% if meta.stars != nil %}
                  <span><i class="fa-regular fa-star"></i> {{ meta.stars }}</span>
                {% endif %}
                {% if meta.forks != nil %}
                  <span><i class="fa-solid fa-code-fork"></i> {{ meta.forks }}</span>
                {% endif %}
              </div>
            {% endif %}
          </div>
          <a class="repo-card__cta" href="https://github.com/{{ repo }}" target="_blank" rel="noopener noreferrer">
            View repository <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
      </article>
    {% endfor %}
  </div>
</section>

{% endif %}
