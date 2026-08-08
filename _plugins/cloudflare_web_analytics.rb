# frozen_string_literal: true

require "json"

module CloudflareWebAnalytics
  BEACON_SRC = "https://static.cloudflareinsights.com/beacon.min.js".freeze

  def self.inject(page)
    token = ENV.fetch("CLOUDFLARE_WEB_ANALYTICS_TOKEN", "").strip
    return if token.empty?
    return unless page.output.include?("</head>")
    return if page.output.include?(BEACON_SRC)

    config = JSON.generate(token: token)
    tag = %(<script type="module" src="#{BEACON_SRC}" data-cf-beacon='#{config}'></script>)
    page.output = page.output.sub("</head>", "#{tag}</head>")
  end
end

[:pages, :documents].each do |hook_owner|
  Jekyll::Hooks.register hook_owner, :post_render do |page|
    CloudflareWebAnalytics.inject(page)
  end
end
