# frozen_string_literal: true

require "json"
require "uri"

module SiteNameMetadata
  def self.inject(page)
    return unless page.url == "/"

    site_url = page.site.config.fetch("url").to_s.sub(%r{/+\z}, "")
    site_name = page.site.config.fetch("title").to_s
    host = URI.parse(site_url).host
    raise "Invalid site.url for WebSite metadata: #{site_url}" if host.nil? || host.empty?

    website = {
      "@context" => "https://schema.org",
      "@type" => "WebSite",
      "name" => site_name,
      "alternateName" => host.downcase,
      "url" => "#{site_url}/"
    }
    script = %(<script type="application/ld+json">#{JSON.generate(website)}</script>)

    raise "Homepage output has no </head> for WebSite metadata injection" unless page.output.include?("</head>")

    page.output = page.output.sub("</head>", "#{script}</head>")
  end
end

Jekyll::Hooks.register :pages, :post_render do |page|
  SiteNameMetadata.inject(page)
end
