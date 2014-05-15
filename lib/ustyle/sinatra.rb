if defined?(::Sinatra)
  module Sinatra
    module Ustyle
      def self.registered app
        app.set :root, Dir.pwd
        app.set :sprockets, Sprockets::Environment.new(app.root)
        app.set :assets_prefix, %w(assets)
        app.set :assets_path, File.join(app.root, "app", app.assets_prefix.join)
        app.set :public_folder, File.join(app.root, "public")
        app.set :assets_helper_path, "/assets"
        app.set :static, true
        app.set :assets_digest, true

        # Setup Sprockets
        %w(stylesheets javascripts images fonts).each do |asset_directory|
          app.sprockets.append_path File.join(::Ustyle.gem_path, "vendor", "assets", asset_directory)
          app.sprockets.append_path File.join(app.assets_path, asset_directory)
        end

        Compass.configuration do |config|
          config.project_path = app.assets_path
          config.images_dir   = "images"
        end

        Sprockets::Helpers.configure do |config|
          config.environment = app.sprockets
          config.prefix      = app.assets_helper_path
          config.digest      = app.assets_digest
          config.public_path   = app.public_folder
        end

        app.helpers Sprockets::Helpers

      end
    end
    register Ustyle
  end
end