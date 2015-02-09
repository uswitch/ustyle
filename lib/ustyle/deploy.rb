require "aws/s3"
require "cloudfront-invalidator"

module Ustyle
  HOST = 's3-eu-west-1.amazonaws.com'
  BUCKET = 'uswitch-assets-eu'
  CLOUDFRONT_DISTRIBUTION = 'E3F1XI0HIG20E0'

  def self.s3_connect!
    AWS::S3::DEFAULT_HOST.replace HOST

    @connection ||= AWS::S3::Base.establish_connection!(
      :access_key_id     => ENV["AWS_ACCESS_KEY_ID"],
      :secret_access_key => ENV["AWS_SECRET_ACCESS_KEY"]
    )
  end

  def self.s3_upload to, from, content_type, bucket = BUCKET
    AWS::S3::S3Object.store(
      to, 
      open(from), 
      bucket, 
      :content_type => content_type, 
      :access => :public_read
    )
  end

  def self.invalidate files
    invalidator = CloudfrontInvalidator.new(
                    ENV["AWS_ACCESS_KEY_ID"], 
                    ENV["AWS_SECRET_ACCESS_KEY"], 
                    CLOUDFRONT_DISTRIBUTION
                  )
    invalidator.invalidate(files)
  end
end