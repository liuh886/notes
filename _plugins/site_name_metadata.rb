# frozen_string_literal: true

require "json"
require "uri"

module SiteNameMetadata
  JSON_LD_SCRIPT = %r{<script\b[^>]*\btype=(?:["']application/ld\+json["']|application/ld\+json)[^>]*>\s*(.*?)\s*</script>}m

  def self.rewrite(page)
    return unless page.url == "/"
    return unless page.output.include?("application/ld+json")

    site_url = page.site.config.fetch("url", "").to_s.strip
    site_name = page.site.config.fetch("title", "").to_s.strip
    return if site_url.empty? || site_name.empty?

    host = URI.parse(site_url).host&.downcase
    return if host.nil? || host.empty?

    page.output = page.output.gsub(JSON_LD_SCRIPT) do |script|
      data = JSON.parse(Regexp.last_match(1))
      next script unless data["@type"] == "WebSite"

      data["name"] = site_name
      data["alternateName"] = host
      data["url"] = "#{site_url.sub(%r{/+\z}, "")}/"

      %(<script type="application/ld+json">#{JSON.generate(data)}</script>)
    rescue JSON::ParserError
      script
    end
  end
end

Jekyll::Hooks.register :pages, :post_render do |page|
  SiteNameMetadata.rewrite(page)
end
