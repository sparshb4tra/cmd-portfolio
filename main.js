/* globals window, document */

// Lightweight terminal engine with zero dependencies.

(function () {
  const $ = (sel) => document.querySelector(sel);
  const screen = $('#screen');
  const input = $('#prompt-input');
  const ps1 = $('#ps1');
  const state = {
    username: 'sparsh',
    host: 'batra',
    cwd: '~/portfolio',
    history: [],
    historyIndex: -1,
    theme: 'dark',
    startTime: Date.now(),
  };

  // Wait for content.js to load
  const content = window.PORTFOLIO || {
    meta: { name: '', location: '' },
    ascii: '',
    projects: [],
    experience: [],
    skills: { languages: [], ml: [], da: [], db: [], tools: [] },
    achievements: [],
  };

  function setPrompt() {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    ps1.textContent = `${state.username}@${state.host} ${time} ${state.cwd} $ `;
  }

  // Keep newest output visible like a real terminal
  function scrollToBottom() {
    requestAnimationFrame(() => {
      screen.scrollTop = screen.scrollHeight;
      input.scrollIntoView({ block: 'end' });
    });
  }

  // Rendering helpers
  function print(html, className) {
    const line = document.createElement('div');
    line.className = `line ${className || ''}`.trim();
    line.innerHTML = html;
    screen.appendChild(line);
    scrollToBottom();
  }
  function printCmd(cmd) { print(`<span class="accent">$</span> ${escapeHtml(cmd)}`, ''); }
  function nl() { print('&nbsp;', ''); }

  function escapeHtml(str) {
    return str
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;');
  }

  function link(href, label) {
    const safe = escapeHtml(href);
    const text = escapeHtml(label || href);
    return `<a href="${safe}" target="_blank" rel="noopener">${text}</a>`;
  }

  // Generate simple 5-line ASCII from capital letters used in "SPARSH BATRA"
  function renderAsciiName(name) {
    const letters = {
      'A': [
        '  ###  ',
        ' #   # ',
        ' ##### ',
        ' #   # ',
        ' #   # ',
      ],
      'B': [
        ' ####  ',
        ' #   # ',
        ' ####  ',
        ' #   # ',
        ' ####  ',
      ],
      'H': [
        ' #   # ',
        ' #   # ',
        ' ##### ',
        ' #   # ',
        ' #   # ',
      ],
      'P': [
        ' ####  ',
        ' #   # ',
        ' ####  ',
        ' #     ',
        ' #     ',
      ],
      'R': [
        ' ####  ',
        ' #   # ',
        ' ####  ',
        ' #  #  ',
        ' #   # ',
      ],
      'S': [
        '  #### ',
        ' #     ',
        '  ###  ',
        '     # ',
        ' ####  ',
      ],
      'T': [
        ' ##### ',
        '   #   ',
        '   #   ',
        '   #   ',
        '   #   ',
      ],
      ' ': [
        '  ',
        '  ',
        '  ',
        '  ',
        '  ',
      ],
    };
    const rows = ['','','','',''];
    const upper = (name || '').toUpperCase();
    for (const ch of upper) {
      const glyph = letters[ch] || letters[' '];
      for (let i = 0; i < 5; i += 1) {
        rows[i] += glyph[i] + '  ';
      }
    }
    return rows.join('\n');
  }

  // Built-in commands
  const commands = {
    help() {
      print('<span class="yellow">Available commands</span>');
      const list = Object.keys(commands).sort();
      print(list.map((c) => ` - <span class="accent">${c}</span>`).join('\n'));
      nl();
      print(`Hint: press <span class="kbd">Tab</span> to autocomplete, <span class="kbd">↑</span>/<span class="kbd">↓</span> for history.`);
    },

    banner() {
      const ascii = content.ascii && content.ascii.trim().length > 0
        ? content.ascii
        : renderAsciiName('SPARSH BATRA');
      print(`<pre class="ascii-name">${escapeHtml(ascii)}</pre>`);
      print(`<span class="muted">${content.meta.name} — ${content.meta.location}</span>`);
      print(`Type <span class="badge">help</span> to get the list of commands.`);
    },

    about() {
      print(content.about);
      nl();
      print(content.highlights.map((x) => ` - ${escapeHtml(x)}`).join('\n'));
    },

    projects() {
      const arr = Array.isArray(content.projects) ? content.projects : [];
      if (!arr.length) {
        print('No projects configured yet.', 'muted');
        return;
      }
      arr.forEach((p) => {
        const links = `${p.links?.live ? link(p.links.live, 'live') : ''}${p.links?.live && p.links?.github ? ' · ' : ''}${p.links?.github ? link(p.links.github, 'code') : ''}`;
        print(`<div class="grid">
          <div class="muted">${escapeHtml(p.date || '')}</div>
          <div><span class="accent">${escapeHtml(p.name || '')}</span>${p.stack ? `<div class=\"muted\">${escapeHtml((p.stack||[]).join(', '))}</div>` : ''}
            <div>${(p.notes||[]).map((n) => `• ${escapeHtml(n)}`).join('<br/>')}</div>
            <div class="muted">${links}</div>
          </div>
        </div>`);
      });
    },

    experience() {
      const arr = Array.isArray(content.experience) ? content.experience : [];
      if (!arr.length) { print('No experience entries yet.', 'muted'); return; }
      arr.forEach((e) => {
        print(`<div class="grid">
          <div class="muted">${escapeHtml(e.date || '')}</div>
          <div><span class="accent">${escapeHtml(e.role || '')}</span>${e.org ? ` @ ${escapeHtml(e.org)}` : ''}<div>${(e.bullets||[]).map((b) => `• ${escapeHtml(b)}`).join('<br/>')}</div></div>
        </div>`);
      });
    },

    skills() {
      const s = content.skills || { languages: [], ml: [], da: [], db: [], tools: [] };
      print(`<div class="grid">
        <div class="muted">Languages</div>
        <div>${escapeHtml(s.languages.join(', '))}</div>
        <div class="muted">ML & AI</div>
        <div>${escapeHtml(s.ml.join(', '))}</div>
        <div class="muted">Data</div>
        <div>${escapeHtml(s.da.join(', '))}</div>
        <div class="muted">Database & Cloud</div>
        <div>${escapeHtml(s.db.join(', '))}</div>
        <div class="muted">Tools</div>
        <div>${escapeHtml(s.tools.join(', '))}</div>
      </div>`);
    },

    contact() {
      const m = content.meta;
      print(`Email: ${link('mailto:' + m.email, m.email)}\nGitHub: ${link(m.github)}\nLinkedIn: ${link(m.linkedin)}\nWebsite: ${link(m.site)}`);
    },

    open(args = []) {
      const m = content.meta;
      const mapping = {
        site: m.site,
        github: m.github,
        gh: m.github,
        linkedin: m.linkedin,
        resume: m.resume,
      };
      const key = (args[0] || '').toLowerCase();
      if (!mapping[key]) {
        print(`Usage: open <site|github|linkedin|resume>`, 'muted');
        return;
      }
      window.open(mapping[key], '_blank', 'noopener');
      print(`Opening ${mapping[key]} ...`);
    },

    resume() { commands.open(['resume']); },

    ls() {
      print('about  projects  experience  skills  achievements  contact  resume', '');
    },

    achievements() {
      const arr = Array.isArray(content.achievements) ? content.achievements : [];
      if (!arr.length) { print('No achievements yet.', 'muted'); return; }
      print(arr.map((a) => `• ${escapeHtml(a)}`).join('\n'));
    },

    clear() {
      screen.innerHTML = '';
      commands.banner();
      nl();
      print(`Screen cleared. Type <span class="badge">help</span> or try <span class="badge">projects</span>.`);
      scrollToBottom();
    },

    cls() { commands.clear(); },

    history() {
      print(state.history.map((h, i) => `${String(i + 1).padStart(2, '0')}: ${escapeHtml(h)}`).join('\n'));
    },

    theme(args = []) {
      const name = args[0] || 'dark';
      document.documentElement.dataset.theme = name;
      print(`Theme set to ${escapeHtml(name)}`);
    },

    echo(args = []) { print(escapeHtml(args.join(' '))); },

    whoami() { print(`${content.meta.name} (${content.meta.handle}) — ${content.meta.location}`); },

    uptime() {
      const ms = Date.now() - state.startTime;
      const s = Math.floor(ms / 1000);
      print(`${s}s`);
    },

    date() { print(new Date().toString()); },
  };

  // Autocomplete
  function complete(partial) {
    const list = Object.keys(commands);
    const matches = list.filter((c) => c.startsWith(partial));
    if (matches.length === 1) return matches[0] + ' ';
    if (matches.length > 1) print(matches.join('  '));
    return partial;
  }

  function runCommand(raw) {
    const line = raw.trim();
    if (!line) return;
    state.history.push(line);
    state.historyIndex = state.history.length;
    printCmd(line);

    const [cmd, ...args] = line.split(/\s+/);
    const fn = commands[cmd];
    if (!fn) {
      print(`Command not found: ${escapeHtml(cmd)}. Type 'help'.`, 'error');
      return;
    }
    try { fn(args); } catch (e) { print(String(e), 'error'); }
  }

  // Input handling
  $('#prompt-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const value = input.value;
    input.value = '';
    runCommand(value);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const completed = complete(input.value.trim());
      input.value = completed;
      scrollToBottom();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      state.historyIndex = Math.max(0, state.historyIndex - 1);
      input.value = state.history[state.historyIndex] || '';
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      state.historyIndex = Math.min(state.history.length, state.historyIndex + 1);
      input.value = state.history[state.historyIndex] || '';
    }
  });

  // Global key capture: start typing anywhere without clicking
  document.addEventListener('keydown', (e) => {
    if (document.activeElement === input) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key && e.key.length === 1) {
      e.preventDefault();
      input.focus();
      input.value += e.key;
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      input.focus();
      const value = input.value;
      input.value = '';
      runCommand(value);
      return;
    }
    if (e.key === 'Backspace') {
      e.preventDefault();
      input.focus();
      input.value = input.value.slice(0, -1);
    }
  }, true);

  // Clicking anywhere focuses the prompt
  document.addEventListener('click', () => input.focus());

  // Init after JS is ready
  window.addEventListener('DOMContentLoaded', () => {
    setPrompt();
    // Ensure ASCII prints even if content.js loads slowly
    if (window.PORTFOLIO && window.PORTFOLIO.ascii) {
      commands.banner();
    } else {
      print('<span class="muted">Loading...</span>');
      setTimeout(() => { screen.innerHTML = ''; commands.banner(); }, 10);
    }
    nl();
    print(`Welcome! Explore with <span class="badge">help</span> or try <span class="badge">projects</span>.`);
    scrollToBottom();
    input.focus();
  });
})();


