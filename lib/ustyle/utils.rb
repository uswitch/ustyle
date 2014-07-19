require 'digest'
require 'mime/types'

module Ustyle
  def self.cloudfront_url path
    File.join "//d184zpyoja0pfb.cloudfront.net/ustyle/", Ustyle::VERSION, self.asset_digest(path)
  end

  def self.asset_digest path
    path.sub(/\.(\w+)$/) { |ext| "-#{digest}#{ext}" }
  end

  def self.mime_type_for asset
    MIME::Types.type_for( asset ).first.content_type
  end

  def self.versioned_path file
    File.join "ustyle", Ustyle::VERSION, file
  end

  private

  def self.digest
    Digest::SHA1.hexdigest Ustyle::VERSION
  end
end
