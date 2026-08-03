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
    <p class="hao-home-eyebrow">Climate data · Geoscience evidence · AI tools</p>
    <h2 id="hao-home-intro-title">Research records, shipped tools, and field-informed systems.</h2>
    <p>I build evidence-driven data systems for climate, energy, and geoscience—from field observations and reproducible research to public tools that support analysis and decisions.</p>
    <div class="hao-home-actions" aria-label="Homepage shortcuts">
      <a class="hao-home-button hao-home-button--primary" href="#current-work">Browse current work</a>
      <a class="hao-home-button" href="{{ '/blog/' | relative_url }}">Read notes</a>
    </div>
  </section>

  <nav class="hao-home-index" aria-label="Homepage sections">
    <a href="#current-work">Current work</a>
    <a href="#systems">Systems</a>
    <a href="#knowledge">Knowledge</a>
    <a href="#trajectory">Trajectory</a>
    <a href="#contact">Contact</a>
  </nav>

  <section class="hao-home-section" id="current-work" aria-labelledby="current-work-title">
    <div class="hao-home-section-header">
      <p class="hao-home-eyebrow">Current work</p>
      <h2 id="current-work-title">Active tracks, organized as working lanes.</h2>
      <p>Updates are organized as maintained work lanes: public data systems, product builds, research engines, and training tools.</p>
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
          {% if operation.href %}
            <a class="hao-home-text-link" href="{{ operation.href }}" target="_blank" rel="noopener noreferrer">{{ operation.label | default: "Open" }} →</a>
          {% endif %}
        </article>
      {% endfor %}
    </div>
  </section>

  <section class="hao-home-section" id="systems" aria-labelledby="systems-title">
    <div class="hao-home-section-header">
      <p class="hao-home-eyebrow">Systems</p>
      <h2 id="systems-title">Public surfaces and working tools.</h2>
      <p>A manually ordered view of systems that have moved beyond notes: data products, local-first tools, training apps, and research infrastructure.</p>
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
                    <a class="hao-home-text-link" href="{{ deployment.href }}" target="_blank" rel="noopener noreferrer">{{ deployment.primary_label | default: "Open" }} →</a>
                  {% endif %}
                  {% if deployment.secondary_href %}
                    <a class="hao-home-text-link" href="{{ deployment.secondary_href }}" target="_blank" rel="noopener noreferrer">{{ deployment.secondary_label | default: "Repository" }} →</a>
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

  <section class="hao-home-section" id="knowledge" aria-labelledby="knowledge-title">
    <div class="hao-home-section-header">
      <p class="hao-home-eyebrow">Knowledge</p>
      <h2 id="knowledge-title">Research records and field notes in one workspace.</h2>
      <p>The homepage keeps formal research artifacts and working notes close together, because the same evidence base feeds both.</p>
    </div>

    <div class="hao-home-knowledge-grid">
      <div class="hao-home-knowledge-panel" id="research">
        <div class="hao-home-panel-heading">
          <p class="hao-home-card-label">Research record</p>
          <h3>Evidence, papers, and technical artifacts.</h3>
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
      </div>

      <div class="hao-home-knowledge-panel" id="notes">
        <div class="hao-home-panel-heading">
          <p class="hao-home-card-label">Field observations</p>
          <h3>Notes from the edge of the work.</h3>
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

  <section class="hao-home-section" id="trajectory" aria-labelledby="trajectory-title">
    <div class="hao-home-section-header">
      <p class="hao-home-eyebrow">Trajectory</p>
      <h2 id="trajectory-title">A path from field operations to product systems.</h2>
    </div>
    <div class="hao-home-timeline">
      {% for phase in site.data.career_trajectory.phases %}
        <article class="hao-home-timeline-item">
          <div class="hao-home-card-topline">
            <span>{{ phase.id }}</span>
            <strong>{{ phase.status }}</strong>
          </div>
          <h3>{{ phase.title }}</h3>
          <p>{{ phase.summary }}</p>
        </article>
      {% endfor %}
    </div>
    <div class="hao-home-archive-links">
      <a href="{{ '/cv/' | relative_url }}">Full CV archive</a>
    </div>
  </section>

  <section class="hao-home-contact" id="contact" aria-labelledby="contact-title">
    <div>
      <p class="hao-home-eyebrow">Contact</p>
      <h2 id="contact-title">Code, records, notes, and support.</h2>
    </div>
    <div class="hao-home-contact-links">
      <a href="https://github.com/liuh886" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="https://www.linkedin.com/in/liuzhihao" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a href="{{ '/cv/' | relative_url }}">CV</a>
      <a href="{{ '/publications/' | relative_url }}">Publications</a>
      <a href="{{ '/blog/' | relative_url }}">Notes archive</a>
      <a href="https://ko-fi.com/F1F7WYJ6B" target="_blank" rel="noopener noreferrer">Ko-fi</a>
    </div>
  </section>
</div>
