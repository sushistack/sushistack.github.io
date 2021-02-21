# module Jekyll
#   # Defines the base class of AMP posts
#   class MultilingualPost < Jekyll::Page
#     def initialize(site, base, dir, post, index)
#       @site = site
#       @base = base
#       @dir = dir
#       @url = dir
#       @name = 'index.html'
#       self.process(@name)
#       self.read_yaml(File.join(base, '_layouts'), 'base.html')
#       self.content = post.content
#       self.data['lang'] = site.data['languages'][index]['code']
#       self.data['lang_index'] = index
#       self.data['canonical_url'] = "#{site.config['url']}#{post.data['permalink']}"
#     end
#   end
#   # Generates a new multilingual post for each existing post
#   class MultilingualGenerator < Generator
#     priority :low
#     def generate(site)
#       site.posts.docs.each do |post|
#        next if post.data['skip_multilingual'] == true
#         site.data['languages'].each_with_index do |lang,index|
#           next if lang['enabled'] == false
#           next if post.data['permalink'] == nil
#           next if lang['code'] == 'en'
#           dir = lang['code']
#           site.pages << MultilingualPost.new(site, site.source, File.join(dir, post.data['permalink']), post, index)
#         end
#       end
#     end
#   end
# end