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

<div class="mission-log-home mission-log-home--v2">
  <section class="mission-cover" aria-labelledby="mission-cover-title">
    <div class="mission-cover__layout">
      <div class="mission-cover__copy">
        <div class="mission-section-kicker">COVER / 00</div>
        <p class="mission-cover__eyebrow">Hao's Notes / Mission Log</p>
        <h1 id="mission-cover-title">A working log for systems, research, and field notes.</h1>
        <p class="mission-cover__subtitle">Recorded from the edge of climate, geospatial intelligence, and AI-native productivity.</p>
        <p class="mission-cover__note">This page is the main route through what I am building, maintaining, studying, and noticing.</p>
        <div class="mission-cover__actions" aria-label="Mission log shortcuts">
          <a class="mission-button mission-button--primary" href="#current-operations">Enter log</a>
          <a class="mission-button" href="{{ '/blog/' | relative_url }}">Read notes</a>
          <a class="mission-button" href="{{ '/repositories/' | relative_url }}">Repository archive</a>
        </div>
      </div>
      <aside class="mission-cover__visual" aria-label="Mission metadata and portrait">
        <figure class="mission-cover__portrait">
          <img src="{{ '/assets/img/blog_pic.jpg' | relative_url }}" alt="Zhihao Liu" loading="eager">
          <figcaption>Offshore Bergen · 2020 Aug</figcaption>
        </figure>
        <div class="mission-orbit" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <dl class="mission-cover__metadata">
          <div>
            <dt>LOG STATUS</dt>
            <dd>ACTIVE</dd>
          </div>
          <div>
            <dt>FIELD</dt>
            <dd>CLIMATE · GEO · AI</dd>
          </div>
          <div>
            <dt>MAINTAINED BY</dt>
            <dd>ZHIHAO LIU</dd>
          </div>
        </dl>
        <div class="mission-cover__chips" aria-hidden="true">
          <span>systems</span>
          <span>field notes</span>
          <span>decision tools</span>
        </div>
      </aside>
    </div>
  </section>

  <div class="mission-log-body">
    <nav class="mission-page-rail" aria-label="Mission Log page markers">
      <a href="#current-operations" data-section="current-operations"><span>01</span><strong>Operations</strong></a>
      <a href="#selected-deployments" data-section="selected-deployments"><span>02</span><strong>Deployments</strong></a>
      <a href="#research-record" data-section="research-record"><span>05</span><strong>Research</strong></a>
      <a href="#field-observations" data-section="field-observations"><span>06</span><strong>Observations</strong></a>
      <a href="#career-trajectory" data-section="career-trajectory"><span>07</span><strong>Trajectory</strong></a>
      <a href="#contact-back-cover" data-section="contact-back-cover"><span>08</span><strong>Contact</strong></a>
    </nav>

    <div class="mission-log-sections">
      <section id="current-operations" class="mission-section mission-section--operations" aria-labelledby="current-operations-title">
        <div class="mission-section-kicker">CURRENT OPERATIONS / 01</div>
        <h2 id="current-operations-title">Task records in motion</h2>
        <p class="mission-section__intro">A current task record for live systems, ongoing builds, and research work.</p>
        <div class="operations-log" aria-label="Current task records">
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
        <h2 id="selected-deployments-title">Prioritized systems and technical assets</h2>
        <p class="mission-section__intro">A curated deployment list ordered by importance rather than repository chronology.</p>
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
        <p class="mission-section__intro">Formal publication, research systems, and field-oriented technical records.</p>
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
        <p class="mission-section__intro">A curated reading path through observations, build notes, and technical records.</p>
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
        <p class="mission-section__intro">A phase narrative; the complete formal record remains in the CV archive.</p>
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
        <div class="mission-section-kicker">BACK COVER / 08</div>
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
  </div>
</div>

<script>
  (() => {
    const rail = document.querySelector('.mission-page-rail');
    if (!rail || !('IntersectionObserver' in window)) return;

    const links = Array.from(rail.querySelectorAll('a[data-section]'));
    const sections = links
      .map((link) => document.getElementById(link.dataset.section))
      .filter(Boolean);

    const activate = (id) => {
      links.forEach((link) => {
        const active = link.dataset.section === id;
        link.classList.toggle('is-active', active);
        if (active) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) activate(visible.target.id);
      },
      { rootMargin: '-28% 0px -58% 0px', threshold: [0.12, 0.35, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    if (sections[0]) activate(sections[0].id);
  })();
</script>
