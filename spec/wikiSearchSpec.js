describe('wikiSearch Methods', function() {
  describe('searchFor', function() {
    it('should have a method called searchFor', function(){
      expect(app.searchFor).to.be.a('function');
    })
  });

  describe('displaySearchResults', function(){
    it('should have a method called displaySearchResults', function(){
      expect(app.displaySearchResults).to.be.a('function');
    })
  })
});

describe('wikiSearch Styles', function() {
  describe('searchContainer', function() {
    it('should have width of 500px', function() {
      expect($('.searchContainer')).to.have.css('width');
    })
    it('should have a margin-left property', function(){
      expect($('.searchContainer')).to.have.css('margin-left');
    })
  })
})
