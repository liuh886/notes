# frozen_string_literal: true

module SiteFeatures
  def self.apply(site)
    features = site.data.fetch("site_features", {})
    search = features.fetch("search", {})

    site.config["search_enabled"] = search.fetch("enabled", false)
    site.config["posts_in_search"] = search.fetch("posts", false)
    site.config["socials_in_search"] = search.fetch("socials", false)
    site.config["bib_search"] = search.fetch("bibliography", false)
  end
end

Jekyll::Hooks.register :site, :post_read do |site|
  SiteFeatures.apply(site)
end
