require 'aws/s3'
require 'mime/types'
require 'fileutils'

desc "Publish uStyle to github and build styleguide"
task :publish do
  puts Ustyle::VERSION
  Rake::Task["git:commit"].invoke
  Rake::Task["git:tag"].invoke
  Rake::Task["git:push"].invoke
end

namespace :git do
  desc "Adding and commiting version #{Ustyle::VERSION}"
  task :commit do
    `git commit -am 'Version #{Ustyle::VERSION}'`
  end

  task :tag do
    `git tag -a #{Ustyle::VERSION} -m 'Version #{Ustyle::VERSION}'`
  end

  task :push do
    `git push && git push --tags`
  end
end

namespace :styleguide do
  task :deploy do
    AWS::S3::DEFAULT_HOST = "s3-eu-west-1.amazonaws.com"

    connection = AWS::S3::Base.establish_connection!(
      :access_key_id     => ENV["AWS_ACCESS_KEY_ID"],
      :secret_access_key => ENV["AWS_SECRET_ACCESS_KEY"],
      :server            => 's3-eu-west-1.amazonaws.com'
    )

    `cd ./styleguide && BUNDLE_GEMFILE=Gemfile bundle exec middleman build`

    Dir["styleguide/build/**/*"].each do |file|
      next if File.directory?(file)    
      puts "Uploading #{file} to s3 ..."
    
      stripped_name = "#{file.gsub(/^build\//, "")}"
      puts stripped_name
      
      content_type = MIME::Types.type_for(stripped_name).first.content_type
      
      puts AWS::S3::S3Object.store(stripped_name, open(file), 'ustyle.uswitchinternal.com', :content_type => content_type, :access => :public_read).inspect
    end
    puts "uploading to s3 done"
  end
end