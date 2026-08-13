---
layout: default
permalink: /blog/
title: Blog
nav: true
nav_order: 1
pagination:
  enabled: true
  collection: posts
  permalink: /page/:num/
  per_page: 8
  sort_field: date
  sort_reverse: true
  trail:
    before: 1
    after: 3
---

<div class="post hao-blog-index">
  <div class="header-bar">
    <h1>Hao's Notes</h1>
    <h2>Research notes on climate, geospatial data, AI systems, and things I build.</h2>
    <p class="post-meta">Mens sana in corpore sano.</p>
  </div>

  <nav class="tag-category-list" aria-label="Editorial lanes">
    <ul class="p-0 m-0">
      <li><a href="#research-notes">Research Notes</a></li>
      <p>&bull;</p>
      <li><a href="#build-logs">Build Logs</a></li>
      <p>&bull;</p>
      <li><a href="#field-notes">Field Notes</a></li>
      <p>&bull;</p>
      <li><a href="#essays">Essays</a></li>
    </ul>
  </nav>

  {% assign research_posts = site.posts | where: "lane", "research" %}
  <section id="research-notes" aria-labelledby="research-notes-title">
    <h2 id="research-notes-title">Research Notes</h2>
    <p>Methods, datasets, papers, and technical reasoning from climate, remote sensing, geospatial analysis, and geoscience.</p>
    <ul class="post-list">
      {% for post in research_posts %}
        <li>
          <h3>
            {% if post.redirect == blank %}
              <a class="post-title" href="{{ post.url | relative_url }}">{{ post.title }}</a>
            {% elsif post.redirect contains '://' %}
              <a class="post-title" href="{{ post.redirect }}" target="_blank" rel="noopener noreferrer">{{ post.title }}</a>
            {% else %}
              <a class="post-title" href="{{ post.redirect | relative_url }}">{{ post.title }}</a>
            {% endif %}
          </h3>
          {% if post.description %}<p>{{ post.description }}</p>{% endif %}
          <p class="post-meta">{{ post.date | date: '%B %d, %Y' }}</p>
        </li>
      {% endfor %}
    </ul>
  </section>

  {% assign build_posts = site.posts | where: "lane", "build" %}
  <section id="build-logs" aria-labelledby="build-logs-title">
    <h2 id="build-logs-title">Build Logs</h2>
    <p>Architecture decisions, agentic workflows, personal software, and lessons from turning ideas into working systems.</p>
    <ul class="post-list">
      {% for post in build_posts %}
        <li>
          <h3><a class="post-title" href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
          {% if post.description %}<p>{{ post.description }}</p>{% endif %}
          <p class="post-meta">{{ post.date | date: '%B %d, %Y' }}</p>
        </li>
      {% endfor %}
    </ul>
  </section>

  {% assign field_posts = site.posts | where: "lane", "field" %}
  <section id="field-notes" aria-labelledby="field-notes-title">
    <h2 id="field-notes-title">Field Notes</h2>
    <p>Observations from field work, expeditions, travel, and direct encounters with landscapes, instruments, and operational problems.</p>
    <ul class="post-list">
      {% for post in field_posts %}
        <li>
          <h3>
            {% if post.redirect == blank %}
              <a class="post-title" href="{{ post.url | relative_url }}">{{ post.title }}</a>
            {% elsif post.redirect contains '://' %}
              <a class="post-title" href="{{ post.redirect }}" target="_blank" rel="noopener noreferrer">{{ post.title }}</a>
            {% else %}
              <a class="post-title" href="{{ post.redirect | relative_url }}">{{ post.title }}</a>
            {% endif %}
          </h3>
          {% if post.description %}<p>{{ post.description }}</p>{% endif %}
          <p class="post-meta">{{ post.date | date: '%B %d, %Y' }}</p>
        </li>
      {% endfor %}
    </ul>
  </section>

  {% assign essay_posts = site.posts | where: "lane", "essay" %}
  <section id="essays" aria-labelledby="essays-title">
    <h2 id="essays-title">Essays</h2>
    <p>Longer-form reflections on ideas, judgment, learning, and the relationship between technical work and a wider life.</p>
    <ul class="post-list">
      {% for post in essay_posts %}
        <li>
          <h3><a class="post-title" href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
          {% if post.description %}<p>{{ post.description }}</p>{% endif %}
          <p class="post-meta">{{ post.date | date: '%B %d, %Y' }}</p>
        </li>
      {% endfor %}
    </ul>
  </section>

  {% assign featured_posts = site.posts | where: "featured", "true" %}
  {% if featured_posts.size > 0 %}
    <hr>
    <h2>Featured</h2>
    <div class="container featured-posts">
      {% assign is_even = featured_posts.size | modulo: 2 %}
      <div class="row row-cols-{% if featured_posts.size <= 2 or is_even == 0 %}2{% else %}3{% endif %}">
        {% for post in featured_posts %}
          <div class="col mb-4">
            <a href="{{ post.url | relative_url }}">
              <div class="card hoverable">
                <div class="row g-0">
                  <div class="col-md-12">
                    <div class="card-body">
                      <div class="float-right"><i class="fa-solid fa-thumbtack fa-xs"></i></div>
                      <h3 class="card-title">{{ post.title }}</h3>
                      <p class="card-text">{{ post.description }}</p>
                      {% if post.external_source == blank %}
                        {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
                      {% else %}
                        {% assign read_time = post.feed_content | strip_html | number_of_words | divided_by: 180 | plus: 1 %}
                      {% endif %}
                      {% assign year = post.date | date: "%Y" %}
                      <p class="post-meta">
                        {{ read_time }} min read &nbsp; &middot; &nbsp;
                        <a href="{{ year | prepend: '/blog/' | relative_url }}"><i class="fa-solid fa-calendar fa-sm"></i> {{ year }}</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        {% endfor %}
      </div>
    </div>
  {% endif %}

  <hr>
  <h2 id="all-notes">All notes</h2>
  <ul class="post-list">
    {% if page.pagination.enabled %}
      {% assign postlist = paginator.posts %}
    {% else %}
      {% assign postlist = site.posts %}
    {% endif %}

    {% for post in postlist %}
      {% if post.external_source == blank %}
        {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
      {% else %}
        {% assign read_time = post.feed_content | strip_html | number_of_words | divided_by: 180 | plus: 1 %}
      {% endif %}
      {% assign year = post.date | date: "%Y" %}
      {% assign tags = post.tags | join: "" %}
      {% assign categories = post.categories | join: "" %}

      <li>
        {% if post.thumbnail %}<div class="row"><div class="col-sm-9">{% endif %}
        <h3>
          {% if post.redirect == blank %}
            <a class="post-title" href="{{ post.url | relative_url }}">{{ post.title }}</a>
          {% elsif post.redirect contains '://' %}
            <a class="post-title" href="{{ post.redirect }}" target="_blank" rel="noopener noreferrer">{{ post.title }}</a>
            <svg width="2rem" height="2rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          {% else %}
            <a class="post-title" href="{{ post.redirect | relative_url }}">{{ post.title }}</a>
          {% endif %}
        </h3>
        <p>{{ post.description }}</p>
        <p class="post-meta">
          {{ read_time }} min read &nbsp; &middot; &nbsp;
          {{ post.date | date: '%B %d, %Y' }}
          {% if post.external_source %}&nbsp; &middot; &nbsp; {{ post.external_source }}{% endif %}
        </p>
        <p class="post-tags">
          <a href="{{ year | prepend: '/blog/' | relative_url }}"><i class="fa-solid fa-calendar fa-sm"></i> {{ year }}</a>
          {% if tags != "" %}
            &nbsp; &middot; &nbsp;
            {% for tag in post.tags %}
              <a href="{{ tag | slugify | prepend: '/blog/tag/' | relative_url }}"><i class="fa-solid fa-hashtag fa-sm"></i> {{ tag }}</a>{% unless forloop.last %}&nbsp;{% endunless %}
            {% endfor %}
          {% endif %}
          {% if categories != "" %}
            &nbsp; &middot; &nbsp;
            {% for category in post.categories %}
              <a href="{{ category | slugify | prepend: '/blog/category/' | relative_url }}"><i class="fa-solid fa-tag fa-sm"></i> {{ category }}</a>{% unless forloop.last %}&nbsp;{% endunless %}
            {% endfor %}
          {% endif %}
        </p>
        {% if post.thumbnail %}
          </div>
          <div class="col-sm-3"><img class="card-img" src="{{ post.thumbnail | relative_url }}" style="object-fit: cover; height: 90%" alt=""></div>
          </div>
        {% endif %}
      </li>
    {% endfor %}
  </ul>

  {% if page.pagination.enabled %}
    {% include pagination.liquid %}
  {% endif %}
</div>
