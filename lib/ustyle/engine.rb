module Ustyle
  class Engine < ::Rails::Engine
    add_paths_block = lambda { |app|
      app.config.assets.paths << File.expand_path("../../../sass", __FILE__)
      app.config.assets.paths << File.expand_path("../../../js", __FILE__)
    }

    initializer "ustyle.update_asset_paths", &add_paths_block
    initializer "ustyle.update_asset_paths", group: :assets, &add_paths_block
  end
end