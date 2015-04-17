require 'json'

module Ustyle
  VERSION = JSON.parse(File.read('package.json'))["version"]
end
