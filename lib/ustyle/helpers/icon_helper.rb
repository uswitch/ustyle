require_relative '../utils'

module Ustyle
  module Helpers
    module Icons
      def self.icon(name, size, pseudo = false)
        "
          <svg class='us-icon--#{name} us-icon--#{size} #{pseudo ? "us-icon-#{pseudo}" : ""}' role='img'>
            <use xlink:href='/icons.svg#icon-#{name}'
          </svg>
        "
      end
    end
  end
end