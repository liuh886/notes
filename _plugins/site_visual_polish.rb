# frozen_string_literal: true

module SiteVisualPolish
  # Keep the starter close to upstream al-folio by default. Each customized
  # surface owns one narrowly scoped stylesheet and body class.
  GLOBAL_STYLESHEETS = [
    "footer-build.css"
  ].freeze

  HOMEPAGE_STYLESHEETS = [
    "hao-home-center-fix.css",
    "hao-home-atmosphere-v2.css"
  ].freeze

  CV_STYLESHEETS = [
    "cv-toc-polish.css"
  ].freeze

  REPOSITORIES_STYLESHEETS = [
    "repositories-page-polish.css"
  ].freeze

  PORTFOLIO_STYLESHEETS = [
    "portfolio-page-polish.css"
  ].freeze

  LEGAL_STYLESHEETS = [
    "legal-page.css"
  ].freeze

  STYLESHEET_VERSION = "20260809-legal".freeze

  # MathJax is 1.1 MB of runtime. `_config.yml` keeps `enable_math: false` so the
  # theme never loads it globally; this plugin re-adds the same tags only on pages
  # that actually contain math, mirroring the upstream `al_math` tag minus the
  # legacy ES6 shim that no supported browser needs.
  #
  # Markers cover block math (`$$`, `\[`, environments) and inline math (`\(`,
  # single `$`), because the theme enables all four delimiters in MathJax.
  MATH_MARKERS = [
    /\$\$/,
    /\\\(/,
    /\\\[/,
    /\\begin\{(?:equation|align|math)\}/,
    /\$[^$\n]+\$/
  ].freeze

  def self.truthy?(value)
    value == true || value.to_s == "true"
  end

  def self.script_tag(config, key)
    library = (config["third_party_libraries"] || {})[key]
    return nil unless library.is_a?(Hash)

    url = library.dig("url", "js").to_s
    return nil if url.empty?

    integrity = library.dig("integrity", "js").to_s
    if integrity.empty?
      %(<script defer src="#{url}"></script>)
    else
      %(<script defer src="#{url}" integrity="#{integrity}" crossorigin="anonymous"></script>)
    end
  end

  def self.math_page?(page)
    return true if truthy?(page.data["math"]) || truthy?(page.data["pseudocode"]) || truthy?(page.data["tikzjax"])

    source = page.respond_to?(:content) ? page.content.to_s : ""
    source = page.output.to_s if source.empty?
    MATH_MARKERS.any? { |marker| source.match?(marker) }
  end

  def self.apply_math_scripts(page)
    return unless page.output.include?("</body>")
    return if page.output.include?("mathjax-setup.js") || page.output.include?("pseudocode-setup.js")
    return unless math_page?(page)

    baseurl = page.site.config["baseurl"].to_s.sub(%r{/$}, "")
    scripts = []

    if truthy?(page.data["pseudocode"])
      scripts << %(<script src="#{baseurl}/assets/al_math/js/pseudocode-setup.js"></script>)
      scripts << script_tag(page.site.config, "pseudocode")
    else
      scripts << script_tag(page.site.config, "mathjax")
      scripts << %(<script src="#{baseurl}/assets/al_math/js/mathjax-setup.js"></script>)
    end
    scripts << script_tag(page.site.config, "tikzjax") if truthy?(page.data["tikzjax"])

    markup = scripts.compact.join("\n")
    return if markup.empty?

    page.output = page.output.sub("</body>", "#{markup}\n</body>")
  end

  def self.cv_page?(page)
    page.relative_path == "cv.md" || page.url.to_s == "/cv/"
  end

  def self.repositories_page?(page)
    page.relative_path == "_pages/repositories.md" || page.url.to_s == "/repositories/"
  end

  def self.portfolio_page?(page)
    page.relative_path == "_pages/portfolio.md" || page.url.to_s == "/portfolio/"
  end

  def self.legal_page?(page)
    ["/privacy/", "/terms/"].include?(page.url.to_s)
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

  def self.apply_portfolio_body_class(page)
    return unless portfolio_page?(page)
    return if page.output.include?("hao-portfolio-page")

    page.output = page.output.sub('<body class="', '<body class="hao-portfolio-page ')
  end

  def self.apply_legal_body_class(page)
    return unless legal_page?(page)
    return if page.output.include?("hao-legal-page")

    page.output = page.output.sub('<body class="', '<body class="hao-legal-page ')
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

  def self.apply_home_profile_alt(page)
    return unless home_page?(page)

    alt = page.data.dig("profile", "alt").to_s
    image = page.data.dig("profile", "image").to_s
    return if alt.empty? || image.empty?

    return unless page.output.include?(%(alt="#{image}"))

    page.output = page.output.sub(%(alt="#{image}"), %(alt="#{alt}"))
  end

  def self.cookie_consent_enabled?(page)
    page.site.config["enable_cookie_consent"] ? true : false
  end

  def self.apply_footer_legal_links(page)
    return if page.output.include?(%q(data-hao-legal-links="true"))

    baseurl = page.site.config["baseurl"].to_s.sub(%r{/$}, "")
    privacy_href = baseurl.empty? ? "/privacy/" : "#{baseurl}/privacy/"
    terms_href = baseurl.empty? ? "/terms/" : "#{baseurl}/terms/"
    links = %(<a href="#{privacy_href}">Privacy</a><span aria-hidden="true">·</span><a href="#{terms_href}">Terms</a>)
    if cookie_consent_enabled?(page)
      # Withdrawal has to be as easy as giving consent, and the theme ships no
      # way back into the dialog once a choice is stored.
      links += %(<span aria-hidden="true">·</span><button type="button" class="hao-cookie-settings" data-hao-cookie-settings="true">Cookie settings</button>)
    end
    markup = %(<span class="hao-legal-links" data-hao-legal-links="true">#{links}</span>)

    footer_pattern = %r{(<footer\b[^>]*role="contentinfo"[^>]*>.*?<div\b[^>]*class="[^"]*\bcontainer\b[^"]*"[^>]*>)(.*?)(</div>\s*</footer>)}m
    page.output = page.output.sub(footer_pattern) do
      "#{Regexp.last_match(1)}#{Regexp.last_match(2).rstrip} #{markup}\n#{Regexp.last_match(3)}"
    end
  end

  def self.apply_cookie_settings_script(page)
    return unless cookie_consent_enabled?(page)
    return unless page.output.include?("</body>")
    return if page.output.include?("cookie-settings.js")

    baseurl = page.site.config["baseurl"].to_s.sub(%r{/$}, "")
    tag = %(<script defer src="#{baseurl}/assets/js/cookie-settings.js"></script>)
    page.output = page.output.sub("</body>", "#{tag}\n</body>")
  end

  def self.build_revision(page)
    revision = ENV["GITHUB_SHA"].to_s
    revision = page.site.config.dig("github", "build_revision").to_s if revision.empty?
    revision = ENV["JEKYLL_BUILD_REVISION"].to_s if revision.empty?
    revision.match?(/\A[0-9a-f]{7,40}\z/i) ? revision.downcase : nil
  end

  def self.apply_footer_build_revision(page)
    revision = build_revision(page)
    return unless revision
    return if page.output.include?("hao-build-revision")

    short_revision = revision[0, 7]
    repo_url = page.site.config.dig("github", "repository_url").to_s
    repo_url = "https://github.com/liuh886/notes" if repo_url.empty?
    build_url = "#{repo_url.sub(%r{/$}, '')}/commit/#{revision}"
    markup = %( <span class="hao-build-revision" data-build-revision="#{revision}" title="Deployed Git commit #{revision}">· Build <a href="#{build_url}" rel="noopener noreferrer">#{short_revision}</a></span>)

    footer_pattern = %r{(<footer\b[^>]*role="contentinfo"[^>]*>.*?<div\b[^>]*class="[^"]*\bcontainer\b[^"]*"[^>]*>)(.*?)(</div>\s*</footer>)}m
    page.output = page.output.sub(footer_pattern) do
      "#{Regexp.last_match(1)}#{Regexp.last_match(2).rstrip}#{markup}\n#{Regexp.last_match(3)}"
    end
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

  def self.apply_global_stylesheet(page)
    apply_stylesheets(page, GLOBAL_STYLESHEETS)
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

  def self.apply_portfolio_stylesheet(page)
    return unless portfolio_page?(page)

    apply_stylesheets(page, PORTFOLIO_STYLESHEETS)
  end

  def self.apply_legal_stylesheet(page)
    return unless legal_page?(page)

    apply_stylesheets(page, LEGAL_STYLESHEETS)
  end
end

[:pages, :documents].each do |hook_owner|
  Jekyll::Hooks.register hook_owner, :post_render do |page|
    SiteVisualPolish.apply_cv_title(page)
    SiteVisualPolish.apply_home_body_class(page)
    SiteVisualPolish.apply_cv_body_class(page)
    SiteVisualPolish.apply_repositories_body_class(page)
    SiteVisualPolish.apply_portfolio_body_class(page)
    SiteVisualPolish.apply_legal_body_class(page)
    SiteVisualPolish.apply_home_navbar_brand(page)
    SiteVisualPolish.apply_home_profile_alt(page)
    SiteVisualPolish.apply_global_stylesheet(page)
    SiteVisualPolish.apply_homepage_stylesheet(page)
    SiteVisualPolish.apply_cv_stylesheet(page)
    SiteVisualPolish.apply_repositories_stylesheet(page)
    SiteVisualPolish.apply_portfolio_stylesheet(page)
    SiteVisualPolish.apply_legal_stylesheet(page)
    SiteVisualPolish.apply_footer_legal_links(page)
    SiteVisualPolish.apply_footer_build_revision(page)
    SiteVisualPolish.apply_cookie_settings_script(page)
    SiteVisualPolish.apply_math_scripts(page)
  end
end
