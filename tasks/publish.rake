lib_path = File.join(File.dirname(__FILE__), 'lib')
$:.unshift(lib_path) unless $:.include?(lib_path)

require 'ustyle'
require 'ustyle/deploy'
require 'autoprefixer-rails'
require 'aws/s3'
require 'mime/types'
require 'fileutils'

namespace :ustyle do
  desc "Publishes uStyle v#{Ustyle::VERSION}"
  task :publish => [ "git:add",
                     "styleguide:update",
                     "git:commit","git:tag","git:push",
                     "build:stylesheets","build:images",
                     "deploy:stylesheets","deploy:images",
                     "styleguide:deploy"
                    ] do
    puts "Publishing uStyle v#{Ustyle::VERSION}"
  end
end

namespace :git do

  desc "Add version #{Ustyle::VERSION}"
  task :add do
    `git add .`
  end

  desc "Add and commit version #{Ustyle::VERSION}"
  task :commit do
    `git commit -am 'Version #{Ustyle::VERSION}'`
  end

  desc "Tag version #{Ustyle::VERSION}"
  task :tag do
    `git tag -a #{Ustyle::VERSION} -m 'Version #{Ustyle::VERSION}'`
  end

  desc "Push version #{Ustyle::VERSION} to github"
  task :push do
    `git push && git push --tags`
  end
end

namespace :styleguide do
  desc "Deploy uStyle styleguide"
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
    Bundler.with_clean_env do
      `BUNDLE_GEMFILE=styleguide/Gemfile cd ./styleguide && bundle update ustyle`
    end
  end
end

namespace :build do
  desc "Build ustyle-latest.css styles"
  task :stylesheets do
    FileUtils.mkdir_p File.join Ustyle.gem_path, "build"
    `sass \
      -t compressed \
      -r "#{Ustyle.gem_path}/lib/ustyle" \
      --load-path vendor/assets/stylesheets \
      --compass vendor/assets/stylesheets/ustyle.sass \
      build/ustyle-latest.css`
    autoprefix = AutoprefixerRails.process(File.read("build/ustyle-latest.css")).css
    File.write( "build/ustyle-latest.css", autoprefix )
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
  desc "Deploy stylesheet to S3"
  task :stylesheets do
    Ustyle.s3_connect!
    stylesheet = "ustyle-latest.css"

    Ustyle.s3_upload( Ustyle.versioned_path(stylesheet), "build/#{stylesheet}", "text/css" )
    Ustyle.s3_upload( "ustyle/#{stylesheet}", "build/#{stylesheet}", "text/css" )
    Ustyle.invalidate( ["ustyle/#{stylesheet}"] )
  end

  desc "Deploy images to S3"
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