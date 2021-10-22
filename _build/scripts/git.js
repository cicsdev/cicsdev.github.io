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
    script.src = `https://api.github.com/orgs/${username}/repos?callback=repos&per_page=100`;
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
    loadingMessage.appendChild(document.createTextNode(`Querying GitHub for ${username}’s repositories...`));

    githubUser(username, (err, data) => {
      empty(target);
      if (!err && data.meta.status < 400) {
        const repos = sortByName(data.data);
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
        const sorryMessage = document.createElement('p');
        sorryMessage.classList.add('sorry');
        sorryMessage.appendChild(document.createTextNode('Sorry, we can’t show you this site right now. We’ll forward you to our GitHub organization page.'));
        target.parentNode.replaceChild(sorryMessage, target);
        window.location = `https://github.com/${username}`;
      }
    });
  };
})();
