if defined?(::Sinatra)
  module Sinatra
    module Ustyle
      def self.registered app
        app.set :root, Dir.pwd
        app.set :sprockets, ::Ustyle.sprockets_env
        app.set :assets_prefix, %w(assets)
        app.set :assets_path, File.join(app.root, "app", app.assets_prefix.join)
        app.set :public_folder, File.join(app.root, "public")
        app.set :assets_helper_path, "/assets"
        app.set :static, true
        app.set :assets_digest, true

        # Setup Sprockets
        ::Ustyle.asset_directories.each do |asset_directory|
          app.sprockets.append_path File.join(app.assets_path, asset_directory)
        end

        Sprockets::Helpers.configure do |config|
          config.environment = app.sprockets
          config.prefix      = app.assets_helper_path
          config.digest      = app.assets_digest
          config.public_path = app.public_folder
        end

        require 'autoprefixer-rails'
        AutoprefixerRails.install(app.sprockets, ::Ustyle.autoprefixer_config)

        app.helpers Sprockets::Helpers
      end
    end
    register Ustyle
  end
end
