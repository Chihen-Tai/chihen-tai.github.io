// js/github.js — render selected GitHub repositories as clean academic rows
(function () {
  var GITHUB_USER = 'Chihen-Tai';

  var FALLBACK_REPOS = [
    { name: 'polymarket_bot_for_15_min_btc', description: 'Crypto prediction-market trading bot for BTC.', language: 'Python', stargazers_count: 2, html_url: 'https://github.com/Chihen-Tai/polymarket_bot_for_15_min_btc' },
    { name: 'multi-agent-orchestrate',        description: 'Multi-agent AI orchestration system.',          language: 'Python', stargazers_count: 0, html_url: 'https://github.com/Chihen-Tai/multi-agent-orchestrate' },
    { name: 'opencode-snake',                 description: 'Snake game built with opencode AI.',             language: 'JavaScript', stargazers_count: 0, html_url: 'https://github.com/Chihen-Tai/opencode-snake' },
  ];

  function el(tag, attrs, text) {
    var node = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    if (text != null) node.textContent = text;
    return node;
  }

  function renderRow(repo) {
    var row = el('a', {
      class: 'repo-row',
      href: repo.html_url,
      target: '_blank',
      rel: 'noopener noreferrer'
    });
    row.appendChild(el('span', { class: 'repo-name' }, repo.name));

    var tags = el('span', { class: 'repo-tags' });
    if (repo.language) tags.appendChild(el('span', { class: 'repo-lang' }, repo.language));
    tags.appendChild(el('span', null, '★ ' + repo.stargazers_count));
    row.appendChild(tags);

    row.appendChild(el('span', { class: 'repo-desc' }, repo.description || 'No description.'));
    return row;
  }

  function render(repos) {
    var grid = document.getElementById('repos');
    if (!grid) return;
    grid.innerHTML = '';
    repos.slice(0, 6).forEach(function (repo) { grid.appendChild(renderRow(repo)); });
  }

  fetch('https://api.github.com/users/' + GITHUB_USER + '/repos?per_page=100&sort=updated')
    .then(function (r) { if (!r.ok) throw new Error('API ' + r.status); return r.json(); })
    .then(function (repos) {
      var clean = repos
        .filter(function (r) { return !r.fork; })
        .sort(function (a, b) { return b.stargazers_count - a.stargazers_count; });
      render(clean.length ? clean : FALLBACK_REPOS);
    })
    .catch(function () { render(FALLBACK_REPOS); });
})();
