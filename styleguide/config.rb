require "kss"
require "redcarpet"

USTYLE_DIR = File.expand_path("../../vendor/assets/stylesheets/ustyle", __FILE__)

helpers do
  def styleblock(section, title, options={}, &block)
    unless request.has_key?(:styleguide)
      request[:styleguide] = ::Kss::Parser.new(USTYLE_DIR)
    end
    style_partial = options[:floated] ? "styleblock_floated" : "styleblock"
    @styleguide = request[:styleguide]
    @title = title
    @markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, :autolink => true, :space_after_headers => true)
    @section = @styleguide.section(section)
    @sass_output = options[:sass] ? sass_block(@section.filename, options[:sass]) : nil
    @example_html = capture(&block)
    partial("partials/" + style_partial)
  end
  # Sets the html class to 'active' when the link url is equal to the current page being viewed.
  # Use just like the link_to helper.
  # <%= magic_link_to 'Home', '/index.html' %>
  def nav_link(link, url, opts={})
      current_url = current_resource.url
      if current_url == url_for(url) || current_url == url_for(url) + "/"
          opts[:class] = "#{opts[:class]} nav__link--active"
      end
      link_to(link, url, opts)
  end

  def sass_block(filename, path)
    file_path = File.join(USTYLE_DIR, path, filename)
    blocks = []
    File.open file_path do |file|
      file.each do |input|
        if !(input =~ /^\s*\/\//) && !(input =~ /^\s*\/\*/)
          blocks << input
        end
      end
    end
    blocks.join
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
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  activate :asset_hash
  activate :asset_host

  # Enable cache buster
  activate :cache_buster
end
