# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)

require "ustyle/version"

Gem::Specification.new do |spec|
  spec.name          = "ustyle"
  spec.version       = Ustyle::VERSION
  spec.authors       = ["David Annez"]
  spec.email         = ["david.annez@uswitch.com"]
  spec.description   = %q{uSwitch style guide}
  spec.summary       = %q{Default styles for uSwitch in a modular SASS gem}
  spec.homepage      = ""
  spec.license       = "MIT" 
  spec.platform      = Gem::Platform::RUBY

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_dependency "sass"
  spec.add_dependency "coffee-script"
  spec.add_dependency "autoprefixer-rails", "~> 4.0"
  spec.add_dependency "mime-types"
  spec.add_dependency "thor"
  spec.add_dependency "chunky_png",  ">= 0.8.0"

  spec.add_development_dependency "bundler", "~> 1.3"
  spec.add_development_dependency "rake"
  spec.add_development_dependency "aws-sdk"
  spec.add_development_dependency "rb-fsevent"
  spec.add_development_dependency "botoenv"
  spec.add_development_dependency "scss-lint", "0.35.0"
end
