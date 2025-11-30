function parseCSV(csv) {
  const rows = [];
  let currentRow = [];
  let currentField = '';
  let inQuotes = false;
  
  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    const nextChar = csv[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentField.trim());
      currentField = '';
    } else if ((char === '\n' || (char === '\r' && nextChar === '\n')) && !inQuotes) {
      currentRow.push(currentField.trim());
      if (currentRow.some(field => field !== '')) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = '';
      if (char === '\r') i++;
    } else if (char !== '\r') {
      currentField += char;
    }
  }
  
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some(field => field !== '')) {
      rows.push(currentRow);
    }
  }
  
  if (rows.length === 0) return [];
  
  const headers = rows[0].map(h => h.toLowerCase().trim());
  const data = [];
  
  for (let i = 1; i < rows.length; i++) {
    const row = {};
    headers.forEach((header, index) => {
      row[header] = rows[i][index] || '';
    });
    data.push(row);
  }
  
  return data;
}

async function fetchSheetByGid(gid) {
  const url = `/api/sheets/${gid}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Failed to fetch sheet:', response.status, errorData.error || response.statusText);
      throw new Error('Failed to fetch data');
    }
    const csv = await response.text();
    
    if (csv.includes('<!DOCTYPE html>') || csv.includes('<html')) {
      console.error('Received HTML instead of CSV. Sheet may not be published correctly.');
      return [];
    }
    
    return parseCSV(csv);
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    return [];
  }
}

async function loadEvents() {
  const events = await fetchSheetByGid(0);
  console.log('Loaded events:', events.length);
  return events;
}

async function loadResources() {
  const resources = await fetchSheetByGid(1);
  console.log('Loaded resources:', resources.length);
  return resources;
}

function formatDate(dateStr) {
  if (!dateStr) return { day: '--', month: '---' };
  
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return { day: '--', month: '---' };
    
    const day = date.getDate().toString().padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return { day, month, year };
  } catch {
    return { day: '--', month: '---' };
  }
}

function getCategoryIcon(category) {
  const icons = {
    'food': 'ph-bowl-food',
    'housing': 'ph-house-line',
    'healthcare': 'ph-stethoscope',
    'mental health': 'ph-heart',
    'education': 'ph-graduation-cap',
    'employment': 'ph-briefcase',
    'youth': 'ph-users',
    'seniors': 'ph-user',
    'financial': 'ph-hand-coins',
    'transportation': 'ph-car',
    'legal': 'ph-scales',
    'childcare': 'ph-baby',
    'disability': 'ph-wheelchair',
    'veterans': 'ph-star'
  };
  
  const categoryLower = (category || '').toLowerCase();
  return icons[categoryLower] || 'ph-info';
}

function renderEventCard(event) {
  const { day, month } = formatDate(event.date);
  
  return `
    <a href="${event.link || '#'}" class="event-card" ${event.link ? 'target="_blank" rel="noopener"' : ''}>
      <div class="event-card-date">
        <div class="day">${day}</div>
        <div class="month">${month}</div>
      </div>
      <div class="event-card-content">
        <h3>${event.title || 'Untitled Event'}</h3>
        <p>${event.description || ''}</p>
        <div class="event-card-info">
          ${event.time ? `<span><i class="ph ph-clock"></i> ${event.time}</span>` : ''}
          ${event.location ? `<span><i class="ph ph-map-pin"></i> ${event.location}</span>` : ''}
        </div>
      </div>
    </a>
  `;
}

function renderResourceCard(resource) {
  const iconClass = getCategoryIcon(resource.category);
  
  return `
    <a href="${resource.website || '#'}" class="resource-card" ${resource.website ? 'target="_blank" rel="noopener"' : ''}>
      <div class="resource-card-header">
        <div class="resource-card-icon"><i class="ph ${iconClass}"></i></div>
        <span class="resource-card-category">${resource.category || 'General'}</span>
      </div>
      <h3>${resource.name || 'Untitled Resource'}</h3>
      <p>${resource.description || ''}</p>
      <div class="resource-card-meta">
        ${resource.address ? `<span><i class="ph ph-map-pin"></i> ${resource.address}</span>` : ''}
        ${resource.hours ? `<span><i class="ph ph-clock"></i> ${resource.hours}</span>` : ''}
      </div>
    </a>
  `;
}

function renderFeaturedEvent(event) {
  const { day, month, year } = formatDate(event.date);
  
  return `
    <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
      <div style="text-align: center; min-width: 100px;">
        <div style="font-size: 3rem; font-weight: 700; line-height: 1;">${day}</div>
        <div style="text-transform: uppercase; letter-spacing: 1px;">${month} ${year || ''}</div>
      </div>
      <div style="flex: 1;">
        <span style="background: rgba(255,255,255,0.2); padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.85rem;">Featured Event</span>
        <h2 style="font-size: 2rem; margin: 0.75rem 0;">${event.title || 'Upcoming Event'}</h2>
        <p style="opacity: 0.9; margin-bottom: 1rem;">${event.description || ''}</p>
        <div style="display: flex; gap: 2rem; opacity: 0.9; flex-wrap: wrap;">
          ${event.time ? `<span><i class="ph ph-clock"></i> ${event.time}</span>` : ''}
          ${event.location ? `<span><i class="ph ph-map-pin"></i> ${event.location}</span>` : ''}
        </div>
      </div>
      ${event.link ? `<a href="${event.link}" class="btn-white" style="background: white; color: #e85d3b;" target="_blank" rel="noopener">Register Now</a>` : ''}
    </div>
  `;
}

function renderHomeEventCard(event) {
  const { day, month, year } = formatDate(event.date);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
  const date = new Date(event.date);
  const fullMonth = isNaN(date.getTime()) ? month : monthNames[date.getMonth()];
  
  return `
    <div class="event_card">
      <div class="event_date">${fullMonth} ${day}, ${year || new Date().getFullYear()}</div>
      <h3>${event.title || 'Untitled Event'}</h3>
      <p>${event.description || ''}</p>
      <div class="event_location">
        <i class="ph ph-map-pin"></i>
        ${event.location || 'TBD'}
      </div>
    </div>
  `;
}

function renderHomeResourceCard(resource) {
  const iconClass = getCategoryIcon(resource.category);
  
  return `
    <a href="${resource.website || 'pages/resources.html'}" class="resource_card" ${resource.website ? 'target="_blank" rel="noopener"' : ''}>
      <div class="resource_icon">
        <i class="ph ${iconClass}"></i>
      </div>
      <h3>${resource.name || 'Resource'}</h3>
      <p>${resource.description || ''}</p>
      <span class="resource_link">Learn More <i class="ph ph-arrow-right"></i></span>
    </a>
  `;
}

async function loadHomePageContent() {
  const [events, resources] = await Promise.all([
    loadEvents(),
    loadResources()
  ]);
  
  const eventsGrid = document.getElementById('home-events-grid');
  if (eventsGrid && events.length > 0) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const upcomingEvents = events
      .filter(e => {
        const eventDate = new Date(e.date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);
    
    if (upcomingEvents.length > 0) {
      eventsGrid.innerHTML = upcomingEvents.map(e => renderHomeEventCard(e)).join('');
    } else {
      eventsGrid.innerHTML = events.slice(0, 3).map(e => renderHomeEventCard(e)).join('');
    }
  }
  
  const resourcesGrid = document.getElementById('home-resources-grid');
  if (resourcesGrid && resources.length > 0) {
    resourcesGrid.innerHTML = resources.slice(0, 4).map(r => renderHomeResourceCard(r)).join('');
  }
}

window.SheetsLoader = {
  loadEvents,
  loadResources,
  renderEventCard,
  renderResourceCard,
  renderFeaturedEvent,
  renderHomeEventCard,
  renderHomeResourceCard,
  loadHomePageContent,
  formatDate,
  getCategoryIcon
};

window.loadHomePageContent = loadHomePageContent;
