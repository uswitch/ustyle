dir = File.dirname(__FILE__)
$LOAD_PATH.unshift dir unless $LOAD_PATH.include?(dir)

require "ustyle/installer"
require "ustyle/utils"

module Ustyle
  class << self
    def load!
      require "ustyle/sass_functions"
      require "ustyle/icons"
      register_compass_extension if compass?

      if defined?(::Rails)
        require "ustyle/engine"
      elsif sprockets?
        require "ustyle/sprockets"
        require "ustyle/sinatra"
      end

      ::Sass.load_paths << File.join(assets_path, "stylesheets")
    end

    def compass?
      defined?(::Compass)
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

    def autoprefixer_config app
      file   = File.join Ustyle.gem_path, 'config/autoprefixer.yml'
      params = YAML.load_file(file).symbolize_keys
      opts   = { }
      opts[:safe] = true if params.delete(:safe)
      [params, opts]
    end

    def register_compass_extension
      ::Compass::Frameworks.register(
          "ustyle",
          :path => gem_path,
          :stylesheets_directory => File.join(assets_path, "stylesheets"),
          :template_directory => File.join(gem_path, "templates")
        )
    end
  end
end

Ustyle.load!
