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
    <p>📍Offshore Bergen, 2020 Aug</p>

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

<div class="hao-home hao-home--safe hao-home--production">
  <section class="hao-prod-hero" aria-labelledby="hao-prod-title">
    <div class="hao-prod-hero__content">
      <p class="hao-prod-eyebrow">Independent Builder · Climate · Geospatial · AI</p>
      <h1 id="hao-prod-title">Build systems that turn field evidence into usable products.</h1>
      <p class="hao-prod-lede">Hao's Notes is the public surface for my climate data work, geoscience evidence, shipped tools, and local-first systems. It connects offshore practice, geospatial intelligence, AI-native workflows, and product experiments into one working record.</p>
      <div class="hao-prod-actions" aria-label="Homepage shortcuts">
        <a class="hao-prod-button hao-prod-button--primary" href="#current-work">Explore current work</a>
        <a class="hao-prod-button" href="#systems">View systems</a>
        <a class="hao-prod-button" href="{{ '/blog/' | relative_url }}">Read notes</a>
      </div>
    </div>

    <aside class="hao-prod-profile" aria-label="Profile summary">
      <div class="hao-prod-profile__glow" aria-hidden="true"></div>
      <figure class="hao-prod-profile__portrait">
        <img src="{{ '/assets/img/blog_pic.jpg' | relative_url }}" alt="Zhihao Liu" loading="eager">
      </figure>
      <div class="hao-prod-profile__body">
        <p class="hao-prod-card-label">Profile</p>
        <h2>Zhihao Liu</h2>
        <p>Climate & energy data scientist with a geoscience and offshore survey background.</p>
        <dl class="hao-prod-profile__facts">
          <div>
            <dt>Focus</dt>
            <dd>Climate · Geo · AI</dd>
          </div>
          <div>
            <dt>Mode</dt>
            <dd>Research · Build · Record</dd>
          </div>
          <div>
            <dt>Surface</dt>
            <dd>Products · Notes · Data</dd>
          </div>
        </dl>
      </div>
    </aside>
  </section>

  <nav class="hao-prod-index" aria-label="Homepage sections">
    <a href="#current-work">Current work</a>
    <a href="#systems">Systems</a>
    <a href="#knowledge">Knowledge</a>
    <a href="#trajectory">Trajectory</a>
    <a href="#contact">Contact</a>
  </nav>

  <section class="hao-prod-section hao-prod-section--current" id="current-work" aria-labelledby="current-work-title">
    <div class="hao-prod-section__header">
      <p class="hao-prod-eyebrow">Current work</p>
      <h2 id="current-work-title">Active tracks, organized as working lanes.</h2>
      <p>Updates are organized as maintained work lanes: public data systems, product builds, research engines, and training tools.</p>
    </div>
    <div class="hao-prod-work-grid">
      {% for operation in site.data.current_operations.operations %}
        <article class="hao-prod-card hao-prod-card--work">
          <div class="hao-prod-card__topline">
            <span>{{ operation.id }}</span>
            <strong>{{ operation.status }}</strong>
          </div>
          <h3>{{ operation.title }}</h3>
          <p>{{ operation.summary }}</p>
          {% if operation.href %}
            <a class="hao-prod-text-link" href="{{ operation.href }}" target="_blank" rel="noopener noreferrer">{{ operation.label | default: "Open" }} →</a>
          {% endif %}
        </article>
      {% endfor %}
    </div>
  </section>

  <section class="hao-prod-section hao-prod-section--systems" id="systems" aria-labelledby="systems-title">
    <div class="hao-prod-section__header">
      <p class="hao-prod-eyebrow">Selected systems</p>
      <h2 id="systems-title">Public surfaces and working tools.</h2>
      <p>A manually ordered view of systems that have moved beyond notes: data products, local-first tools, training apps, and research infrastructure.</p>
    </div>

    <div class="hao-prod-system-stack">
      {% for group in site.data.selected_deployments.groups %}
        <section class="hao-prod-system-group" aria-labelledby="hao-system-group-{{ group.id }}">
          <div class="hao-prod-system-group__intro">
            <p class="hao-prod-card-label">{{ group.kicker }}</p>
            <h3 id="hao-system-group-{{ group.id }}">{{ group.title }}</h3>
            <p>{{ group.summary }}</p>
          </div>
          <div class="hao-prod-system-grid">
            {% for deployment in group.deployments %}
              <article class="hao-prod-card hao-prod-card--system">
                <div class="hao-prod-card__topline">
                  <span>{{ deployment.ref }}</span>
                  <strong>{{ deployment.status }}</strong>
                </div>
                <h4>{{ deployment.title }}</h4>
                <p class="hao-prod-kind">{{ deployment.kind }}</p>
                <p>{{ deployment.summary }}</p>
                <div class="hao-prod-link-row">
                  {% if deployment.href %}
                    <a class="hao-prod-text-link" href="{{ deployment.href }}" target="_blank" rel="noopener noreferrer">{{ deployment.primary_label | default: "Open" }} →</a>
                  {% endif %}
                  {% if deployment.secondary_href %}
                    <a class="hao-prod-text-link" href="{{ deployment.secondary_href }}" target="_blank" rel="noopener noreferrer">{{ deployment.secondary_label | default: "Repository" }} →</a>
                  {% endif %}
                </div>
              </article>
            {% endfor %}
          </div>
        </section>
      {% endfor %}
    </div>

    <div class="hao-prod-archive-links">
      <a href="{{ '/projects/' | relative_url }}">Full project archive</a>
      <a href="{{ '/repositories/' | relative_url }}">Repository archive</a>
    </div>
  </section>

  <section class="hao-prod-section hao-prod-section--knowledge" id="knowledge" aria-labelledby="knowledge-title">
    <div class="hao-prod-section__header">
      <p class="hao-prod-eyebrow">Knowledge work</p>
      <h2 id="knowledge-title">Research records and field notes in one workspace.</h2>
      <p>The homepage keeps formal research artifacts and working notes close together, because the same evidence base feeds both.</p>
    </div>

    <div class="hao-prod-knowledge-grid">
      <div class="hao-prod-knowledge-panel" id="research">
        <div class="hao-prod-panel-heading">
          <p class="hao-prod-card-label">Research record</p>
          <h3>Evidence, papers, and technical artifacts.</h3>
        </div>
        <div class="hao-prod-record-list">
          {% for record in site.data.research_records.records %}
            <article class="hao-prod-record">
              <div class="hao-prod-card__topline">
                <span>{{ record.id }}</span>
                <strong>{{ record.status }}</strong>
              </div>
              <h4>{{ record.title }}</h4>
              <p class="hao-prod-kind">{{ record.kind }}</p>
              <p>{{ record.summary }}</p>
              <div class="hao-prod-link-row">
                {% if record.href %}
                  <a class="hao-prod-text-link" href="{{ record.href }}" target="_blank" rel="noopener noreferrer">{{ record.label | default: "Open" }} →</a>
                {% endif %}
                {% if record.secondary_href %}
                  <a class="hao-prod-text-link" href="{{ record.secondary_href }}">{{ record.secondary_label | default: "More" }} →</a>
                {% endif %}
              </div>
            </article>
          {% endfor %}
        </div>
      </div>

      <div class="hao-prod-knowledge-panel" id="notes">
        <div class="hao-prod-panel-heading">
          <p class="hao-prod-card-label">Field observations</p>
          <h3>Notes from the edge of the work.</h3>
        </div>
        <div class="hao-prod-note-list">
          {% for observation in site.data.field_observations.observations %}
            <article class="hao-prod-note">
              <div class="hao-prod-card__topline">
                <span>{{ observation.id }}</span>
                <strong>{{ observation.status }}</strong>
              </div>
              <h4>{{ observation.title }}</h4>
              <p>{{ observation.summary }}</p>
              {% if observation.href %}
                <a class="hao-prod-text-link" href="{{ observation.href }}">{{ observation.label | default: "Read" }} →</a>
              {% endif %}
            </article>
          {% endfor %}
        </div>
        <div class="hao-prod-archive-links hao-prod-archive-links--compact">
          <a href="{{ '/blog/' | relative_url }}">Full notes archive</a>
        </div>
      </div>
    </div>
  </section>

  <section class="hao-prod-section hao-prod-section--trajectory" id="trajectory" aria-labelledby="trajectory-title">
    <div class="hao-prod-section__header">
      <p class="hao-prod-eyebrow">Career trajectory</p>
      <h2 id="trajectory-title">A path from field operations to product systems.</h2>
    </div>
    <div class="hao-prod-timeline">
      {% for phase in site.data.career_trajectory.phases %}
        <article class="hao-prod-timeline-item">
          <div class="hao-prod-card__topline">
            <span>{{ phase.id }}</span>
            <strong>{{ phase.status }}</strong>
          </div>
          <h3>{{ phase.title }}</h3>
          <p>{{ phase.summary }}</p>
        </article>
      {% endfor %}
    </div>
    <div class="hao-prod-archive-links">
      <a href="{{ '/cv/' | relative_url }}">Full CV archive</a>
    </div>
  </section>

  <section class="hao-prod-contact" id="contact" aria-labelledby="contact-title">
    <div>
      <p class="hao-prod-eyebrow">Contact</p>
      <h2 id="contact-title">Code, records, notes, and support.</h2>
    </div>
    <div class="hao-prod-contact__links">
      <a href="https://github.com/liuh886" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="https://www.linkedin.com/in/liuzhihao" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a href="{{ '/cv/' | relative_url }}">CV</a>
      <a href="{{ '/publications/' | relative_url }}">Publications</a>
      <a href="{{ '/blog/' | relative_url }}">Notes archive</a>
      <a href="https://ko-fi.com/F1F7WYJ6B" target="_blank" rel="noopener noreferrer">Ko-fi</a>
    </div>
  </section>
</div>
