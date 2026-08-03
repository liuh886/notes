# frozen_string_literal: true

module SiteVisualPolish
  # Keep the starter close to upstream al-folio by default. The homepage owns one
  # scoped layout stylesheet; CV and Repositories own narrow component layers.
  HOMEPAGE_STYLESHEETS = [
    "hao-home-center-fix.css",
    "hao-home-atmosphere.css"
  ].freeze

  CV_STYLESHEETS = [
    "cv-toc-polish.css"
  ].freeze

  REPOSITORIES_STYLESHEETS = [
    "repositories-page-polish.css"
  ].freeze

  STYLESHEET_VERSION = "20260803-cv-toc-home-81".freeze

  def self.cv_page?(page)
    page.relative_path == "cv.md" || page.url.to_s == "/cv/"
  end

  def self.repositories_page?(page)
    page.relative_path == "_pages/repositories.md" || page.url.to_s == "/repositories/"
  end

  def self.apply_cv_title(page)
    return unless cv_page?(page)

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

    page.output = page.output.sub('<body class="', '<body class="hao-home-page ')
  end

  def self.apply_cv_body_class(page)
    return unless cv_page?(page)
    return if page.output.include?("hao-cv-page")

    page.output = page.output.sub('<body class="', '<body class="hao-cv-page ')
  end

  def self.apply_repositories_body_class(page)
    return unless repositories_page?(page)
    return if page.output.include?("hao-repositories-page")

    page.output = page.output.sub('<body class="', '<body class="hao-repositories-page ')
  end

  def self.apply_home_navbar_brand(page)
    return unless home_page?(page)
    return unless page.output.include?("hao-home--alfolio")
    return if page.output.include?("hao-home-navbar-brand")

    baseurl = page.site.config["baseurl"].to_s.sub(%r{/$}, "")
    home_href = baseurl.empty? ? "/" : "#{baseurl}/"

    brand = %(<a class="navbar-brand title font-weight-lighter hao-home-navbar-brand" data-hao-home-brand="true" href="#{home_href}"><span class="font-weight-bold">Zhihao</span> LIU</a>)

    navbar_container = %r{(<nav[^>]*class="[^"]*\bnavbar\b[^"]*"[^>]*>\s*<div[^>]*class="[^"]*\bcontainer(?:-fluid)?\b[^"]*"[^>]*>)}m
    page.output = page.output.sub(navbar_container, "\\1\n      #{brand}")
  end

  def self.apply_stylesheets(page, stylesheets)
    return unless page.output.include?("</head>")

    baseurl = page.site.config["baseurl"].to_s.sub(%r{/$}, "")

    stylesheets.each do |stylesheet|
      next if page.output.include?(stylesheet)

      href = "#{baseurl}/assets/css/#{stylesheet}?v=#{STYLESHEET_VERSION}"
      tag = %(<link rel="stylesheet" href="#{href}">)
      page.output = page.output.sub("</head>", "#{tag}</head>")
    end
  end

  def self.apply_homepage_stylesheet(page)
    return unless home_page?(page)

    apply_stylesheets(page, HOMEPAGE_STYLESHEETS)
  end

  def self.apply_cv_stylesheet(page)
    return unless cv_page?(page)

    apply_stylesheets(page, CV_STYLESHEETS)
  end

  def self.apply_repositories_stylesheet(page)
    return unless repositories_page?(page)

    apply_stylesheets(page, REPOSITORIES_STYLESHEETS)
  end
end

[:pages, :documents].each do |hook_owner|
  Jekyll::Hooks.register hook_owner, :post_render do |page|
    SiteVisualPolish.apply_cv_title(page)
    SiteVisualPolish.apply_home_body_class(page)
    SiteVisualPolish.apply_cv_body_class(page)
    SiteVisualPolish.apply_repositories_body_class(page)
    SiteVisualPolish.apply_home_navbar_brand(page)
    SiteVisualPolish.apply_homepage_stylesheet(page)
    SiteVisualPolish.apply_cv_stylesheet(page)
    SiteVisualPolish.apply_repositories_stylesheet(page)
  end
end
