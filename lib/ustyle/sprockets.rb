require "sprockets"
require "sprockets-helpers"
require "compass"

if ::Sprockets.methods.include?(:append_path)
  ::Sprockets.append_path File.join(assets_path, "stylesheets")
  ::Sprockets.append_path File.join(assets_path, "javascripts")
else
  environment = ::Sprockets::Environment.new
  environment.append_path File.join(assets_path, "stylesheets")
  environment.append_path File.join(assets_path, "javascripts")
end