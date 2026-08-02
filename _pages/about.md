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

<div class="hao-home hao-home--safe">
  <section class="hao-safe-hero" aria-labelledby="hao-safe-title">
    <div class="hao-safe-hero__copy">
      <p class="hao-safe-kicker">Zhihao Liu · Climate data · Geoscience · AI tools</p>
      <h1 id="hao-safe-title">Climate data, geoscience evidence, and small tools.</h1>
      <p class="hao-safe-lede">Hao's Notes is the public home for research records, shipped products, field notes, and local-first systems. The work connects climate intelligence, geospatial evidence, offshore practice, and AI-native workflows.</p>
      <div class="hao-safe-actions" aria-label="Homepage shortcuts">
        <a class="hao-safe-button hao-safe-button--primary" href="#current-work">Current work</a>
        <a class="hao-safe-button" href="#systems">Systems</a>
        <a class="hao-safe-button" href="{{ '/blog/' | relative_url }}">Notes</a>
      </div>
    </div>

    <aside class="hao-safe-profile" aria-label="Profile summary">
      <img src="{{ '/assets/img/blog_pic.jpg' | relative_url }}" alt="Zhihao Liu" loading="eager">
      <div>
        <p class="hao-safe-profile__label">Profile</p>
        <h2>Zhihao Liu</h2>
        <p>Climate & energy data scientist with a geoscience and offshore survey background.</p>
        <dl>
          <div>
            <dt>Focus</dt>
            <dd>Climate · Geo · AI</dd>
          </div>
          <div>
            <dt>Mode</dt>
            <dd>Research · Build · Record</dd>
          </div>
        </dl>
      </div>
    </aside>
  </section>

  <nav class="hao-safe-index" aria-label="Homepage sections">
    <a href="#current-work">Current work</a>
    <a href="#systems">Systems</a>
    <a href="#research">Research</a>
    <a href="#notes">Notes</a>
    <a href="#trajectory">Trajectory</a>
    <a href="#contact">Contact</a>
  </nav>

  <section class="hao-safe-section" id="current-work" aria-labelledby="current-work-title">
    <div class="hao-safe-section__intro">
      <p class="hao-safe-kicker">Current work</p>
      <h2 id="current-work-title">Active tracks, not a news feed.</h2>
      <p>Updates are organized as maintained work lanes: public data systems, product builds, research engines, and training tools.</p>
    </div>
    <div class="hao-safe-card-grid hao-safe-card-grid--current">
      {% for operation in site.data.current_operations.operations %}
        <article class="hao-safe-card">
          <div class="hao-safe-meta">
            <span>{{ operation.id }}</span>
            <strong>{{ operation.status }}</strong>
          </div>
          <h3>{{ operation.title }}</h3>
          <p>{{ operation.summary }}</p>
          {% if operation.href %}
            <a href="{{ operation.href }}" target="_blank" rel="noopener noreferrer">{{ operation.label | default: "Open" }} →</a>
          {% endif %}
        </article>
      {% endfor %}
    </div>
  </section>

  <section class="hao-safe-section" id="systems" aria-labelledby="systems-title">
    <div class="hao-safe-section__intro">
      <p class="hao-safe-kicker">Selected systems</p>
      <h2 id="systems-title">Public surfaces and working tools.</h2>
      <p>A manually ordered view of systems that have moved beyond notes: data products, local-first tools, training apps, and research infrastructure.</p>
    </div>
    <div class="hao-safe-system-stack">
      {% for group in site.data.selected_deployments.groups %}
        <section class="hao-safe-system-group" aria-labelledby="hao-system-group-{{ group.id }}">
          <div class="hao-safe-group-heading">
            <span>{{ group.kicker }}</span>
            <h3 id="hao-system-group-{{ group.id }}">{{ group.title }}</h3>
            <p>{{ group.summary }}</p>
          </div>
          <div class="hao-safe-card-grid">
            {% for deployment in group.deployments %}
              <article class="hao-safe-card">
                <div class="hao-safe-meta">
                  <span>{{ deployment.ref }}</span>
                  <strong>{{ deployment.status }}</strong>
                </div>
                <h4>{{ deployment.title }}</h4>
                <p class="hao-safe-kind">{{ deployment.kind }}</p>
                <p>{{ deployment.summary }}</p>
                <div class="hao-safe-links">
                  {% if deployment.href %}
                    <a href="{{ deployment.href }}" target="_blank" rel="noopener noreferrer">{{ deployment.primary_label | default: "Open" }} →</a>
                  {% endif %}
                  {% if deployment.secondary_href %}
                    <a href="{{ deployment.secondary_href }}" target="_blank" rel="noopener noreferrer">{{ deployment.secondary_label | default: "Repository" }} →</a>
                  {% endif %}
                </div>
              </article>
            {% endfor %}
          </div>
        </section>
      {% endfor %}
    </div>
    <div class="hao-safe-archive-links">
      <a href="{{ '/projects/' | relative_url }}">Full project archive</a>
      <a href="{{ '/repositories/' | relative_url }}">Repository archive</a>
    </div>
  </section>

  <section class="hao-safe-section" id="research" aria-labelledby="research-title">
    <div class="hao-safe-section__intro">
      <p class="hao-safe-kicker">Research record</p>
      <h2 id="research-title">Evidence, papers, and technical artifacts.</h2>
    </div>
    <div class="hao-safe-record-list">
      {% for record in site.data.research_records.records %}
        <article class="hao-safe-record">
          <div class="hao-safe-meta">
            <span>{{ record.id }}</span>
            <strong>{{ record.status }}</strong>
          </div>
          <div>
            <h3>{{ record.title }}</h3>
            <p class="hao-safe-kind">{{ record.kind }}</p>
            <p>{{ record.summary }}</p>
            <div class="hao-safe-links">
              {% if record.href %}
                <a href="{{ record.href }}" target="_blank" rel="noopener noreferrer">{{ record.label | default: "Open" }} →</a>
              {% endif %}
              {% if record.secondary_href %}
                <a href="{{ record.secondary_href }}">{{ record.secondary_label | default: "More" }} →</a>
              {% endif %}
            </div>
          </div>
        </article>
      {% endfor %}
    </div>
  </section>

  <section class="hao-safe-section" id="notes" aria-labelledby="notes-title">
    <div class="hao-safe-section__intro">
      <p class="hao-safe-kicker">Field observations</p>
      <h2 id="notes-title">Notes from the edge of the work.</h2>
      <p>Selected writing that explains the systems, datasets, and AI-native workflow ideas behind the public projects.</p>
    </div>
    <div class="hao-safe-card-grid">
      {% for observation in site.data.field_observations.observations %}
        <article class="hao-safe-card">
          <div class="hao-safe-meta">
            <span>{{ observation.id }}</span>
            <strong>{{ observation.status }}</strong>
          </div>
          <h3>{{ observation.title }}</h3>
          <p>{{ observation.summary }}</p>
          {% if observation.href %}
            <a href="{{ observation.href }}">{{ observation.label | default: "Read" }} →</a>
          {% endif %}
        </article>
      {% endfor %}
    </div>
    <div class="hao-safe-archive-links">
      <a href="{{ '/blog/' | relative_url }}">Full notes archive</a>
    </div>
  </section>

  <section class="hao-safe-section" id="trajectory" aria-labelledby="trajectory-title">
    <div class="hao-safe-section__intro">
      <p class="hao-safe-kicker">Career trajectory</p>
      <h2 id="trajectory-title">How this path formed.</h2>
    </div>
    <div class="hao-safe-timeline">
      {% for phase in site.data.career_trajectory.phases %}
        <article class="hao-safe-timeline-item">
          <div class="hao-safe-meta">
            <span>{{ phase.id }}</span>
            <strong>{{ phase.status }}</strong>
          </div>
          <h3>{{ phase.title }}</h3>
          <p>{{ phase.summary }}</p>
        </article>
      {% endfor %}
    </div>
    <div class="hao-safe-archive-links">
      <a href="{{ '/cv/' | relative_url }}">Full CV archive</a>
    </div>
  </section>

  <section class="hao-safe-contact" id="contact" aria-labelledby="contact-title">
    <p class="hao-safe-kicker">Contact</p>
    <h2 id="contact-title">Code, records, notes, and support.</h2>
    <div class="hao-safe-contact__links">
      <a href="https://github.com/liuh886" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="https://www.linkedin.com/in/liuzhihao" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a href="{{ '/cv/' | relative_url }}">CV</a>
      <a href="{{ '/publications/' | relative_url }}">Publications</a>
      <a href="{{ '/blog/' | relative_url }}">Notes archive</a>
      <a href="https://ko-fi.com/F1F7WYJ6B" target="_blank" rel="noopener noreferrer">Ko-fi</a>
    </div>
  </section>
</div>
