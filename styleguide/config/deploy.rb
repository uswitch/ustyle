require 'rubygems'
require 'aws/s3'
require 'mime/types'
require 'yaml'

desc "Deploy by uploading to s3"
task :deploy do
  AWS::S3::DEFAULT_HOST = "s3-eu-west-1.amazonaws.com"

  connection = AWS::S3::Base.establish_connection!(
      :access_key_id     => ENV["AWS_ACCESS_KEY_ID"],
      :secret_access_key => ENV["AWS_SECRET_ACCESS_KEY"],
      :server            => 's3-eu-west-1.amazonaws.com'
    )
  
  p %x[git pull origin master]
  p %x[APP_ENV='production' middleman build]

  Dir["build/**/*"].each do |file|
    next if File.directory?(file)    
    p "Uploading #{file} to s3 ..."
  
    stripped_name           = "#{file.gsub(/^build\//, "")}"
    puts stripped_name
    
    content_type = MIME::Types.type_for(stripped_name).first.content_type
    
    puts AWS::S3::S3Object.store(stripped_name, open(file), 'ustyle.uswitchinternal.com', :content_type => content_type, :access => :public_read).inspect
  end  
  p "uploading to s3 done"
end

namespace :middleman do
  task(:build) do
    run "rm -rf #{release_path}/public && mv #{release_path}/build #{release_path}/public"
  end
end