# frozen_string_literal: true

module SiteVisualPolish
  TARGET_PAGES = [
    "_pages/about.md",
    "_pages/portfolio.md",
    "_pages/repositories.md",
    "cv.md"
  ].freeze

  def self.apply_cv_title(page)
    return unless page.relative_path == "cv.md"

    page.output = page.output.sub(
      %r{(<a class="anchor" id="publications"></a>\s*<div class="card mt-3 p-3">\s*<h3 class="card-title font-weight-medium">)Publications(</h3>)},
      "\\1Publications &amp; Patent\\2"
    )
  end

  def self.apply_stylesheet(page)
    return unless TARGET_PAGES.include?(page.relative_path)
    return unless page.output.include?("</head>")
    return if page.output.include?("site-polish.css")

    baseurl = page.site.config["baseurl"].to_s.sub(%r{/$}, "")
    href = "#{baseurl}/assets/css/site-polish.css"
    tag = %(<link rel="stylesheet" href="#{href}">)

    page.output = page.output.sub("</head>", "#{tag}</head>")
  end
end

Jekyll::Hooks.register :pages, :post_render do |page|
  SiteVisualPolish.apply_cv_title(page)
  SiteVisualPolish.apply_stylesheet(page)
end
