---
layout: about
title: Hao's Notes
permalink: /
nav_order: 0
subtitle: Climate & Energy Data Scientist
subtitle_extra: "Caixin ESG30 Young Scholar"

profile:
  align: right
  image: blog_pic.jpg
  image_circular: false # crops the image to make it circular
  more_info: >
    <p>📍Offshore Bergen, 2020 Aug</p>

news: false # replaced by CURRENT OPERATIONS / 01 mission log
announcements:
  enabled: true
  scrollable: false
  limit: 4

latest_posts:
  enabled: false
  scrollable: true
  limit: 4

selected_papers: false # replaced by RESEARCH RECORD / 05 mission log
projects: false # selected deployments are now composed manually below
display_categories: [work]
social: true # rendered from _data/socials.yml
home_cta: true
---

<div class="mission-log-home">
  <section class="mission-cover" aria-labelledby="mission-cover-title">
    <div class="mission-section-kicker">COVER / 00</div>
    <h1 id="mission-cover-title">Small systems, field notes, and decision tools.</h1>
    <p class="mission-cover__subtitle">Recorded from the edge of climate, geospatial intelligence, and AI productivity.</p>
    <p class="mission-cover__note">A continuous mission log of what I am building, researching, and observing across data systems, energy transition questions, and AI-native personal tools.</p>
    <div class="mission-cover__actions" aria-label="Mission log shortcuts">
      <a class="mission-button mission-button--primary" href="#current-operations">Enter log</a>
      <a class="mission-button" href="{{ '/blog/' | relative_url }}">Read notes</a>
      <a class="mission-button" href="{{ '/repositories/' | relative_url }}">Repository archive</a>
    </div>
  </section>

  <section class="mission-index" aria-labelledby="mission-index-title">
    <div class="mission-section-kicker">MISSION INDEX</div>
    <h2 id="mission-index-title">A long-form homepage in progress</h2>
    <p>The home page is being rebuilt as the primary narrative surface for Hao's Notes. It now organizes current operations, deployed systems, research outputs, field observations, career trajectory, and contact paths while keeping full archive pages available in the background.</p>
    <div class="mission-index__grid">
      <a class="mission-index__item" href="#current-operations">
        <span>CURRENT OPERATIONS / 01</span>
        <strong>Active task log</strong>
      </a>
      <a class="mission-index__item" href="#selected-deployments">
        <span>SELECTED DEPLOYMENTS / 02-04</span>
        <strong>Systems and tools</strong>
      </a>
      <a class="mission-index__item" href="#research-record">
        <span>RESEARCH RECORD / 05</span>
        <strong>Research outputs</strong>
      </a>
      <a class="mission-index__item" href="#field-observations">
        <span>FIELD OBSERVATIONS / 06</span>
        <strong>Notes and essays</strong>
      </a>
      <a class="mission-index__item" href="#career-trajectory">
        <span>CAREER TRAJECTORY / 07</span>
        <strong>Path formation</strong>
      </a>
      <a class="mission-index__item" href="#contact-back-cover">
        <span>CONTACT / BACK COVER</span>
        <strong>Links and contact</strong>
      </a>
    </div>
  </section>

  <section id="current-operations" class="mission-section mission-section--operations" aria-labelledby="current-operations-title">
    <div class="mission-section-kicker">CURRENT OPERATIONS / 01</div>
    <h2 id="current-operations-title">Active tasks and systems in motion</h2>
    <p class="mission-section__intro">A compact task log of the systems that are live, in progress, or under research right now.</p>
    <div class="operations-log" aria-label="Current operations">
      {% for operation in site.data.current_operations.operations %}
        <article class="operations-log__entry">
          <div class="operations-log__meta">
            <span>{{ operation.id }}</span>
            <strong>{{ operation.status }}</strong>
          </div>
          <div class="operations-log__body">
            <h3>{{ operation.title }}</h3>
            <p>{{ operation.summary }}</p>
            {% if operation.href %}
              <a href="{{ operation.href }}" target="_blank" rel="noopener noreferrer">{{ operation.label | default: "Open" }} →</a>
            {% endif %}
          </div>
        </article>
      {% endfor %}
    </div>
  </section>

  <section id="selected-deployments" class="mission-section mission-section--deployments" aria-labelledby="selected-deployments-title">
    <div class="mission-section-kicker">SELECTED DEPLOYMENTS / 02-04</div>
    <h2 id="selected-deployments-title">Manually prioritized systems and technical assets</h2>
    <p class="mission-section__intro">Selected deployments are ordered by importance rather than repository chronology. Full project and repository archives remain available as supporting records.</p>
    <div class="deployments-log">
      {% for group in site.data.selected_deployments.groups %}
        <section class="deployments-group" aria-labelledby="deployment-group-{{ group.id }}">
          <div class="deployments-group__header">
            <span>{{ group.kicker }}</span>
            <h3 id="deployment-group-{{ group.id }}">{{ group.title }}</h3>
            <p>{{ group.summary }}</p>
          </div>
          <div class="deployments-grid">
            {% for deployment in group.deployments %}
              <article class="deployment-card">
                <div class="deployment-card__meta">
                  <span>{{ deployment.ref }}</span>
                  <strong>{{ deployment.status }}</strong>
                </div>
                <h4>{{ deployment.title }}</h4>
                <p class="deployment-card__kind">{{ deployment.kind }}</p>
                <p>{{ deployment.summary }}</p>
                <div class="deployment-card__actions">
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
    <div class="mission-archive-links" aria-label="Full archives">
      <a href="{{ '/projects/' | relative_url }}">Full project archive →</a>
      <a href="{{ '/repositories/' | relative_url }}">Repository archive →</a>
    </div>
  </section>

  <section id="research-record" class="mission-section mission-section--research" aria-labelledby="research-record-title">
    <div class="mission-section-kicker">RESEARCH RECORD / 05</div>
    <h2 id="research-record-title">Selected research outputs and knowledge records</h2>
    <p class="mission-section__intro">This section replaces the old selected-publications block with a tighter research record: formal publication, research systems, and field-oriented technical artifacts.</p>
    <div class="research-records">
      {% for record in site.data.research_records.records %}
        <article class="research-record">
          <div class="research-record__meta">
            <span>{{ record.id }}</span>
            <strong>{{ record.status }}</strong>
          </div>
          <div class="research-record__body">
            <h3>{{ record.title }}</h3>
            <p class="research-record__kind">{{ record.kind }}</p>
            <p>{{ record.summary }}</p>
            <div class="research-record__actions">
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

  <section id="field-observations" class="mission-section mission-section--observations" aria-labelledby="field-observations-title">
    <div class="mission-section-kicker">FIELD OBSERVATIONS / 06</div>
    <h2 id="field-observations-title">Selected notes from the field</h2>
    <p class="mission-section__intro">A curated layer of observations, build notes, and technical records. This is not the full blog; it is the reading path that best supports the Mission Log.</p>
    <div class="field-observations">
      {% for observation in site.data.field_observations.observations %}
        <article class="field-observation">
          <div class="field-observation__meta">
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
    <div class="mission-archive-links" aria-label="Notes archive">
      <a href="{{ '/blog/' | relative_url }}">Full notes archive →</a>
    </div>
  </section>

  <section id="career-trajectory" class="mission-section mission-section--trajectory" aria-labelledby="career-trajectory-title">
    <div class="mission-section-kicker">CAREER TRAJECTORY / 07</div>
    <h2 id="career-trajectory-title">How this path formed</h2>
    <p class="mission-section__intro">A phase narrative rather than a full CV. The complete formal record remains available in the CV archive.</p>
    <div class="career-trajectory">
      {% for phase in site.data.career_trajectory.phases %}
        <article class="career-phase">
          <div class="career-phase__meta">
            <span>{{ phase.id }}</span>
            <strong>{{ phase.status }}</strong>
          </div>
          <h3>{{ phase.title }}</h3>
          <p>{{ phase.summary }}</p>
        </article>
      {% endfor %}
    </div>
    <div class="mission-archive-links" aria-label="CV archive">
      <a href="{{ '/cv/' | relative_url }}">Full CV archive →</a>
    </div>
  </section>

  <section id="contact-back-cover" class="mission-section mission-back-cover" aria-labelledby="contact-back-cover-title">
    <div class="mission-section-kicker">CONTACT / BACK COVER</div>
    <h2 id="contact-back-cover-title">End of log</h2>
    <p>If something here resonates, use the links below for code, records, archives, support, or direct contact.</p>
    <div class="back-cover-links" aria-label="Contact and archive links">
      <a href="https://github.com/liuh886" target="_blank" rel="noopener noreferrer">GitHub →</a>
      <a href="https://www.linkedin.com/in/liuzhihao" target="_blank" rel="noopener noreferrer">LinkedIn →</a>
      <a href="{{ '/cv/' | relative_url }}">CV →</a>
      <a href="{{ '/publications/' | relative_url }}">Publications →</a>
      <a href="{{ '/blog/' | relative_url }}">Notes archive →</a>
      <a href="https://ko-fi.com/F1F7WYJ6B" target="_blank" rel="noopener noreferrer">Ko-fi →</a>
    </div>
  </section>
</div>
