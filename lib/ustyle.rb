dir = File.dirname(__FILE__)
$LOAD_PATH.unshift dir unless $LOAD_PATH.include?(dir)

require "ustyle/installer"
require "ustyle/sass-functions"

module Ustyle
  class << self
    def load!
      if defined?(::Rails)
        require "compass-rails"
        require "ustyle/engine"
      elsif defined?(::Sprockets)
        require "ustyle/sprockets"
        require "ustyle/sinatra"
      elsif defined?(::Compass)
        Compass::Frameworks.register("ustyle",
          :path => gem_path,
          :stylesheets_directory => File.join(assets_path, "stylesheets")
        )
      else
        ::Sass.load_paths << File.join(assets_path, "stylesheets")
      end      
    end

    def gem_path
      @gem_path ||= File.expand_path "..", File.dirname(__FILE__)
    end

    def assets_path
      @assets_path ||= File.join gem_path, "vendor", "assets"
    end
  end
end

Ustyle.load!