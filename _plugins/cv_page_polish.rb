# frozen_string_literal: true

Jekyll::Hooks.register :pages, :post_render do |page|
  next unless page.relative_path == "cv.md"

  page.output = page.output.sub(
    %r{(<a class="anchor" id="publications"></a>\s*<div class="card mt-3 p-3">\s*<h3 class="card-title font-weight-medium">)Publications(</h3>)},
    "\\1Publications &amp; Patent\\2"
  )

  cv_styles = <<~CSS
    <style id="cv-page-polish">
      .post-header .post-title {
        margin-bottom: 0.25rem;
      }
      .post-header .post-description {
        font-size: 1rem;
        opacity: 0.76;
      }
      .cv .card {
        border: 1px solid var(--global-divider-color);
        border-radius: 8px;
        box-shadow: 0 8px 22px rgba(0, 0, 0, 0.04);
        padding: 1.15rem !important;
      }
      html[data-theme="dark"] .cv .card {
        box-shadow: 0 10px 26px rgba(0, 0, 0, 0.22);
      }
      .cv .card-title {
        margin-bottom: 0.9rem;
        font-size: 1.12rem;
        letter-spacing: 0;
      }
      .cv .list-group-item {
        border-color: var(--global-divider-color);
        padding: 0.95rem 0;
      }
      .cv .badge {
        border-radius: 6px;
        letter-spacing: 0;
        text-transform: none !important;
      }
      .cv h6.title {
        font-size: 1rem;
        line-height: 1.35;
      }
      .cv ul.items {
        margin-top: 0.45rem;
      }
      .cv ul.items li {
        margin-bottom: 0.25rem;
      }
    </style>
  CSS

  page.output = page.output.sub("</head>", "#{cv_styles}</head>")
end
