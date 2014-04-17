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
