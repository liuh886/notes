# frozen_string_literal: true

require "json"

module CloudflareWebAnalytics
  BEACON_SRC = "https://static.cloudflareinsights.com/beacon.min.js".freeze
  CONSENT_ATTRIBUTES = %( type="text/plain" data-category="analytics").freeze

  def self.consent_attributes(site)
    site.config["enable_cookie_consent"] ? CONSENT_ATTRIBUTES : ""
  end

  def self.inject(page)
    token = ENV.fetch("CLOUDFLARE_WEB_ANALYTICS_TOKEN", "").strip
    return if token.empty?
    return unless page.output.include?("</head>")
    return if page.output.include?(BEACON_SRC)

    config = JSON.generate(token: token)
    # With consent enabled the beacon is a `text/plain` data block until the
    # analytics category is accepted, matching how the theme gates Google
    # Analytics; `defer` is what Cloudflare's own snippet uses, and the consent
    # library restores the type when it activates the tag.
    tag = %(<script#{consent_attributes(page.site)} defer src="#{BEACON_SRC}" data-cf-beacon='#{config}'></script>)
    page.output = page.output.sub("</head>", "#{tag}</head>")
  end
end

[:pages, :documents].each do |hook_owner|
  Jekyll::Hooks.register hook_owner, :post_render do |page|
    CloudflareWebAnalytics.inject(page)
  end
end
