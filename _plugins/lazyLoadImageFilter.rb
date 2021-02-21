require 'nokogiri'

module Jekyll
  module LazyLoadImageFilter
    def lazy_images(input)
      doc = Nokogiri::HTML.fragment(input);
      doc.css('img').each do |image|
        # src has real path in content
        if image['src'].start_with?('http://', 'https://')
          src = image['src']
        else
          src = File.join(Dir.pwd, '', image['src'])
        end

        begin
          size = FastImage.size(src)
          image['ratio'] = (size[1].to_f/size[0]).round(2) * 100
          image['data-width'] = size[0]
        rescue Exception => e
          puts 'Unable to get image dimensions for "' + src + '". For local files, build the site with \'--skip-initial-build\' for better results. [Error: ' + e.to_s + ']'
        end

        image['data-src'] = image['src']
        if image['src'].start_with?('http://', 'https://')
          image['src'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAQAAAA3fa6RAAAADklEQVR42mNkAANGCAUAACMAA2w/AMgAAAAASUVORK5CYII='
          image['style'] = "padding-top:#{image['ratio']}%"
        else
          image['src'] = image['src'].gsub('/images/', '/lazy-images/').gsub('.gif', '.jpg')
          image['style'] = "width:#{image['data-width']}px"
        end
        image['class'] = "#{image['class']} lazyimg loading-img holder"
      end
      doc.to_s
    end
  end
end

Liquid::Template.register_filter(Jekyll::LazyLoadImageFilter)