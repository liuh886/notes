---
layout: about
title: Hao's Notes
permalink: /
nav: false
nav_order: 0
subtitle: Climate & Energy Data Scientist
subtitle_extra: "Caixin ESG30 Young Scholar"

profile:
  align: right
  image: blog_pic.jpg
  image_circular: false
  more_info: >
    <p>Offshore Bergen · Aug 2020</p>

news: false
announcements:
  enabled: false
  scrollable: false
  limit: 0

latest_posts:
  enabled: false
  scrollable: false
  limit: 0

selected_papers: false
projects: false
display_categories: [work]
social: false
home_cta: false
---

<div class="hao-home hao-home--production hao-home--alfolio">
  <section class="hao-home-intro" aria-labelledby="hao-home-intro-title">
    <p class="hao-home-eyebrow">Data Scientist · AI Builder</p>
    <h2 id="hao-home-intro-title">Research records, shipped tools, and agentic AI systems.</h2>
    <p>I build evidence-driven data systems for climate, energy, and geoscience—from field observations and reproducible research to public tools that support analysis and decisions.</p>
    <div class="hao-home-actions" aria-label="Homepage contact">
      <a class="hao-home-button hao-home-button--primary" href="https://calendar.app.google/UQ267iEs4MTAGFSd7" target="_blank" rel="noopener noreferrer" aria-label="Contact — book a chat">Contact</a>
    </div>
  </section>

  <nav class="hao-home-index" aria-label="Homepage sections">
    <a href="#current-work">Current work</a>
    <a href="#selected-work">Projects &amp; code</a>
    <a href="#notes-publications">Notes &amp; publications</a>
    <a href="#contact">Contact</a>
  </nav>

  <section class="hao-home-section" id="current-work" aria-labelledby="current-work-title">
    <div class="hao-home-section-header">
      <p class="hao-home-eyebrow">Current work</p>
      <h2 id="current-work-title">Six maintained product and research lanes.</h2>
      <p>This section is limited to work that is actively maintained or being prepared for its first public release. Archived projects and supporting tools appear separately below.</p>
    </div>
    <div class="hao-home-card-grid">
      {% for operation in site.data.current_operations.operations %}
        <article class="hao-home-card">
          <div class="hao-home-card-topline">
            <span>{{ operation.id }}</span>
            <strong>{{ operation.status }}</strong>
          </div>
          <h3>{{ operation.title }}</h3>
          <p>{{ operation.summary }}</p>
          <div class="hao-home-links">
            {% if operation.href %}
              <a class="hao-home-text-link" href="{{ operation.href }}" target="_blank" rel="noopener noreferrer">{{ operation.label | default: "Open" }} →</a>
            {% endif %}
            {% if operation.secondary_href %}
              <a class="hao-home-text-link" href="{{ operation.secondary_href }}" target="_blank" rel="noopener noreferrer">{{ operation.secondary_label | default: "Repository" }} →</a>
            {% endif %}
          </div>
        </article>
      {% endfor %}
    </div>
  </section>

  <section class="hao-home-section" id="selected-work" aria-labelledby="selected-work-title">
    <div class="hao-home-section-header">
      <p class="hao-home-eyebrow">Projects &amp; code</p>
      <h2 id="selected-work-title">Selected work beyond the active product list.</h2>
      <p>A non-repeating selection drawn from the project and repository archives: research programmes, offshore field work, open-source tools, and teaching artifacts.</p>
    </div>

    <div class="hao-home-system-stack">
      {% for group in site.data.selected_deployments.groups %}
        <section class="hao-home-system-group" aria-labelledby="hao-system-group-{{ group.id }}">
          <div class="hao-home-system-group-intro">
            <p class="hao-home-card-label">{{ group.kicker }}</p>
            <h3 id="hao-system-group-{{ group.id }}">{{ group.title }}</h3>
            <p>{{ group.summary }}</p>
          </div>
          <div class="hao-home-system-grid">
            {% for deployment in group.deployments %}
              <article class="hao-home-card">
                <div class="hao-home-card-topline">
                  <span>{{ deployment.ref }}</span>
                  <strong>{{ deployment.status }}</strong>
                </div>
                <h4>{{ deployment.title }}</h4>
                <p class="hao-home-kind">{{ deployment.kind }}</p>
                <p>{{ deployment.summary }}</p>
                <div class="hao-home-links">
                  {% if deployment.href %}
                    <a class="hao-home-text-link" href="{{ deployment.href }}" {% if deployment.href contains 'http' %}target="_blank" rel="noopener noreferrer"{% endif %}>{{ deployment.primary_label | default: "Open" }} →</a>
                  {% endif %}
                  {% if deployment.secondary_href %}
                    <a class="hao-home-text-link" href="{{ deployment.secondary_href }}" {% if deployment.secondary_href contains 'http' %}target="_blank" rel="noopener noreferrer"{% endif %}>{{ deployment.secondary_label | default: "More" }} →</a>
                  {% endif %}
                  {% if deployment.repository_href %}
                    <a class="hao-home-text-link" href="{{ deployment.repository_href }}" target="_blank" rel="noopener noreferrer">{{ deployment.repository_label | default: "Repository" }} →</a>
                  {% endif %}
                </div>
              </article>
            {% endfor %}
          </div>
        </section>
      {% endfor %}
    </div>

    <div class="hao-home-archive-links">
      <a href="{{ '/projects/' | relative_url }}">Full project archive</a>
      <a href="{{ '/repositories/' | relative_url }}">Repository archive</a>
    </div>
  </section>

  <section class="hao-home-section" id="notes-publications" aria-labelledby="notes-publications-title">
    <div class="hao-home-section-header">
      <p class="hao-home-eyebrow">Notes &amp; publications</p>
      <h2 id="notes-publications-title">Formal outputs and selected working notes.</h2>
      <p>Formal research outputs are kept distinct from projects; the notes selection points to actual writing from the blog rather than repeating product descriptions.</p>
    </div>

    <div class="hao-home-knowledge-grid">
      <div class="hao-home-knowledge-panel" id="publications">
        <div class="hao-home-panel-heading">
          <p class="hao-home-card-label">Research outputs</p>
          <h3>Peer-reviewed research, open data, and patent record.</h3>
        </div>
        <div class="hao-home-record-list">
          {% for record in site.data.research_records.records %}
            <article class="hao-home-record">
              <div class="hao-home-card-topline">
                <span>{{ record.id }}</span>
                <strong>{{ record.status }}</strong>
              </div>
              <h4>{{ record.title }}</h4>
              <p class="hao-home-kind">{{ record.kind }}</p>
              <p>{{ record.summary }}</p>
              <div class="hao-home-links">
                {% if record.href %}
                  <a class="hao-home-text-link" href="{{ record.href }}" target="_blank" rel="noopener noreferrer">{{ record.label | default: "Open" }} →</a>
                {% endif %}
                {% if record.secondary_href %}
                  <a class="hao-home-text-link" href="{{ record.secondary_href }}">{{ record.secondary_label | default: "More" }} →</a>
                {% endif %}
              </div>
            </article>
          {% endfor %}
        </div>
        <div class="hao-home-archive-links">
          <a href="{{ '/publications/' | relative_url }}">Publication archive</a>
        </div>
      </div>

      <div class="hao-home-knowledge-panel" id="notes">
        <div class="hao-home-panel-heading">
          <p class="hao-home-card-label">Selected notes</p>
          <h3>Writing across geospatial methods, field science, and personal AI systems.</h3>
        </div>
        <div class="hao-home-note-list">
          {% for observation in site.data.field_observations.observations %}
            <article class="hao-home-note">
              <div class="hao-home-card-topline">
                <span>{{ observation.id }}</span>
                <strong>{{ observation.status }}</strong>
              </div>
              <h4>{{ observation.title }}</h4>
              <p>{{ observation.summary }}</p>
              {% if observation.href %}
                <a class="hao-home-text-link" href="{{ observation.href }}">{{ observation.label | default: "Read" }} →</a>
              {% endif %}
            </article>
          {% endfor %}
        </div>
        <div class="hao-home-archive-links">
          <a href="{{ '/blog/' | relative_url }}">Full notes archive</a>
        </div>
      </div>
    </div>
  </section>

  <section class="hao-home-contact" id="contact" aria-labelledby="contact-title">
    <div>
      <p class="hao-home-eyebrow">Contact</p>
      <h2 id="contact-title">Book a conversation or browse the full record.</h2>
    </div>
    <div class="hao-home-contact-links">
      <a href="https://calendar.app.google/UQ267iEs4MTAGFSd7" target="_blank" rel="noopener noreferrer">Book a chat</a>
      <a href="https://github.com/liuh886" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="https://www.linkedin.com/in/liuzhihao" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a href="{{ '/cv/' | relative_url }}">CV</a>
      <a href="{{ '/publications/' | relative_url }}">Publications</a>
      <a href="{{ '/blog/' | relative_url }}">Notes archive</a>
      <a href="https://ko-fi.com/F1F7WYJ6B" target="_blank" rel="noopener noreferrer">Ko-fi</a>
    </div>
  </section>
</div>
