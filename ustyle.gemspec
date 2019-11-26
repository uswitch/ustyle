# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)

require "ustyle/version"

Gem::Specification.new do |spec|
  spec.name          = "ustyle"
  spec.version       = Ustyle::VERSION
  spec.authors       = ["uSwitch Limited", "David Annez", "Ricardo Cerqueira", "Joe Green", "Thomas Britton", "Ivo Reis"]
  spec.email         = ["developers@uswitch.com", "david.annez@uswitch.com"]
  spec.description   = %q{uSwitch style guide}
  spec.summary       = %q{Pattern library for uSwitch}
  spec.homepage      = "http://ustyle.guide"
  spec.license       = "Apache-2.0"
  spec.platform      = Gem::Platform::RUBY

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_dependency "sass"
  spec.add_dependency "autoprefixer-rails"
  spec.add_dependency "mime-types"

  spec.add_development_dependency "bundler", "~> 2.0"
  spec.add_development_dependency "rake"
  spec.add_development_dependency "aws-sdk", "~> 2.0"
  spec.add_development_dependency "rb-fsevent"
  spec.add_development_dependency "scss-lint", "0.35.0"
end
