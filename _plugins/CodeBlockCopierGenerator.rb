require 'nokogiri'

module Jekyll
  module CodeBlockCopierGenerator
    def add_code_copier(input)
      doc = Nokogiri::HTML.fragment(input);
      doc.css('.highlighter-rouge>div.highlight').each do |high|
        text = Nokogiri::XML::Text.new 'Copy', doc
        button = Nokogiri::XML::Node.new "button", doc
        button['type'] = 'button'
        button['class'] = 'copy-code-btn'
        button.add_child(text)
        high.add_child(button)
      end
      doc.to_s
    end
  end
end

Liquid::Template.register_filter(Jekyll::CodeBlockCopierGenerator)