'use strict';

(() => {
  window.addEventListener('DOMContentLoaded', () => {
    window.loadRepositories('cicsdev', document.getElementById('github-projects'));
  });
})();
