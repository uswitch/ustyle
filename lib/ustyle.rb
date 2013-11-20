project_root = File.join(File.dirname(__FILE__), "..")

require "ustyle/version"

unless defined?(Sass)
  require 'sass'
end

module Ustyle
  if defined?(Rails::Engine)
    require 'ustyle/engine'
  elsif defined?(Sprockets)
    require 'ustyle/sprockets'
  else
    Sass.load_paths << File.expand_path("../../sass", __FILE__)
  end
end

# TO-DO - Add a template so the framework works
if defined?(Compass)
  Compass::Frameworks.register("ustyle",
    :stylesheets_directory => File.join(project_root,"sass"),
    :javascripts_directory => File.join(project_root, "js")
  )
end
