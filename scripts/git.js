jQuery.githubUser = function(username, callback) {
   jQuery.getJSON('https://api.github.com/orgs/'+username+'/repos?callback=?',callback)
}

jQuery.fn.loadRepositories = function(username) {
   this.html("<span>Querying GitHub for " + username +"'s repositories...</span>");

   var target = this;
   $.githubUser(username, function(data) {
      var repos = data.data; // JSON Parsing
      sortByName(repos);
      var chunkedRepos = chunk(repos, 3);

      target.empty();
      $(chunkedRepos).each(function() {
         var row = $('<div class="row">');
         $.each(this, function() {
            var repo = this;
            var column = $('<div class="col-md-4">')
            var panel = $('<div class="panel panel-info clickable">');
            column.append(panel);
            panel.append($('<div class="panel-heading">')
               .append($('<h3 class="panel-title">')
               .append($('<a href="'+this.html_url+'">')
               .append(this.name))));
            panel.append($('<div class="panel-body">').append(this.description));
            $(panel).click(function(e){
               e.preventDefault();
               window.location=repo.html_url
            })
            row.append(column);
         });
         target.append(row);
      });
   });

   function sortByName(repos) {
      repos.sort(function(a,b) {
         return a.name - b.name;
      });
   }

   function chunk(arr, size) {
      var newArr = [];
      for (var i=0; i<arr.length; i+=size) {
         newArr.push(arr.slice(i, i+size));
      }
      return newArr;
   }
};
