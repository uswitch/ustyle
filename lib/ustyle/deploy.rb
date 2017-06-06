require "aws-sdk"
require "time"

module Ustyle
  REGION = 'eu-west-1'
  BUCKET = 'uswitch-assets-eu'
  CLOUDFRONT_DISTRIBUTION = 'E3F1XI0HIG20E0'

  TEN_YEARS_IN_S = 10 * 365 * 24 * 60 * 60
  TEN_YEARS_FROM_NOW = Time.now + TEN_YEARS_IN_S

  def self.s3_upload to, from, content_type, bucket = BUCKET
    bucket = s3.bucket(bucket)
    object = bucket.object(to)
    object.put(
      body: open(from),
      content_type: content_type,
      acl: 'public-read'
      cache_control: "max-age=#{TEN_YEARS_FROM_NOW}",
      expires: TEN_YEARS_FROM_NOW.httpdate
    )
  end

  def self.invalidate files
    cloudfront = Aws::CloudFront::Client.new(region: REGION)
    cloudfront.create_invalidation(
      distribution_id: CLOUDFRONT_DISTRIBUTION,
      invalidation_batch: {
        paths: {
          quantity: files.length,
          items: files
        },
        caller_reference: "ustyle invalidation at #{Time.now.to_s}"
      }
    )
  end

  def self.s3
    @conn ||= Aws::S3::Resource.new(region: REGION)
  end
end