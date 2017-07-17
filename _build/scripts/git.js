'use strict';

(() => {
  const githubUser = (username, callback) => {
    const target = document.getElementsByTagName('script')[0] || document.head;
    let script = null;

    const tidy = () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };

    window.repos = (data) => {
      tidy();
      callback(null, data);
    };

    script = document.createElement('script');
    script.src = `https://api.github.com/orgs/${username}/repos?callback=repos`;
    script.defer = 'defer';
    target.parentNode.insertBefore(script, target);
  };

  const sortByName = (repos) => {
    return repos.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;

      return 0;
    });
  };

  const empty = (target) => {
    while (target.firstChild) {
      target.removeChild(target.firstChild);
    }
  };

  const niceDescription = (description) => {
    if (!description) {
      return '';
    }
    if (description.length > 130) {
      return `${description.substring(0, 130)}...`;
    }

    return description;
  };

  window.loadRepositories = (username, target) => {
    empty(target);
    const loadingMessage = document.createElement('span');
    loadingMessage.classList.add('loading-message');
    loadingMessage.appendChild(document.createTextNode(`Querying GitHub for ${username}'s repositories...`));

    githubUser(username, (err, data) => {
      const repos = sortByName(data.data);
      empty(target);
      if (!err) {
        repos.forEach((repo) => {
          const newPanel = document.createElement('a');
          newPanel.classList.add('repo');
          newPanel.setAttribute('href', repo.html_url);

          const panelTitle = document.createElement('header');
          panelTitle.classList.add('repo__header');
          panelTitle.appendChild(document.createTextNode(repo.name));

          const panelContent = document.createElement('p');
          panelContent.classList.add('repo__content');
          panelContent.appendChild(document.createTextNode(niceDescription(repo.description)));

          newPanel.appendChild(panelTitle);
          newPanel.appendChild(panelContent);

          target.appendChild(newPanel);
        });
      }
      else {
        // In the event of API failure, redirect straight to GitHub
        window.location = `https://github.com/${username}`;
      }
    });
  };
})();
