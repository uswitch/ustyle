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
