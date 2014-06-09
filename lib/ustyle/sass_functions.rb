require "sass"
require "rack"
require "base64"

module Sass::Script::Functions

  def inline_asset(source)
    assert_type source, :String
    if Ustyle.sprockets?
      ::Sass::Script::String.new "url(#{sprockets_context.asset_data_uri(source.value)})"
    elsif Ustyle.compass?
      path = File.join(::Ustyle.assets_path, "images", source.value)
      asset_data_uri(path)
    end
  end
  declare :inline_asset, :args => [:source]

  def base64Encode(string)
    assert_type string, :String
    Sass::Script::String.new(Base64.strict_encode64(string.value))
  end
  declare :base64Encode, :args => [:string]

  def ustyle_asset_path(source, type)
    if defined?(::Sprockets)
      sprockets_context.send(:"#{type}_path", source.value)
    elsif defined?(::Compass)
      send(:"#{type}_url", source, Sass::Script::Bool.new(true)).value.sub /url\((.*)\)$/, '\1'
    end

    # sass-only
    url ||= source.value.gsub('"', '')
    Sass::Script::String.new(url, :string)
  end
  declare :ustyle_asset_path, :args => [:source, :type]

  protected

  def asset_data_uri(path)
    asset = File.open(path, "rb") {|io| io.read}
    data_uri_asset = Base64.strict_encode64(asset.to_s)
    url = "data:#{ustyle_compute_mime_type(path)};base64,#{Rack::Utils.escape(data_uri_asset)}"
    ::Sass::Script::String.new "url(#{url})"
  end

  def sprockets_context
    # Modern Rails way to get context:
    if options.key?(:sprockets)
      options[:sprockets][:context]
    # Sprockets-sass context:
    elsif options.key?(:custom) && options[:custom].key?(:sprockets_context)
      options[:custom][:sprockets_context]
    # Compatibility with sprockets pre 2.10.0:
    elsif (importer = options[:importer]) && importer.respond_to?(:context)
      importer.context
    end
  end

  private

  def ustyle_compute_mime_type(path)
    case path
    when /\.png$/i
      'image/png'
    when /\.jpe?g$/i
      'image/jpeg'
    when /\.gif$/i
      'image/gif'
    when /\.svg$/i
      'image/svg+xml'
    when /\.otf$/i
      'font/opentype'
    when /\.eot$/i
      'application/vnd.ms-fontobject'
    when /\.ttf$/i
      'font/truetype'
    when /\.woff$/i
      'application/x-font-woff'
    when /\.off$/i
      'font/openfont'
    when /\.([a-zA-Z]+)$/
      "image/#{Regexp.last_match(1).downcase}"
    else
      raise "A mime type could not be determined for #{path}, please specify one explicitly."
    end
  end
end