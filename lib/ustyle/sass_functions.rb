require "sass"
require "cgi"
require "base64"

module Sass::Script::Functions

  def ustyle_version
    ::Sass::Script::String.new ::Ustyle::VERSION
  end
  declare :ustyle_version, []

  def inline_svg(source)
    assert_type source, :String
    if Ustyle.sprockets?
      svg = escaped_svg(sprockets_context.environment.find_asset(source.value).to_s)
      ::Sass::Script::String.new "url(data:#{Ustyle.mime_type_for(source.value)};charset=utf-8,#{svg})"
    else
      path = File.join(::Ustyle.assets_path, "images", source.value)
      asset_data_uri(path, svg = true)
    end
  end
  declare :inline_svg, :args => [:source]

  def base64encode(string)
    assert_type string, :String
    Sass::Script::String.new(Base64.strict_encode64(string.value))
  end
  declare :base64encode, :args => [:string]

  protected

  def asset_data_uri(path, svg = false)
    asset = data(path)
    encoding = "base64"
    if svg
      asset = escaped_svg(asset)
      encoding = "charset=utf-8"
    else
      asset = CGI::escape(Base64.strict_encode64(data(path).to_s))
    end
    url = "data:#{Ustyle.mime_type_for(path)};#{encoding},#{asset}"
    ::Sass::Script::String.new "url('#{url}')"
  end

  def escaped_svg(data)
    CGI::escape(data).gsub('+', '%20')
  end

  def data(path)
    File.open(path, "rb") {|io| io.read}
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
end
