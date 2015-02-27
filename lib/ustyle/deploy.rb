require "aws-sdk"

module Ustyle
  REGION = 'eu-west-1'
  BUCKET = 'uswitch-assets-eu'
  CLOUDFRONT_DISTRIBUTION = 'E3F1XI0HIG20E0'

  def self.s3_upload to, from, content_type, bucket = BUCKET
    bucket = s3.bucket(bucket)
    object = bucket.object(to)
    object.put(body: open(from), content_type: content_type, acl: 'public-read')
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