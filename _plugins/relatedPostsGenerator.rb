module Jekyll
  class Similarity
    attr_accessor :index, :score
    
    def initialize(index, score)
      @index = index
      @score = score
    end
  end
  # Generates a new AMP post for each existing post
  class RelatedPostGenerator < Generator
    priority :normal
    def generate(site)
      site.posts.docs.each do |post|
        similarities = []
        site.categories[post.data['categories'].first].each_with_index do |comp, index|
          next if post.data['permalink'] == comp.data['permalink']
          similarities << Similarity.new(index, compute_similarity(post['tags'], comp['tags']))
        end
        relateds = similarities.sort_by { |obj| obj.score }.reverse.slice(0, 4)
        post.data['relateds'] = []
        relateds.each do |related|
          post.data['relateds'] << site.categories[post.data['categories'].first][related.index]
        end
      end
    end

    def compute_similarity(tags1, tags2)
      score = 0
      words1 = get_words(tags1)
      words2 = get_words(tags2)
      words1.each do |word1|
        words2.each do |word2|
          if word1.casecmp(word2) == 0 then
            score += 1
          end
        end
      end
      return score
    end

    def get_words(tags)
      words = []
      tags.each do |tag|
        tag.to_s.split(/ /).each do |word|
          words << word
        end
      end
      return words
    end
  end
end