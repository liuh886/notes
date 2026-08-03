# frozen_string_literal: true

module SiteVisualPolish
  # Keep the starter close to upstream al-folio by default. Secondary pages such
  # as Blog, Projects, Repositories, and CV should use the theme's native visual
  # grammar unless a change is deliberately made in the theme/gem layer.
  HOMEPAGE_STYLESHEETS = [
    "hao-home-center-fix.css"
  ].freeze

  # Bump this value whenever the homepage enhancement layer changes. GitHub
  # Pages and browsers may otherwise keep serving an older CSS response for the
  # same path.
  STYLESHEET_VERSION = "20260803-shell-banner-grid".freeze

  def self.apply_cv_title(page)
    return unless page.relative_path == "cv.md"

    page.output = page.output.sub(
      %r{(<a class="anchor" id="publications"></a>\s*<div class="card mt-3 p-3">\s*<h3 class="card-title font-weight-medium">)Publications(</h3>)},
      "\\1Publications &amp; Patent\\2"
    )
  end

  def self.home_page?(page)
    page.relative_path == "_pages/about.md" || page.url.to_s == "/"
  end

  def self.apply_home_body_class(page)
    return unless home_page?(page)
    return unless page.output.include?("hao-home--alfolio")
    return if page.output.include?("hao-home-page")

    # Give the rendered homepage a stable, explicit scope. This avoids relying
    # on :has(), keeps PurgeCSS selectors deterministic, and lets the stylesheet
    # target the theme's real body-level content container.
    page.output = page.output.sub('<body class="', '<body class="hao-home-page ')
  end

  def self.apply_home_navbar_brand(page)
    return unless home_page?(page)
    return unless page.output.include?("hao-home--alfolio")
    return if page.output.include?("hao-home-navbar-brand")

    baseurl = page.site.config["baseurl"].to_s.sub(%r{/$}, "")
    home_href = baseurl.empty? ? "/" : "#{baseurl}/"

    # Upstream al-folio intentionally omits the navbar brand on the homepage,
    # while secondary pages render it. Reinsert the same semantic brand pattern
    # on this customized homepage so the site remains visually consistent.
    brand = %(<a class="navbar-brand title font-weight-lighter hao-home-navbar-brand" data-hao-home-brand="true" href="#{home_href}"><span class="font-weight-bold">Zhihao</span> LIU</a>)

    navbar_container = %r{(<nav[^>]*class="[^"]*\bnavbar\b[^"]*"[^>]*>\s*<div[^>]*class="[^"]*\bcontainer(?:-fluid)?\b[^"]*"[^>]*>)}m
    page.output = page.output.sub(navbar_container, "\\1\n      #{brand}")
  end

  def self.apply_homepage_stylesheet(page)
    return unless home_page?(page)
    return unless page.output.include?("</head>")

    baseurl = page.site.config["baseurl"].to_s.sub(%r{/$}, "")

    HOMEPAGE_STYLESHEETS.each do |stylesheet|
      next if page.output.include?(stylesheet)

      href = "#{baseurl}/assets/css/#{stylesheet}?v=#{STYLESHEET_VERSION}"
      tag = %(<link rel="stylesheet" href="#{href}">)
      page.output = page.output.sub("</head>", "#{tag}</head>")
    end
  end
end

[:pages, :documents].each do |hook_owner|
  Jekyll::Hooks.register hook_owner, :post_render do |page|
    SiteVisualPolish.apply_cv_title(page)
    SiteVisualPolish.apply_home_body_class(page)
    SiteVisualPolish.apply_home_navbar_brand(page)
    SiteVisualPolish.apply_homepage_stylesheet(page)
  end
end
