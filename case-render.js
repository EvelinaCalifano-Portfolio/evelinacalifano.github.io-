function renderCase(id) {
  const c = cases[id];
  if (!c) return;
  const resultsHTML = c.results.map(r => `<div class="modal-result"><div class="modal-result-num">${r.num}</div><div class="modal-result-label">${r.lbl}</div>${r.desc ? '<div class="modal-result-desc">' + r.desc + '</div>' : ''}</div>`).join('');
  const actionsHTML = c.actions.map(a => `<li>${a}</li>`).join('');
  const assetsHTML = (typeof assetStore !== 'undefined' && assetStore[id]) || '';
  const tipsHTML = c.assets && !assetsHTML ? `<div class="modal-section"><div style="background:#FFF8E1;border-left:3px solid var(--ochre);border-radius:0 8px 8px 0;padding:12px 16px;font-size:13px;color:#7A5800;font-style:italic;">${c.assets}</div></div>` : '';
  const content = `
    <div class="modal-header">
      <div class="modal-eyebrow">${c.eyebrow}</div>
      <div class="modal-title">${c.title}</div>
    </div>
    <div class="modal-body">
      <div class="modal-section"><h4>Situation</h4><p>${c.situation}</p></div>
      <div class="modal-section"><h4>Task</h4><p>${c.task}</p></div>
      <div class="modal-section"><h4>Actions</h4><ul>${actionsHTML}</ul></div>
      <div class="modal-section"><h4>Results</h4><div class="modal-results">${resultsHTML}</div>${c.resultsNote ? '<p class="modal-results-note">' + c.resultsNote + '</p>' : ''}</div>
      ${tipsHTML}
      <div class="modal-learn"><p>${c.learn}</p></div>
      ${assetsHTML ? '<div class="modal-section modal-assets"><h4>Evidence &amp; Assets</h4>' + assetsHTML + '</div>' : ''}
    </div>`;
  const target = document.getElementById('case-content');
  if (target) target.innerHTML = content;
  document.title = c.title + ' — Evelina Califano';
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof CASE_ID !== 'undefined') renderCase(CASE_ID);
});
