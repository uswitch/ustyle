root = File.join(File.dirname(__FILE__), "..")

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

if defined?(Compass)
  Compass::Frameworks.register("ustyle",
    :stylesheets_directory => File.join(root,"sass")
  )
end
