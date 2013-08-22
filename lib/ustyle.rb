require "ustyle/version"

unless defined?(Sass)
  require 'sass'
end

module Ustyle
  if defined?(Rails) && defined?(Rails::Engine)
    class Engine < ::Rails::Engine
      require 'ustyle/engine'
    end
  else
    Sass.load_paths << File.expand_path("../../app/assets/stylesheets", __FILE__)
  end
end