# frozen_string_literal: true

module SiteVisualPolish
  TARGET_PAGES = [
    "_pages/about.md",
    "_pages/blog.md",
    "_pages/portfolio.md",
    "_pages/projects.md",
    "_pages/repositories.md",
    "cv.md"
  ].freeze

  TARGET_URLS = [
    "/",
    "/blog/",
    "/portfolio/",
    "/projects/",
    "/repositories/",
    "/cv/"
  ].freeze

  TARGET_URL_PREFIXES = [
    "/blog/",
    "/projects/"
  ].freeze

  # Keep this list intentionally short. Older Mission Log experiment layers are
  # no longer loaded; the homepage is governed by the safe layer plus the final
  # Superdesign shell layer.
  STYLESHEETS = [
    "site-polish.css",
    "site-upgrade.css",
    "hao-design.css",
    "hao-home-safe.css",
    "hao-home-center-fix.css"
  ].freeze

  # Bump this value whenever the final visual layer changes. GitHub Pages and
  # browsers may otherwise keep serving an older CSS response for the same path.
  STYLESHEET_VERSION = "20260802-home-cleanup".freeze

  def self.apply_cv_title(page)
    return unless page.relative_path == "cv.md"

    page.output = page.output.sub(
      %r{(<a class="anchor" id="publications"></a>\s*<div class="card mt-3 p-3">\s*<h3 class="card-title font-weight-medium">)Publications(</h3>)},
      "\\1Publications &amp; Patent\\2"
    )
  end

  def self.target_page?(page)
    url = page.url.to_s

    TARGET_PAGES.include?(page.relative_path) ||
      TARGET_URLS.include?(url) ||
      TARGET_URL_PREFIXES.any? { |prefix| url.start_with?(prefix) }
  end

  def self.apply_stylesheet(page)
    return unless target_page?(page)
    return unless page.output.include?("</head>")

    baseurl = page.site.config["baseurl"].to_s.sub(%r{/$}, "")

    STYLESHEETS.each do |stylesheet|
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
    SiteVisualPolish.apply_stylesheet(page)
  end
end
