require "kss"

KSS_DIR = File.expand_path("../../sass/ustyle", __FILE__)

helpers do
  def styleblock(section, &block)
    unless request.has_key?(:styleguide)
      request[:styleguide] = ::Kss::Parser.new(KSS_DIR)
    end

    @styleguide = request[:styleguide]
    @section = @styleguide.section(section)
    @example_html = capture(&block)
    partial("styleblock")
  end
  # Sets the html class to 'active' when the link url is equal to the current page being viewed.
  # Use just like the link_to helper.
  # <%= magic_link_to 'Home', '/index.html' %>
  def nav_link(link, url, opts={})
      current_url = current_resource.url
      if current_url == url_for(url) || current_url == url_for(url) + "/"
          opts[:class] = "active"
      end
      link_to(link, url, opts)
  end
end

activate :livereload

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

# Build-specific configuration
configure :build do

  # Use relative URLs
  activate :relative_assets

end
