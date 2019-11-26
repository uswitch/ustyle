lib_path = File.join(File.dirname(__FILE__), 'lib')
$:.unshift(lib_path) unless $:.include?(lib_path)

require 'ustyle'
require 'ustyle/deploy'
require 'fileutils'

namespace :ustyle do
  desc "Publishes uStyle v#{Ustyle::VERSION}"
  task :upgrade => [ "git:add", "git:push" ] do
    puts green("Committing new version of uStyle - v#{Ustyle::VERSION}")
  end

  task :publish => [ "deploy:images", "deploy:stylesheets" ] do
    puts green("Publishing uStyle v#{Ustyle::VERSION}")
  end
end

namespace :git do
  task :add do
    `git commit -am '#{Ustyle::VERSION}' && git tag -a v#{Ustyle::VERSION} -m '#{Ustyle::VERSION}'`
  end

  desc "Push version #{Ustyle::VERSION} to github"
  task :push do
    `git push -u -f && git push -f --tags`
  end
end

namespace :deploy do
  desc "Deploy stylesheets to S3"
  task :stylesheets do
    Dir["dist/*.{css,json,js,svg}"].each do |file|
      file_name = File.basename(file)
      content_type = Ustyle.mime_type_for(file_name)
      Ustyle.s3_upload( Ustyle.versioned_path(file_name), file, content_type )
      Ustyle.s3_upload( "ustyle/#{file_name}", file, content_type )
    end

    Ustyle.invalidate([
      "/s3/#{Ustyle::BUCKET}/ustyle/ustyle-latest.css",
      "/s3/#{Ustyle::BUCKET}/ustyle/rebrand-latest.css",
      "/s3/#{Ustyle::BUCKET}/ustyle/ustyle.min.js",
      "/s3/#{Ustyle::BUCKET}/ustyle/ustyle-content.css",
      "/s3/#{Ustyle::BUCKET}/ustyle/rebrand-content.css",
      "/s3/#{Ustyle::BUCKET}/ustyle/icons.svg"
    ])
  end

  desc "Deploy images to S3"
  task :images do
    images_dir = File.join Ustyle.assets_path, "images", "**", "*"
    Dir[images_dir].each do |file|
      next if File.directory?(file)
      file_path = file.gsub(Regexp.new("#{Ustyle.assets_path}/"), "")
      hashed_file = Ustyle.asset_digest(file_path)
      Ustyle.s3_upload( Ustyle.versioned_path(hashed_file), file, Ustyle.mime_type_for(file))
    end
  end
end

def colorize(text, color_code)
  "\e[#{color_code}m#{text}\e[0m"
end

def red(text); colorize(text, 31); end
def green(text); colorize(text, 32); end
