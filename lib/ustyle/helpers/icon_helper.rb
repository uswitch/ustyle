require_relative '../utils'

module Ustyle
  module Helpers
    module Icons
      def self.icon(name, size, color, role ='presentation', pseudo = false, classes = [])
        "
          <svg class='us-icon--#{name} us-icon--#{color} us-icon--#{size} #{pseudo ? "us-icon--#{pseudo}" : ""} #{classes.join(' ') unless classes.nil?}' role='#{role}' xmlns='http://www.w3.org/2000/svg'>
            <use xlink:href='/icons.svg#icon-#{name}'></use>
          </svg>
        "
      end
    end
  end
end