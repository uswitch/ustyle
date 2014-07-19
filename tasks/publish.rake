lib_path = File.join(File.dirname(__FILE__), 'lib')
$:.unshift(lib_path) unless $:.include?(lib_path)

require 'ustyle'
require "ustyle/deploy"
require 'aws/s3'
require 'mime/types'
require 'fileutils'

desc "Publish uStyle to github and build styleguide"
task :publish do
  puts Ustyle::VERSION
  Rake::Task["git:commit"].invoke
  Rake::Task["git:tag"].invoke
  Rake::Task["git:push"].invoke

  Rake::Task["build:stylesheets"].invoke
  Rake::Task["build:images"].invoke

  Rake::Task["deploy:stylesheets"].invoke
  Rake::Task["deploy:images"].invoke

  Rake::Task["styleguide:deploy"].invoke
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
  desc "Deploying uStyle styleguide"
  task :deploy do
    Ustyle.s3_connect!

    `cd ./styleguide && BUNDLE_GEMFILE=Gemfile bundle exec middleman build`

    Dir["styleguide/build/**/*"].each do |file|
      next if File.directory?(file)    
      puts "Uploading #{file} to s3 ..."
    
      stripped_name = file.gsub(/^build\//, "")
      puts stripped_name
      
      content_type = Ustyle.mime_type_for(stripped_name)
      
      Ustyle.s3_upload( stripped_name, file, content_type )
    end
    puts "uploading to s3 done"
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
  desc "deploying stylesheet to S3"
  task :stylesheets do
    Ustyle.s3_connect!
    stylesheet = "ustyle-latest.css"

    Ustyle.s3_upload( Ustyle.versioned_path(stylesheet), "build/#{stylesheet}", "text/css" )
    Ustyle.s3_upload( "ustyle/#{stylesheet}", "build/#{stylesheet}", "text/css" )
    Ustyle.invalidate( ["ustyle/#{stylesheet}"] )
  end

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