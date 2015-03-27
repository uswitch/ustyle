require 'autoprefixer-rails'

module Ustyle
  class Engine < ::Rails::Engine
    add_paths_block = lambda { |app|
      Ustyle.asset_directories.each do |asset_directory|
        app.config.assets.paths << File.join(Ustyle.assets_path, asset_directory)
      end
    }

    initializer "ustyle.assets.precompile" do |app|
      app.config.assets.precompile += %w( inputs/**.* icons/**.* )
    end

    initializer "ustyle.update_asset_paths", &add_paths_block
    initializer "ustyle.update_asset_paths", group: :assets, &add_paths_block
  end

  class Railtie < ::Rails::Railtie
    initializer :setup_autoprefixer, group: :all do |app|
      AutoprefixerRails.install(app.assets, *Ustyle.autoprefixer_config(app))
    end
  end
end
