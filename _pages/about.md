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

<div class="hao-home hao-home--v6">
  <section class="hao-home-hero" aria-labelledby="hao-home-title">
    <div class="hao-home-hero__copy">
      <p class="hao-home-kicker">Zhihao Liu · climate data · geoscience · AI tools</p>
      <h1 id="hao-home-title">Building small data systems for climate, geoscience, and personal productivity.</h1>
      <p class="hao-home-hero__lede">Hao's Notes is the public home for research records, shipped tools, field notes, and local-first systems. The work connects climate intelligence, geospatial evidence, offshore practice, and AI-native workflows.</p>
      <div class="hao-home-hero__actions" aria-label="Homepage shortcuts">
        <a class="hao-home-button hao-home-button--primary" href="#current-work">Current work</a>
        <a class="hao-home-button" href="#systems">Systems</a>
        <a class="hao-home-button" href="{{ '/blog/' | relative_url }}">Notes</a>
      </div>
    </div>

    <aside class="hao-home-profile" aria-label="Profile summary">
      <figure class="hao-home-profile__portrait">
        <img src="{{ '/assets/img/blog_pic.jpg' | relative_url }}" alt="Zhihao Liu" loading="eager">
      </figure>
      <div class="hao-home-profile__body">
        <p class="hao-home-profile__label">Profile</p>
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

  <nav class="hao-home-index" aria-label="Homepage sections">
    <a href="#current-work">Current work</a>
    <a href="#systems">Systems</a>
    <a href="#research">Research</a>
    <a href="#notes">Notes</a>
    <a href="#trajectory">Trajectory</a>
    <a href="#contact">Contact</a>
  </nav>

  <section class="hao-home-section hao-home-section--current" id="current-work" aria-labelledby="current-work-title">
    <div class="hao-home-section__intro">
      <p class="hao-home-section__kicker">Current work</p>
      <h2 id="current-work-title">Active tracks, not a news feed.</h2>
      <p>The homepage now treats updates as maintained work lanes: active products, research engines, and public knowledge systems.</p>
    </div>
    <div class="hao-home-current-grid">
      {% for operation in site.data.current_operations.operations %}
        <article class="hao-home-current-card">
          <div class="hao-home-card__meta">
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

  <section class="hao-home-section hao-home-section--dispatch" aria-labelledby="dispatch-title">
    <div class="hao-home-section__intro">
      <p class="hao-home-section__kicker">Task notes</p>
      <h2 id="dispatch-title">Recent direction changes</h2>
    </div>
    <div class="hao-home-dispatch-list">
      {% for dispatch in site.data.current_operations.dispatches %}
        <article class="hao-home-dispatch">
          <time>{{ dispatch.date }}</time>
          <h3>{{ dispatch.label }}</h3>
          <p>{{ dispatch.text }}</p>
        </article>
      {% endfor %}
    </div>
  </section>

  <section class="hao-home-section" id="systems" aria-labelledby="systems-title">
    <div class="hao-home-section__intro">
      <p class="hao-home-section__kicker">Selected systems</p>
      <h2 id="systems-title">Public surfaces and working tools</h2>
      <p>A manually ordered view of systems that have moved beyond notes: public data products, local-first tools, training apps, and research infrastructure.</p>
    </div>
    <div class="hao-home-systems">
      {% for group in site.data.selected_deployments.groups %}
        <section class="hao-home-system-group" aria-labelledby="hao-system-group-{{ group.id }}">
          <div class="hao-home-group-heading">
            <span>{{ group.kicker }}</span>
            <h3 id="hao-system-group-{{ group.id }}">{{ group.title }}</h3>
            <p>{{ group.summary }}</p>
          </div>
          <div class="hao-home-system-grid">
            {% for deployment in group.deployments %}
              <article class="hao-home-system-card">
                <div class="hao-home-card__meta">
                  <span>{{ deployment.ref }}</span>
                  <strong>{{ deployment.status }}</strong>
                </div>
                <h4>{{ deployment.title }}</h4>
                <p class="hao-home-card__kind">{{ deployment.kind }}</p>
                <p>{{ deployment.summary }}</p>
                <div class="hao-home-card__links">
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
    <div class="hao-home-archive-links">
      <a href="{{ '/projects/' | relative_url }}">Full project archive</a>
      <a href="{{ '/repositories/' | relative_url }}">Repository archive</a>
    </div>
  </section>

  <section class="hao-home-section" id="research" aria-labelledby="research-title">
    <div class="hao-home-section__intro">
      <p class="hao-home-section__kicker">Research record</p>
      <h2 id="research-title">Evidence, papers, and technical artifacts</h2>
    </div>
    <div class="hao-home-record-list">
      {% for record in site.data.research_records.records %}
        <article class="hao-home-record">
          <div class="hao-home-card__meta">
            <span>{{ record.id }}</span>
            <strong>{{ record.status }}</strong>
          </div>
          <div>
            <h3>{{ record.title }}</h3>
            <p class="hao-home-card__kind">{{ record.kind }}</p>
            <p>{{ record.summary }}</p>
            <div class="hao-home-card__links">
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

  <section class="hao-home-section" id="notes" aria-labelledby="notes-title">
    <div class="hao-home-section__intro">
      <p class="hao-home-section__kicker">Field observations</p>
      <h2 id="notes-title">Notes from the edge of the work</h2>
      <p>Selected writing that explains the systems, datasets, and AI-native workflow ideas behind the public projects.</p>
    </div>
    <div class="hao-home-note-grid">
      {% for observation in site.data.field_observations.observations %}
        <article class="hao-home-note-card">
          <div class="hao-home-card__meta">
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
    <div class="hao-home-archive-links">
      <a href="{{ '/blog/' | relative_url }}">Full notes archive</a>
    </div>
  </section>

  <section class="hao-home-section hao-home-section--trajectory" id="trajectory" aria-labelledby="trajectory-title">
    <div class="hao-home-section__intro">
      <p class="hao-home-section__kicker">Career trajectory</p>
      <h2 id="trajectory-title">How this path formed</h2>
    </div>
    <div class="hao-home-timeline">
      {% for phase in site.data.career_trajectory.phases %}
        <article class="hao-home-timeline-item">
          <div class="hao-home-card__meta">
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
    <p class="hao-home-section__kicker">Contact</p>
    <h2 id="contact-title">Code, records, notes, and support</h2>
    <div class="hao-home-contact__links">
      <a href="https://github.com/liuh886" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="https://www.linkedin.com/in/liuzhihao" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a href="{{ '/cv/' | relative_url }}">CV</a>
      <a href="{{ '/publications/' | relative_url }}">Publications</a>
      <a href="{{ '/blog/' | relative_url }}">Notes archive</a>
      <a href="https://ko-fi.com/F1F7WYJ6B" target="_blank" rel="noopener noreferrer">Ko-fi</a>
    </div>
  </section>
</div>
