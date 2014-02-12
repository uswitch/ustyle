module Ustyle
  class Engine < ::Rails::Engine
    add_paths_block = lambda { |app|
      app.config.assets.paths << File.join(assets_path, "stylesheets")
      app.config.assets.paths << File.join(assets_path, "javascripts")
    }

    initializer "ustyle.update_asset_paths", &add_paths_block
    initializer "ustyle.update_asset_paths", group: :assets, &add_paths_block
  end
end