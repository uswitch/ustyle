require "sprockets"
require "sprockets-helpers"
require "compass"

::Ustyle.asset_directories.each do |asset_directory|
  ::Ustyle.sprockets_env.append_path File.join(::Ustyle.assets_path, asset_directory)
end