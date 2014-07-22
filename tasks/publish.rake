lib_path = File.join(File.dirname(__FILE__), 'lib')
$:.unshift(lib_path) unless $:.include?(lib_path)

require 'ustyle'
require "ustyle/deploy"
require 'aws/s3'
require 'mime/types'
require 'fileutils'

namespace :ustyle do
  desc "Publishes uStyle v#{Ustyle::VERSION}"
  task :publish => [ "styleguide:update",
                     "git:commit","git:tag","git:push",
                     "build:stylesheets","build:images",
                     "deploy:stylesheets","deploy:images",
                     "styleguide:deploy"
                    ] do
    puts "Publishing uStyle v#{Ustyle::VERSION}"
  end
end

namespace :git do

  desc "Adding and commiting version #{Ustyle::VERSION}"
  task :commit do
    `git commit -am 'Version #{Ustyle::VERSION}'`
  end

  desc "Tagging version #{Ustyle::VERSION}"
  task :tag do
    `git tag -a #{Ustyle::VERSION} -m 'Version #{Ustyle::VERSION}'`
  end

  desc "Pushing version #{Ustyle::VERSION} to github"
  task :push do
    `git push && git push --tags`
  end
end

namespace :styleguide do
  desc "Deploying uStyle styleguide"
  task :deploy do
    Ustyle.s3_connect!

    `cd ./styleguide && BUNDLE_GEMFILE=Gemfile bundle exec middleman build`

    Dir["styleguide/build/**/*"].each do |file|
      next if File.directory?(file)
      stripped_name = file.gsub(/^build\//, "")
      content_type = Ustyle.mime_type_for(stripped_name)
      Ustyle.s3_upload( stripped_name, file, content_type )
    end
  end

  desc "Update Gemfile of styleguide"
  task :update do
    `cd ./styleguide && BUNDLE_GEMFILE=Gemfile bundle update ustyle`
  end
end

namespace :build do
  desc "Building ustyle-latest.css styles"
  task :stylesheets do
    FileUtils.mkdir_p File.join Ustyle.gem_path, "build"
    `sass \
      -t compressed \
      -r "#{Ustyle.gem_path}/lib/ustyle" \
      --load-path vendor/assets/stylesheets \
      --compass vendor/assets/stylesheets/ustyle.sass \
      build/ustyle-latest.css`
  end

  desc "Building images and hashing them"
  task :images do
    images_dir = File.join Ustyle.assets_path, "images"
    FileUtils.rm_r "build/images"
    FileUtils.cp_r images_dir, "build"
    
    Dir["build/images/**/*"].each do |file|
      next if File.directory?(file)
      FileUtils.mv file, Ustyle.asset_digest(file), force: true
    end
  end
end

namespace :deploy do
  desc "Deploying stylesheet to S3"
  task :stylesheets do
    Ustyle.s3_connect!
    stylesheet = "ustyle-latest.css"

    Ustyle.s3_upload( Ustyle.versioned_path(stylesheet), "build/#{stylesheet}", "text/css" )
    Ustyle.s3_upload( "ustyle/#{stylesheet}", "build/#{stylesheet}", "text/css" )
    Ustyle.invalidate( ["ustyle/#{stylesheet}"] )
  end

  desc "Deploying images to S3"
  task :images do
    Ustyle.s3_connect!
    Dir["build/images/**/*"].each do |file|
      next if File.directory?(file)
      stripped_name = file.gsub(/^build\//, "")
      content_type = Ustyle.mime_type_for(stripped_name)
      Ustyle.s3_upload( Ustyle.versioned_path(stripped_name), file, content_type)
    end
  end
end