// js/github.js
(function () {
  var GITHUB_USER = 'Chihen-Tai';
  var PINNED = ['polymarket_bot_for_15_min_btc', 'multi-agent-orchestrate', 'opencode-snake'];

  var FALLBACK_REPOS = [
    { name: 'polymarket_bot_for_15_min_btc', description: 'Crypto prediction market trading bot for BTC — Python', language: 'Python', stargazers_count: 2, html_url: 'https://github.com/Chihen-Tai/polymarket_bot_for_15_min_btc' },
    { name: 'multi-agent-orchestrate',        description: 'Multi-agent AI orchestration system',                   language: 'Python', stargazers_count: 0, html_url: 'https://github.com/Chihen-Tai/multi-agent-orchestrate' },
    { name: 'opencode-snake',                 description: 'Snake game built with opencode AI',                     language: 'JavaScript', stargazers_count: 0, html_url: 'https://github.com/Chihen-Tai/opencode-snake' },
  ];

  function renderCard(repo) {
    var isPinned = PINNED.indexOf(repo.name) !== -1;
    var panel    = isPinned ? 'gold' : 'holo';
    return '<a class="bento-block ' + panel + ' repo-card" href="' + repo.html_url + '" target="_blank" rel="noopener">'
      + (isPinned ? '<span class="pinned-badge">◈ Featured</span>' : '')
      + '<span class="repo-lang">' + (repo.language || 'Code') + ' · ✦ ' + repo.stargazers_count + '</span>'
      + '<h3>' + repo.name + '</h3>'
      + '<p>' + (repo.description || 'No description') + '</p>'
      + '<span class="repo-link">VIEW ◈</span>'
      + '</a>';
  }

  function renderRepos(repos) {
    var grid = document.getElementById('projects-grid');
    if (!grid) return;
    repos.sort(function (a, b) {
      var aP = PINNED.indexOf(a.name) !== -1 ? 1 : 0;
      var bP = PINNED.indexOf(b.name) !== -1 ? 1 : 0;
      if (bP !== aP) return bP - aP;
      return b.stargazers_count - a.stargazers_count;
    });
    grid.innerHTML = repos.slice(0, 6).map(renderCard).join('');

    var statsEl = document.getElementById('github-stats');
    if (statsEl) statsEl.textContent = repos.length + ' Repos · Pro 🌟';
  }

  fetch('https://api.github.com/users/' + GITHUB_USER + '/repos?per_page=100&sort=updated')
    .then(function (r) { if (!r.ok) throw new Error('API ' + r.status); return r.json(); })
    .then(renderRepos)
    .catch(function () { renderRepos(FALLBACK_REPOS); });

  var style = document.createElement('style');
  style.textContent = [
    '.repo-card { display:block; text-decoration:none; }',
    '.pinned-badge { font-size:0.55rem; color:#ffdd88; display:block; margin-bottom:4px; letter-spacing:2px; }',
    '.repo-lang { font-size:0.55rem; color:#4477aa; display:block; margin-bottom:4px; letter-spacing:1px; }',
    '.repo-link { font-size:0.55rem; color:#88ccff; letter-spacing:2px; margin-top:8px; display:block; opacity:0.7; }',
    '.bento-block.gold .repo-lang { color:#cc9922; }',
    '.bento-block.gold .repo-link { color:#ffdd88; }',
  ].join('');
  document.head.appendChild(style);
})();
