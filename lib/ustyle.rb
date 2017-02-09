dir = File.dirname(__FILE__)
$LOAD_PATH.unshift dir unless $LOAD_PATH.include?(dir)

require "ustyle/version"
require "ustyle/utils"
require "ustyle/hash"

module Ustyle
  class << self
    def load!
      require "ustyle/sass_functions"
      require "ustyle/icons"
      require "ustyle/helpers/icon_helper"

      if defined?(::Rails)
        require "ustyle/engine"
      elsif sprockets?
        require "ustyle/sprockets"
        require "ustyle/sinatra"
      end

      ::Sass.load_paths << File.join(assets_path, "stylesheets")
    end

    def sprockets?
      defined?(::Sprockets)
    end

    def gem_path
      @gem_path ||= File.expand_path "..", File.dirname(__FILE__)
    end

    def assets_path
      @assets_path ||= File.join gem_path, "vendor", "assets"
    end

    def asset_directories
      %w(stylesheets javascripts images fonts)
    end

    def sprockets_env
      @sprockets_env ||= ::Sprockets::Environment.new
    end

    def autoprefixer_config
      file   = File.join Ustyle.gem_path, 'config/autoprefixer.yml'
      params = YAML.load_file(file).symbolize_keys
      params
    end
  end
end

Ustyle.load!
