document.getElementById("year").textContent = new Date().getFullYear();

async function loadProjects() {
  const container = document.getElementById("project-list");
  try {
    const res = await fetch("data/projects.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const projects = await res.json();

    if (!Array.isArray(projects) || projects.length === 0) {
      container.innerHTML = "<p>No projects listed yet.</p>";
      return;
    }

    container.innerHTML = projects.map(renderCard).join("");
  } catch (err) {
    container.innerHTML = "<p>Couldn't load projects right now.</p>";
    console.error("Failed to load projects.json", err);
  }
}

function renderCard(p) {
  const tech = (p.tech || []).map((t) => `<li>${escapeHtml(t)}</li>`).join("");
  const highlights = (p.highlights || [])
    .map((h) => `<li>${escapeHtml(h)}</li>`)
    .join("");
  const demoLink = p.demo
    ? `<a href="${escapeAttr(p.demo)}" target="_blank" rel="noopener">Live demo →</a>`
    : "";

  return `
    <article class="project-card">
      <h3>${escapeHtml(p.name || "Untitled project")}</h3>
      <p class="tagline">${escapeHtml(p.tagline || "")}</p>
      <p class="description">${escapeHtml(p.description || "")}</p>
      ${tech ? `<ul class="tech-list">${tech}</ul>` : ""}
      ${highlights ? `<ul class="highlights">${highlights}</ul>` : ""}
      <p class="card-links">
        <a href="${escapeAttr(p.repo || "#")}" target="_blank" rel="noopener">View code →</a>
        ${demoLink}
      </p>
    </article>
  `;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function escapeAttr(str) {
  return escapeHtml(str).replace(/"/g, "&quot;");
}

loadProjects();
