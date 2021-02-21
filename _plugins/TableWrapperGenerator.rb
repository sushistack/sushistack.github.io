require 'nokogiri'

module Jekyll
  module TableWrapperGenerator
    def add_table_wrapper(input)
      doc = Nokogiri::HTML.fragment(input);
      doc.css('table').each do |table|
        table.wrap('<div class="table-container"><span class="scrollable-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#8a4baf"><path d="M12 10c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm-3.857 3c-.084-.321-.143-.652-.143-1s.059-.679.143-1h-2.143v-4l-6 5 6 5v-4h2.143zm7.714-2c.084.321.143.652.143 1s-.059.679-.143 1h2.143v4l6-5-6-5v4h-2.143z"/></svg></span>')
        table.wrap('<div class="table-wrap">')
      end
      doc.to_s
    end
  end
end

Liquid::Template.register_filter(Jekyll::TableWrapperGenerator)