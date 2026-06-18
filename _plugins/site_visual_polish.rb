# frozen_string_literal: true

module SiteVisualPolish
  TARGET_PAGES = [
    "_pages/about.md",
    "_pages/portfolio.md",
    "_pages/repositories.md",
    "cv.md"
  ].freeze

  TARGET_URLS = [
    "/",
    "/portfolio/",
    "/repositories/",
    "/cv/"
  ].freeze

  def self.cv_page?(page)
    page.relative_path == "cv.md" || page.url.to_s == "/cv/"
  end

  def self.apply_cv_title(page)
    return unless cv_page?(page)

    page.output = page.output.sub(
      %r{(<a class="anchor" id="publications"></a>\s*<div class="card mt-3 p-3">\s*<h3 class="card-title font-weight-medium">)Publications(</h3>)},
      "\\1Publications &amp; Patent\\2"
    )
  end

  def self.apply_cv_pdf_link(page)
    return unless cv_page?(page)
    return if page.output.include?("cv-pdf-link")

    page.output = page.output.sub(
      %r{(<h1 class="post-title">[\s\S]*?<a [^>]*href="[^"]+\.pdf"[^>]*class=")([^"]*)("[^>]*>\s*<i class="fa-solid fa-file-pdf"></i>\s*</a>)},
      "\\1\\2 cv-pdf-link\\3"
    )
  end

  def self.apply_stylesheet(page)
    return unless TARGET_PAGES.include?(page.relative_path) || TARGET_URLS.include?(page.url.to_s)
    return unless page.output.include?("</head>")
    return if page.output.include?("site-polish.css")

    baseurl = page.site.config["baseurl"].to_s.sub(%r{/$}, "")
    href = "#{baseurl}/assets/css/site-polish.css"
    tag = %(<link rel="stylesheet" href="#{href}">)

    page.output = page.output.sub("</head>", "#{tag}</head>")
  end

  def self.apply_final_cv_polish(site)
    (site.pages + site.documents).each do |page|
      apply_cv_pdf_link(page)
    end
  end
end

[:pages, :documents].each do |hook_owner|
  Jekyll::Hooks.register hook_owner, :post_render do |page|
    SiteVisualPolish.apply_cv_title(page)
    SiteVisualPolish.apply_cv_pdf_link(page)
    SiteVisualPolish.apply_stylesheet(page)
  end
end

Jekyll::Hooks.register :site, :post_render do |site|
  SiteVisualPolish.apply_final_cv_polish(site)
end
