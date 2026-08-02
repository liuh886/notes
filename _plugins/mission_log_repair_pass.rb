# frozen_string_literal: true

module MissionLogRepairPass
  STYLESHEET = "mission-log-repair-pass.css"

  def self.homepage?(page)
    page.relative_path == "_pages/about.md" || page.url.to_s == "/"
  end

  def self.baseurl(page)
    page.site.config["baseurl"].to_s.sub(%r{/$}, "")
  end

  def self.inject_stylesheet(page)
    return unless homepage?(page)
    return unless page.output.include?("</head>")
    return if page.output.include?(STYLESHEET)

    href = "#{baseurl(page)}/assets/css/#{STYLESHEET}"
    page.output = page.output.sub("</head>", %(<link rel="stylesheet" href="#{href}"></head>))
  end

  def self.apply_home_repairs(page)
    return unless homepage?(page)

    root = baseurl(page)
    portrait_src = "#{root}/assets/img/blog_pic.jpg"

    output = page.output

    output = output.sub(
      '<div class="mission-log-home">',
      <<~HTML.strip
        <div class="mission-log-home">
          <div class="mission-identity-bar" aria-label="Site identity">
            <a class="mission-identity-bar__name" href="#{root}/">ZHIHAO LIU</a>
            <span class="mission-identity-bar__scope">Hao's Notes / Mission Log</span>
          </div>
      HTML
    )

    output = output.sub(
      '        <div class="mission-orbit" aria-hidden="true">',
      <<~HTML.chomp
                <figure class="mission-cover__portrait" aria-label="Zhihao Liu portrait">
                  <img src="#{portrait_src}" alt="Zhihao Liu" loading="eager">
                  <figcaption>Offshore Bergen · 2020 Aug</figcaption>
                </figure>
                <div class="mission-orbit" aria-hidden="true">
      HTML
    )

    output = output.sub(
      '<h2 id="mission-index-title">Reading sequence</h2>',
      '<h2 id="mission-index-title">Mission rail</h2>'
    )

    output = output.sub(
      '<h2 id="current-operations-title">Active tasks and systems in motion</h2>',
      '<h2 id="current-operations-title">Task records in motion</h2>'
    )

    output = output.sub(
      'A task log of live, in-progress, and research systems.',
      'A current task record for live systems, ongoing builds, and research work.'
    )

    output = output.sub(
      '<div class="mission-section-kicker">CONTACT / BACK COVER</div>',
      '<div class="mission-section-kicker">BACK COVER / 08</div>'
    )

    page.output = output
  end
end

[:pages, :documents].each do |hook_owner|
  Jekyll::Hooks.register hook_owner, :post_render do |page|
    MissionLogRepairPass.apply_home_repairs(page)
    MissionLogRepairPass.inject_stylesheet(page)
  end
end
