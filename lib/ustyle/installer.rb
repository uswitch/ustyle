require 'ustyle/version'
require 'fileutils'
require 'thor'

module Ustyle
  class Installer < Thor
    map ['-v', '--version'] => :version

    desc 'install', 'Install uStyle into your project'
    method_options :path => :string, :force => :boolean
    def install
      install_files
      puts "uStyle files installed to #{installation_path}/"
    end

    desc 'version', 'Show uStyle version'
    def version
      say "uStyle #{Ustyle::VERSION}"
    end

    private

    def installation_path
      @installation_path = options[:path] ? Pathname.new(File.join(options[:path], 'ustyle')) : Pathname.new('ustyle')
    end

    def install_files
      create_directory
      copy_files
    end

    def create_directory
      FileUtils.mkdir_p(installation_path)
    end

    def copy_files
      FileUtils.cp_r(all_files, installation_path)
    end

    def all_files
      Dir["#{assets_path}/*"]
    end

    def assets_path
      File.join(root_directory, "vendor", "assets")
    end

    def root_directory
      File.expand_path "../..", File.dirname(__FILE__)
    end

  end
end