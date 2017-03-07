require 'uri'
require 'net/http'
require 'ustyle/utils'

module Ustyle
  class IconMiddleware
    def initialize(app, options = {})
      @app = app
      @icon_path = options[:path] || Ustyle.cloudfront_url("icons.svg", :icon, false, false)
    end

    def call(env)
      request = Rack::Request.new(env)
      if request.path == "/icons.svg"
        [200, {"Content-Type" => "image/svg+xml"}, [serve_icons.to_s]]
      else
        @app.call(env)
      end
    end

    def serve_icons
      uri = URI(@icon_path)
      res = Net::HTTP.get_response(uri)
      res.body
    end
  end
end