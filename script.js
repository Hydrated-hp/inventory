/* ==========================================================================
   VaporLedger — app logic (no backend; all state is in-memory mock data)
   ========================================================================== */

/* ---------------------------------------------------------------------- */
/* 1. STATE / MOCK DATA                                                    */
/* ---------------------------------------------------------------------- */

const TODAY = "2026-08-07";

const DEFAULT_STATE = {
  settings: {
    shopName: "Nimbus Vape Co.",
    logo: "",
    contactEmail: "hello@nimbusvape.co",
    contactPhone: "(206) 555-0110",
    address: "412 Cascade Ave, Seattle, WA 98101",
    currency: "$",
    taxRate: 8,
    lowStockThreshold: 10,
    criticalThreshold: 4,
    notifyLowStock: true,
    notifyDailySummary: true,
    autoReorder: false,
  },

  categories: [
    { id: "c1", name: "E-Liquids", icon: "💧", desc: "Bottled nicotine & freebase juices" },
    { id: "c2", name: "Disposables", icon: "🔋", desc: "Single-use vape sticks & bars" },
    { id: "c3", name: "Mods & Kits", icon: "⚙️", desc: "Devices, box mods, starter kits" },
    { id: "c4", name: "Coils & Pods", icon: "🧩", desc: "Replacement coils and pod cartridges" },
    { id: "c5", name: "Accessories", icon: "🎒", desc: "Batteries, chargers, cases, drip tips" },
    { id: "c6", name: "Nic Salts", icon: "🧪", desc: "Salt-based nicotine e-liquids" },
  ],

  brands: [
    { id: "b1", name: "CloudNine", country: "USA", products: 0 },
    { id: "b2", name: "VoltVape", country: "UK", products: 0 },
    { id: "b3", name: "MistTech", country: "Malaysia", products: 0 },
    { id: "b4", name: "PurePuff", country: "USA", products: 0 },
    { id: "b5", name: "NimbusHouse", country: "Canada", products: 0 },
    { id: "b6", name: "Ohmwrecker", country: "China", products: 0 },
  ],

  suppliers: [
    { id: "s1", name: "Cascade Distribution LLC", contact: "Maria Chen", email: "orders@cascadedist.com", phone: "(206) 555-0142", terms: "Net 30", status: "active" },
    { id: "s2", name: "Pacific Vape Wholesale", contact: "Jon Reyes", email: "sales@pacificvw.com", phone: "(415) 555-0198", terms: "Net 15", status: "active" },
    { id: "s3", name: "Northline Imports", contact: "Aisha Bello", email: "aisha@northlineimports.co", phone: "(312) 555-0173", terms: "COD", status: "active" },
    { id: "s4", name: "Ember & Co Supply", contact: "Derek Wu", email: "derek@emberco.com", phone: "(702) 555-0121", terms: "Net 30", status: "on hold" },
    { id: "s5", name: "Vantage Vapor Trading", contact: "Priya Nair", email: "priya@vantagevt.com", phone: "(813) 555-0166", terms: "Net 45", status: "active" },
  ],

  products: [
    { id: "p1", sku: "ELQ-MNG-30", name: "Mango Ice 30ml", categoryId: "c1", brandId: "b4", cost: 6.5, price: 14.99, stock: 42, unit: "bottle", image: "", description: "A juicy mango vape with a cool menthol finish." },
    { id: "p2", sku: "ELQ-BLR-30", name: "Blue Razz 30ml", categoryId: "c1", brandId: "b4", cost: 6.5, price: 14.99, stock: 8, unit: "bottle", image: "", description: "Tart blue raspberry candy flavor." },
    { id: "p3", sku: "DIS-GEEK-5K", name: "Geekstick 5000 Puff", categoryId: "c2", brandId: "b6", cost: 9.2, price: 19.99, stock: 3, unit: "unit", image: "", description: "High-capacity disposable, 5000 puffs." },
    { id: "p4", sku: "DIS-FROST-6K", name: "Frost Bar 6000 Puff", categoryId: "c2", brandId: "b3", cost: 10.0, price: 21.99, stock: 27, unit: "unit", image: "", description: "Ultra-smooth disposable with a frosted finish." },
    { id: "p5", sku: "MOD-VLT-80W", name: "Volt X80 Box Mod", categoryId: "c3", brandId: "b2", cost: 24.0, price: 49.99, stock: 14, unit: "unit", image: "", description: "80W adjustable box mod with fast charging." },
    { id: "p6", sku: "KIT-CLD9-ST", name: "CloudNine Starter Kit", categoryId: "c3", brandId: "b1", cost: 18.5, price: 39.99, stock: 6, unit: "unit", image: "", description: "Everything a first-time vaper needs." },
    { id: "p7", sku: "COIL-MT-06", name: "MistTech Mesh Coil 0.6Ω (5pk)", categoryId: "c4", brandId: "b3", cost: 8.0, price: 16.99, stock: 55, unit: "pack", image: "", description: "Mesh coil 5-pack, 0.6Ω resistance." },
    { id: "p8", sku: "POD-NIM-2P", name: "NimbusHouse Pod Cartridge (2pk)", categoryId: "c4", brandId: "b5", cost: 7.0, price: 13.99, stock: 2, unit: "pack", image: "", description: "Replacement pod cartridges, pack of 2." },
    { id: "p9", sku: "ACC-BAT-186", name: "18650 Battery 3000mAh", categoryId: "c5", brandId: "b6", cost: 4.5, price: 9.99, stock: 61, unit: "unit", image: "", description: "High-drain rechargeable battery." },
    { id: "p10", sku: "ACC-CHG-DL", name: "Dual-Bay Battery Charger", categoryId: "c5", brandId: "b6", cost: 8.8, price: 17.99, stock: 9, unit: "unit", image: "", description: "Charges two 18650 batteries at once." },
    { id: "p11", sku: "SLT-STRW-30", name: "Strawberry Salt 30ml 35mg", categoryId: "c6", brandId: "b1", cost: 7.0, price: 15.99, stock: 33, unit: "bottle", image: "", description: "Smooth nic salt, ripe strawberry flavor." },
    { id: "p12", sku: "SLT-MINT-30", name: "Arctic Mint Salt 30ml 35mg", categoryId: "c6", brandId: "b1", cost: 7.0, price: 15.99, stock: 0, unit: "bottle", image: "", description: "Cool arctic mint nic salt." },
    { id: "p13", sku: "ELQ-PNCH-60", name: "Fruit Punch 60ml", categoryId: "c1", brandId: "b4", cost: 10.5, price: 22.99, stock: 19, unit: "bottle", image: "", description: "Bold mixed fruit punch, all-day vape." },
    { id: "p14", sku: "MOD-VV-KIT2", name: "VoltVape Pro Kit 2.0", categoryId: "c3", brandId: "b2", cost: 27.0, price: 54.99, stock: 5, unit: "unit", image: "", description: "Second-gen pro kit with upgraded chip." },
  ],

  stockIn: [
    { id: "si1", date: "2026-08-01", productId: "p1", qty: 24, supplierId: "s1", unitCost: 6.5, note: "Restock — monthly order" },
    { id: "si2", date: "2026-08-02", productId: "p7", qty: 40, supplierId: "s2", unitCost: 8.0, note: "" },
    { id: "si3", date: "2026-08-03", productId: "p9", qty: 50, supplierId: "s3", unitCost: 4.5, note: "Bulk battery order" },
    { id: "si4", date: "2026-08-04", productId: "p4", qty: 20, supplierId: "s2", unitCost: 10.0, note: "" },
    { id: "si5", date: "2026-08-05", productId: "p5", qty: 10, supplierId: "s5", unitCost: 24.0, note: "New device line" },
  ],

  stockOut: [
    { id: "so1", date: "2026-08-05", productId: "p1", qty: 6, channel: "In-store", note: "", customer: "Walk-in", payment: "Cash" },
    { id: "so2", date: "2026-08-05", productId: "p9", qty: 12, channel: "In-store", note: "", customer: "Walk-in", payment: "Card" },
    { id: "so3", date: "2026-08-06", productId: "p3", qty: 4, channel: "Online", note: "", customer: "J. Alvarez", payment: "Card" },
    { id: "so4", date: "2026-08-06", productId: "p7", qty: 8, channel: "In-store", note: "", customer: "Walk-in", payment: "Cash" },
    { id: "so5", date: "2026-08-07", productId: "p11", qty: 5, channel: "Online", note: "", customer: "R. Santos", payment: "GCash" },
    { id: "so6", date: "2026-08-07", productId: "p4", qty: 3, channel: "In-store", note: "", customer: "Walk-in", payment: "Cash" },
    { id: "so7", date: "2026-08-07", productId: "p1", qty: 4, channel: "In-store", note: "", customer: "M. Reyes", payment: "Card" },
    { id: "so8", date: "2026-08-07", productId: "p9", qty: 6, channel: "In-store", note: "", customer: "Walk-in", payment: "Cash" },
  ],
};

let idCounter = 1000;
const nextId = (prefix) => `${prefix}${idCounter++}`;

/* ---------- persistence: state lives in memory, mirrored to localStorage ---------- */
const STORAGE_KEY = "vaporledger_state_v1";

function cloneDefaultState() {
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return cloneDefaultState();
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.products) return cloneDefaultState();
    return parsed;
  } catch (e) {
    return cloneDefaultState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    /* storage unavailable — app still works in-memory for this session */
  }
}

let state = loadState();

/* ---------------------------------------------------------------------- */
/* 2. SMALL HELPERS                                                        */
/* ---------------------------------------------------------------------- */

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const money = (n) => `${state.settings.currency}${Number(n).toFixed(2)}`;
const esc = (str) => String(str ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const catName = (id) => state.categories.find((c) => c.id === id)?.name ?? "—";
const brandName = (id) => state.brands.find((b) => b.id === id)?.name ?? "—";
const supplierName = (id) => state.suppliers.find((s) => s.id === id)?.name ?? "—";
const productById = (id) => state.products.find((p) => p.id === id);

function stockStatus(p) {
  if (p.stock <= 0) return { label: "Out of stock", type: "bad" };
  if (p.stock <= state.settings.criticalThreshold) return { label: "Critical", type: "bad" };
  if (p.stock <= state.settings.lowStockThreshold) return { label: "Low stock", type: "warn" };
  return { label: "In stock", type: "ok" };
}

function stockPercent(p) {
  const ceiling = Math.max(state.settings.lowStockThreshold * 4, 40);
  return Math.max(2, Math.min(100, Math.round((p.stock / ceiling) * 100)));
}

function daysBetween(dateStr, refStr) {
  const a = new Date(dateStr + "T00:00:00");
  const b = new Date(refStr + "T00:00:00");
  return Math.round((b - a) / 86400000);
}

/** period: "daily" | "weekly" | "monthly" — relative to TODAY */
function isInPeriod(dateStr, period) {
  const diff = daysBetween(dateStr, TODAY);
  if (diff < 0) return false;
  if (period === "daily") return diff === 0;
  if (period === "weekly") return diff <= 6;
  return diff <= 29; // monthly
}

function ProductThumb(p, size) {
  const s = size || 34;
  const initials = esc((p.name || "??").slice(0, 2).toUpperCase());
  if (p.image) {
    return `<img src="${p.image}" alt="${esc(p.name)}" class="thumb-img" style="width:${s}px;height:${s}px">`;
  }
  return `<div class="mini-thumb" style="width:${s}px;height:${s}px">${initials}</div>`;
}

/* ---------------------------------------------------------------------- */
/* 3. REUSABLE RENDER COMPONENTS                                           */
/* ---------------------------------------------------------------------- */

function StatCard({ label, value, icon, colorClass, trend }) {
  return `
    <div class="card stat-card">
      <div class="stat-top">
        <span class="stat-label">${esc(label)}</span>
        <span class="stat-icon ${colorClass}">${icon}</span>
      </div>
      <div class="stat-value">${value}</div>
      ${trend ? `<div class="stat-trend ${trend.dir}">${trend.icon} ${esc(trend.text)}</div>` : ""}
    </div>`;
}

function Badge(label, type) {
  return `<span class="badge ${type}">${esc(label)}</span>`;
}

function TankGauge(p) {
  const pct = stockPercent(p);
  const st = stockStatus(p);
  const fillClass = st.type === "ok" ? "" : st.type === "warn" ? "low" : "empty";
  return `
    <div class="tank-wrap" title="${p.stock} ${esc(p.unit)}(s) in stock">
      <div class="tank"><div class="tank-fill ${fillClass}" style="width:${pct}%"></div></div>
      <span class="tank-pct">${p.stock}</span>
    </div>`;
}

function RowActions() {
  return `
    <div class="row-actions">
      <button class="btn btn-ghost btn-icon btn-sm" data-action="edit" title="Edit">${ICONS.edit}</button>
      <button class="btn btn-ghost btn-icon btn-sm btn-danger" data-action="delete" title="Delete">${ICONS.trash}</button>
    </div>`;
}

/** Generic table renderer.
 * columns: [{ key, label }]
 * rows: array of data objects
 * cellFn(row, key) -> html string for a cell
 * onRowAction(action, rowId)
 */
function renderTable({ container, columns, rows, cellFn, emptyText, rowActions }) {
  if (!rows.length) {
    container.innerHTML = `<div class="table-empty">${esc(emptyText || "Nothing here yet.")}</div>`;
    return;
  }
  const thead = `<thead><tr>${columns.map((c) => `<th>${esc(c.label)}</th>`).join("")}${rowActions ? "<th></th>" : ""}</tr></thead>`;
  const tbody = `<tbody>${rows
    .map(
      (row) => `<tr data-id="${row.id}">${columns.map((c) => `<td>${cellFn(row, c.key)}</td>`).join("")}${
        rowActions ? `<td>${RowActions()}</td>` : ""
      }</tr>`
    )
    .join("")}</tbody>`;
  container.innerHTML = `<div class="table-scroll"><table>${thead}${tbody}</table></div>`;
}

function showToast(message, danger = false) {
  const stack = $("#toastStack");
  const el = document.createElement("div");
  el.className = `toast${danger ? " danger" : ""}`;
  el.textContent = message;
  stack.appendChild(el);
  setTimeout(() => {
    el.style.transition = "opacity .25s ease";
    el.style.opacity = "0";
    setTimeout(() => el.remove(), 260);
  }, 2600);
}

/* modal engine: builds a form modal from a field spec and calls onSave(data) */
function openModal({ title, fields, initial = {}, onSave, extraNote }) {
  const overlay = $("#modalOverlay");
  const imageValues = {};
  const body = fields
    .map((f) => {
      const val = initial[f.name] ?? f.default ?? "";
      if (f.type === "image") {
        imageValues[f.name] = val || "";
        return `
          <div class="form-group">
            <label>${esc(f.label)}</label>
            <div class="image-upload">
              <div class="image-preview-wrap">
                ${val
                  ? `<img id="preview_${f.name}" class="image-preview" src="${val}" alt="">`
                  : `<div id="preview_${f.name}" class="image-preview image-preview-empty">${ICONS.image}</div>`}
              </div>
              <div class="image-upload-controls">
                <label class="btn btn-sm" for="file_${f.name}">Choose image</label>
                <input type="file" accept="image/*" id="file_${f.name}" data-image-field="${f.name}" style="display:none">
                ${val ? `<button type="button" class="btn btn-sm btn-ghost" data-image-clear="${f.name}">Remove</button>` : ""}
              </div>
            </div>
          </div>`;
      }
      if (f.type === "select") {
        return `
          <div class="form-group ${f.half ? "" : ""}">
            <label>${esc(f.label)}</label>
            <select name="${f.name}">
              ${f.options.map((o) => `<option value="${esc(o.value)}" ${String(o.value) === String(val) ? "selected" : ""}>${esc(o.label)}</option>`).join("")}
            </select>
          </div>`;
      }
      if (f.type === "textarea") {
        return `
          <div class="form-group">
            <label>${esc(f.label)}</label>
            <textarea name="${f.name}" rows="3">${esc(val)}</textarea>
          </div>`;
      }
      return `
        <div class="form-group">
          <label>${esc(f.label)}</label>
          <input type="${f.type || "text"}" name="${f.name}" value="${esc(val)}" ${f.step ? `step="${f.step}"` : ""} ${f.min !== undefined ? `min="${f.min}"` : ""} placeholder="${esc(f.placeholder || "")}">
        </div>`;
    })
    .join("");

  overlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div class="modal-head">
        <h3 id="modalTitle">${esc(title)}</h3>
        <button class="btn btn-ghost btn-icon" id="modalClose" aria-label="Close">${ICONS.close}</button>
      </div>
      <form id="modalForm">
        <div class="modal-body">
          ${body}
          ${extraNote ? `<p class="form-hint">${esc(extraNote)}</p>` : ""}
        </div>
        <div class="modal-foot">
          <button type="button" class="btn" id="modalCancel">Cancel</button>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </form>
    </div>`;

  overlay.classList.add("open");
  const close = () => {
    overlay.classList.remove("open");
    overlay.innerHTML = "";
  };
  $("#modalClose").addEventListener("click", close);
  $("#modalCancel").addEventListener("click", close);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });

  // wire up image fields
  fields.filter((f) => f.type === "image").forEach((f) => {
    const input = $(`#file_${f.name}`);
    input?.addEventListener("change", () => {
      const file = input.files && input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        imageValues[f.name] = reader.result;
        const preview = $(`#preview_${f.name}`);
        preview.outerHTML = `<img id="preview_${f.name}" class="image-preview" src="${reader.result}" alt="">`;
        const clearBtn = $(`[data-image-clear="${f.name}"]`);
        if (!clearBtn) {
          $(`#file_${f.name}`).insertAdjacentHTML("afterend", `<button type="button" class="btn btn-sm btn-ghost" data-image-clear="${f.name}">Remove</button>`);
          bindImageClear(f.name, imageValues);
        }
      };
      reader.readAsDataURL(file);
    });
  });
  fields.filter((f) => f.type === "image").forEach((f) => bindImageClear(f.name, imageValues));

  $("#modalForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    Object.assign(data, imageValues);
    onSave(data);
    close();
  });
}

function bindImageClear(name, imageValues) {
  const btn = $(`[data-image-clear="${name}"]`);
  btn?.addEventListener("click", () => {
    imageValues[name] = "";
    const preview = $(`#preview_${name}`);
    preview.outerHTML = `<div id="preview_${name}" class="image-preview image-preview-empty">${ICONS.image}</div>`;
    btn.remove();
  });
}

function confirmDelete(message, onConfirm) {
  openModal({
    title: "Confirm delete",
    fields: [],
    onSave: () => onConfirm(),
    extraNote: message,
  });
  // relabel the save button to "Delete"
  const saveBtn = $("#modalForm .btn-primary");
  saveBtn.textContent = "Delete";
  saveBtn.classList.add("btn-danger");
}

/* ---------------------------------------------------------------------- */
/* 4. ICONS (inline SVG, stroke-based, currentColor)                       */
/* ---------------------------------------------------------------------- */

const ICONS = {
  dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="5" rx="1.5"/><rect x="13" y="11" width="8" height="10" rx="1.5"/><rect x="3" y="14" width="8" height="7" rx="1.5"/></svg>`,
  box: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>`,
  tag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.6 12.6L12 21.2 2.8 12 11.4 3.4H20.6z"/><circle cx="7" cy="7" r="1.4"/></svg>`,
  award: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="5"/><path d="M8.2 12.6L7 21l5-2 5 2-1.2-8.4"/></svg>`,
  truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="1.5" y="7" width="12" height="9" rx="1"/><path d="M13.5 10h4l4 3.5V16h-8z"/><circle cx="6" cy="18.5" r="1.6"/><circle cx="17" cy="18.5" r="1.6"/></svg>`,
  arrowDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 4v16M6 14l6 6 6-6"/></svg>`,
  arrowUp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20V4M6 10l6-6 6 6"/></svg>`,
  alert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10.3 3.9L2.6 18a1.6 1.6 0 001.4 2.4h16a1.6 1.6 0 001.4-2.4L13.7 3.9a1.6 1.6 0 00-2.8 0z"/><path d="M12 9v4.5M12 17h.01"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19V10M11 19V4M18 19v-7"/><path d="M2 19h20"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 13a7.7 7.7 0 000-2l2-1.6-2-3.4-2.4.8a7.6 7.6 0 00-1.7-1L14.8 3h-4l-.5 2.4a7.6 7.6 0 00-1.7 1l-2.4-.8-2 3.4L6 11a7.7 7.7 0 000 2l-2 1.6 2 3.4 2.4-.8a7.6 7.6 0 001.7 1l.5 2.4h4l.5-2.4a7.6 7.6 0 001.7-1l2.4.8 2-3.4z"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>`,
  edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18"/><path d="M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  cloud: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0"><path d="M7 17a4.5 4.5 0 01-.4-9 5.5 5.5 0 0110.6-1.6A4 4 0 0117 17H7z" fill="currentColor"/></svg>`,
  image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.6"/><path d="M21 15l-5-5-9 9"/></svg>`,
  receipt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 2h12v20l-2.5-1.6L13 22l-2.5-1.6L8 22l-2-1.6V2z"/><path d="M9 7h6M9 11h6M9 15h4"/></svg>`,
  cart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M1 2h3l2.6 12.6a2 2 0 002 1.6h9a2 2 0 002-1.8L21 7H5.2"/></svg>`,
};

/* ---------------------------------------------------------------------- */
/* 5. NAVIGATION                                                           */
/* ---------------------------------------------------------------------- */

const PAGE_META = {
  dashboard: { title: "Dashboard", sub: "Today's business performance at a glance" },
  sales: { title: "Sales", sub: "Record purchases and track transaction history" },
  products: { title: "Products", sub: "Every item you sell, in one catalog" },
  categories: { title: "Categories", sub: "Group products by type" },
  brands: { title: "Brands", sub: "Manufacturers you stock" },
  suppliers: { title: "Suppliers", sub: "Vendors you purchase inventory from" },
  "stock-in": { title: "Stock In", sub: "Log inventory received from suppliers" },
  "stock-out": { title: "Stock Out", sub: "Log inventory sold or removed" },
  "low-stock": { title: "Low Stock", sub: "Items at or below their reorder point" },
  reports: { title: "Reports", sub: "Daily, weekly, and monthly sales performance" },
  settings: { title: "Settings", sub: "Shop details, branding, and preferences" },
};

function navigateTo(pageId) {
  $$(".page").forEach((p) => p.classList.toggle("active", p.id === pageId));
  $$(".nav-item").forEach((n) => n.classList.toggle("active", n.dataset.target === pageId));
  const meta = PAGE_META[pageId];
  $("#topbarTitle").textContent = meta.title;
  $("#topbarSub").textContent = meta.sub;
  $("#primaryAction").style.display = ["dashboard", "sales", "low-stock", "reports", "settings"].includes(pageId) ? "none" : "inline-flex";
  $("#primaryAction").dataset.for = pageId;
  const labels = { products: "New product", categories: "New category", brands: "New brand", suppliers: "New supplier", "stock-in": "Receive stock", "stock-out": "Record stock out" };
  $("#primaryActionLabel").textContent = labels[pageId] || "New";
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  renderPage(pageId);
}

function renderPage(pageId) {
  const renderers = {
    dashboard: renderDashboard,
    sales: renderSales,
    products: renderProducts,
    categories: renderCategories,
    brands: renderBrands,
    suppliers: renderSuppliers,
    "stock-in": renderStockIn,
    "stock-out": renderStockOut,
    "low-stock": renderLowStock,
    reports: renderReports,
    settings: renderSettings,
  };
  renderers[pageId]?.();
  refreshLowStockBadge();
}

function refreshLowStockBadge() {
  const count = state.products.filter((p) => p.stock <= state.settings.lowStockThreshold).length;
  const badge = $("#lowStockBadge");
  if (count > 0) {
    badge.textContent = count;
    badge.style.display = "inline-flex";
  } else {
    badge.style.display = "none";
  }
}

/* ---------------------------------------------------------------------- */
/* 6. DASHBOARD                                                            */
/* ---------------------------------------------------------------------- */

function renderDashboard() {
  const totalProducts = state.products.length;
  const lowStockCount = state.products.filter((p) => p.stock <= state.settings.lowStockThreshold).length;
  const criticalCount = state.products.filter((p) => p.stock > 0 && p.stock <= state.settings.criticalThreshold).length;
  const outCount = state.products.filter((p) => p.stock <= 0).length;
  const inStockCount = totalProducts - lowStockCount;

  const todaysOuts = state.stockOut.filter((o) => o.date === TODAY);
  const todaysIncome = todaysOuts.reduce((sum, o) => sum + o.qty * (productById(o.productId)?.price || 0), 0);
  const vapeSoldToday = todaysOuts.reduce((sum, o) => sum + o.qty, 0);
  const transactionsToday = todaysOuts.length;

  const qtyTodayByProduct = {};
  todaysOuts.forEach((o) => { qtyTodayByProduct[o.productId] = (qtyTodayByProduct[o.productId] || 0) + o.qty; });
  let bestToday = Object.entries(qtyTodayByProduct).sort((a, b) => b[1] - a[1])[0];
  if (!bestToday) {
    // fall back to all-time best seller if nothing sold yet today
    const qtyAllByProduct = {};
    state.stockOut.forEach((o) => { qtyAllByProduct[o.productId] = (qtyAllByProduct[o.productId] || 0) + o.qty; });
    bestToday = Object.entries(qtyAllByProduct).sort((a, b) => b[1] - a[1])[0];
  }
  const bestProduct = bestToday ? productById(bestToday[0]) : null;

  $("#statGrid").innerHTML = [
    StatCard({ label: "Today's Total Income", value: money(todaysIncome), icon: ICONS.tag, colorClass: "teal", trend: { dir: "up", icon: "▲", text: `${transactionsToday} transaction${transactionsToday === 1 ? "" : "s"} today` } }),
    StatCard({ label: "Vape Sold Today", value: vapeSoldToday, icon: ICONS.box, colorClass: "violet", trend: { dir: "up", icon: "▲", text: "units across all products" } }),
    StatCard({ label: "Total Transactions", value: transactionsToday, icon: ICONS.receipt, colorClass: "teal", trend: { dir: "up", icon: "▲", text: "recorded today" } }),
    StatCard({ label: "Best Selling Product", value: bestProduct ? esc(bestProduct.name) : "—", icon: ICONS.award, colorClass: "amber", trend: bestToday ? { dir: "up", icon: "▲", text: `${bestToday[1]} sold` } : null }),
    StatCard({ label: "Low Stock Alert", value: lowStockCount, icon: ICONS.alert, colorClass: lowStockCount ? "red" : "teal", trend: { dir: lowStockCount ? "down" : "up", icon: lowStockCount ? "▼" : "▲", text: lowStockCount ? "needs attention" : "all healthy" } }),
  ].join("");

  // sales overview — last 7 days
  const days = ["Aug 1", "Aug 2", "Aug 3", "Aug 4", "Aug 5", "Aug 6", "Aug 7"];
  const dateKeys = ["2026-08-01", "2026-08-02", "2026-08-03", "2026-08-04", "2026-08-05", "2026-08-06", "2026-08-07"];
  const values = dateKeys.map((d) => {
    const dayOuts = state.stockOut.filter((o) => o.date === d);
    const rev = dayOuts.reduce((sum, o) => sum + o.qty * (productById(o.productId)?.price || 0), 0);
    return rev;
  });
  const max = Math.max(...values, 1);
  $("#salesBars").innerHTML = days
    .map((d, i) => `
      <div class="bar-col">
        <div class="bar" style="height:${Math.max(6, (values[i] / max) * 100)}%" title="${money(values[i])}"></div>
        <span class="bar-label">${d}</span>
      </div>`)
    .join("");

  // top selling products (all-time by qty)
  const qtyByProduct = {};
  state.stockOut.forEach((o) => { qtyByProduct[o.productId] = (qtyByProduct[o.productId] || 0) + o.qty; });
  const top = Object.entries(qtyByProduct).sort((a, b) => b[1] - a[1]).slice(0, 5);
  $("#topProductsList").innerHTML = top.length
    ? top.map(([pid, qty]) => {
        const p = productById(pid);
        if (!p) return "";
        return `
          <div class="mini-row">
            ${ProductThumb(p, 34)}
            <div class="mini-main">
              <div class="mini-title">${esc(p.name)}</div>
              <div class="mini-sub">${esc(catName(p.categoryId))} · ${esc(brandName(p.brandId))}</div>
            </div>
            <div class="mini-val">${qty} sold</div>
          </div>`;
      }).join("")
    : `<div class="table-empty">No sales recorded yet.</div>`;

  // inventory status — counts + low-stock preview list
  const low = state.products.filter((p) => p.stock <= state.settings.lowStockThreshold).sort((a, b) => a.stock - b.stock).slice(0, 4);
  $("#lowStockPreview").innerHTML = `
    <div class="status-count-row">
      <div class="status-count"><span class="status-dot ok"></span>In stock <strong>${inStockCount}</strong></div>
      <div class="status-count"><span class="status-dot warn"></span>Low <strong>${lowStockCount - criticalCount - outCount}</strong></div>
      <div class="status-count"><span class="status-dot bad"></span>Critical <strong>${criticalCount}</strong></div>
      <div class="status-count"><span class="status-dot bad"></span>Out <strong>${outCount}</strong></div>
    </div>
    ${low.length
      ? low.map((p) => `
        <div class="mini-row">
          ${ProductThumb(p, 30)}
          <div class="mini-main">
            <div class="mini-title">${esc(p.name)}</div>
            <div class="mini-sub">${esc(p.sku)}</div>
          </div>
          ${TankGauge(p)}
        </div>`).join("")
      : `<div class="table-empty">Nothing is running low. 🎉</div>`}`;

  // recent sales transactions (sales only — excludes write-offs)
  const recentSales = [...state.stockOut]
    .filter((o) => o.channel !== "Damaged/Written off")
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 6);

  renderTable({
    container: $("#recentMovementTable"),
    columns: [
      { key: "date", label: "Date" },
      { key: "product", label: "Product" },
      { key: "customer", label: "Customer" },
      { key: "qty", label: "Qty" },
      { key: "total", label: "Total" },
    ],
    rows: recentSales,
    emptyText: "No sales recorded yet.",
    cellFn: (row, key) => {
      const p = productById(row.productId);
      if (key === "date") return `<span class="cell-mono">${row.date}</span>`;
      if (key === "product") return `<span class="cell-strong">${esc(p?.name || "—")}</span>`;
      if (key === "customer") return esc(row.customer || "Walk-in");
      if (key === "qty") return `<span class="cell-mono">${row.qty}</span>`;
      if (key === "total") return `<span class="cell-mono">${money((p?.price || 0) * row.qty)}</span>`;
      return "";
    },
  });
}

/* ---------------------------------------------------------------------- */
/* 6.5 SALES                                                               */
/* ---------------------------------------------------------------------- */

function renderSales() {
  const select = $("#saleProduct");
  if (select) {
    const prevValue = select.value;
    select.innerHTML = state.products
      .map((p) => `<option value="${p.id}" ${p.stock <= 0 ? "disabled" : ""}>${esc(p.name)} — ${money(p.price)} (${p.stock} ${esc(p.unit)}${p.stock === 1 ? "" : "s"} left)</option>`)
      .join("");
    if (prevValue && state.products.some((p) => p.id === prevValue)) select.value = prevValue;
    updateSaleCalc();
  }

  const rows = [...state.stockOut].sort((a, b) => (a.date < b.date ? 1 : -1));
  renderTable({
    container: $("#salesTransactionsTable"),
    columns: [
      { key: "date", label: "Date" },
      { key: "product", label: "Product" },
      { key: "qty", label: "Qty" },
      { key: "customer", label: "Customer" },
      { key: "payment", label: "Payment" },
      { key: "channel", label: "Channel" },
      { key: "total", label: "Total" },
    ],
    rows,
    emptyText: "No transactions recorded yet. Record your first sale above.",
    rowActions: true,
    cellFn: (r, key) => {
      const p = productById(r.productId);
      switch (key) {
        case "date": return `<span class="cell-mono">${r.date}</span>`;
        case "product": return `<span class="cell-strong">${esc(p?.name || "—")}</span><div class="cell-sub">${esc(p?.sku || "")}</div>`;
        case "qty": return `<span class="cell-mono">${r.qty}</span>`;
        case "customer": return esc(r.customer || "Walk-in");
        case "payment": return Badge(r.payment || "Cash", "neutral");
        case "channel": return Badge(r.channel, r.channel === "Online" ? "info" : r.channel === "Damaged/Written off" ? "bad" : "neutral");
        case "total": return `<span class="cell-mono">${money((p?.price || 0) * r.qty)}</span>`;
        default: return "";
      }
    },
  });

  bindRowActions($("#salesTransactionsTable"), {
    edit: (id) => openStockOutModal(id),
    delete: (id) => {
      confirmDelete("Remove this transaction? Stock quantities will not be reversed automatically.", () => {
        state.stockOut = state.stockOut.filter((x) => x.id !== id);
        renderSales();
        saveState();
        showToast("Transaction removed", true);
      });
    },
  });
}

function updateSaleCalc() {
  const select = $("#saleProduct");
  const qtyInput = $("#saleQty");
  if (!select || !qtyInput) return;
  const p = productById(select.value);
  const qty = Math.max(1, parseInt(qtyInput.value) || 1);
  const unitPrice = p ? p.price : 0;
  const subtotal = unitPrice * qty;
  $("#saleUnitPrice").textContent = money(unitPrice);
  $("#saleStockNote").textContent = p ? `${p.stock} ${p.unit}${p.stock === 1 ? "" : "s"} available` : "";
  $("#saleSubtotal").textContent = money(subtotal);
  if (p) qtyInput.max = p.stock > 0 ? p.stock : 1;
}

function bindSalesForm() {
  const form = $("#saleForm");
  if (!form) return;
  $("#saleProduct").addEventListener("change", updateSaleCalc);
  $("#saleQty").addEventListener("input", updateSaleCalc);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const productId = $("#saleProduct").value;
    const p = productById(productId);
    if (!p) { showToast("Select a product first", true); return; }
    const qty = Math.max(1, parseInt($("#saleQty").value) || 1);
    if (qty > p.stock) {
      showToast(`Only ${p.stock} ${p.unit}(s) of "${p.name}" left in stock`, true);
      return;
    }
    const customer = $("#saleCustomer").value.trim() || "Walk-in";
    const payment = $("#salePayment").value;
    const channel = $("#saleChannel").value;

    state.stockOut.push({
      id: nextId("so"),
      date: TODAY,
      productId,
      qty,
      customer,
      payment,
      channel,
      note: "",
    });
    p.stock -= qty;

    showToast(`Sale recorded — ${qty} × ${p.name} for ${money(p.price * qty)}`);
    form.reset();
    $("#saleChannel").value = "In-store";
    $("#salePayment").value = "Cash";
    renderSales();
    renderProducts();
    saveState();
  });
}

/* ---------------------------------------------------------------------- */
/* 7. PRODUCTS                                                             */
/* ---------------------------------------------------------------------- */

let productFilter = { category: "all", search: "" };

function renderProducts() {
  const chipRow = $("#productCategoryChips");
  chipRow.innerHTML = ["all", ...state.categories.map((c) => c.id)]
    .map((id) => {
      const label = id === "all" ? "All" : catName(id);
      return `<button class="chip ${productFilter.category === id ? "active" : ""}" data-cat="${id}">${esc(label)}</button>`;
    }).join("");

  let rows = state.products.filter((p) => productFilter.category === "all" || p.categoryId === productFilter.category);
  if (productFilter.search) {
    const q = productFilter.search.toLowerCase();
    rows = rows.filter((p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
  }

  renderTable({
    container: $("#productsTable"),
    columns: [
      { key: "thumb", label: "" },
      { key: "product", label: "Product" },
      { key: "sku", label: "SKU" },
      { key: "category", label: "Category" },
      { key: "brand", label: "Brand" },
      { key: "price", label: "Price" },
      { key: "stock", label: "Stock" },
      { key: "status", label: "Status" },
    ],
    rows,
    emptyText: "No products match your filters.",
    rowActions: true,
    cellFn: (p, key) => {
      switch (key) {
        case "thumb": return ProductThumb(p, 36);
        case "product": return `<span class="cell-strong">${esc(p.name)}</span>`;
        case "sku": return `<span class="cell-mono">${esc(p.sku)}</span>`;
        case "category": return esc(catName(p.categoryId));
        case "brand": return esc(brandName(p.brandId));
        case "price": return `<span class="cell-mono">${money(p.price)}</span><div class="cell-sub">cost ${money(p.cost)}</div>`;
        case "stock": return TankGauge(p);
        case "status": { const s = stockStatus(p); return Badge(s.label, s.type); }
        default: return "";
      }
    },
  });

  bindRowActions($("#productsTable"), {
    edit: (id) => openProductModal(id),
    delete: (id) => {
      const p = productById(id);
      confirmDelete(`Delete "${p.name}"? This can't be undone.`, () => {
        state.products = state.products.filter((x) => x.id !== id);
        renderProducts();
        saveState();
        showToast(`Deleted "${p.name}"`, true);
      });
    },
  });
}

function openProductModal(id) {
  const editing = id ? productById(id) : null;
  openModal({
    title: editing ? "Edit product" : "New product",
    initial: editing || {},
    fields: [
      { name: "image", label: "Product image", type: "image" },
      { name: "name", label: "Product name", placeholder: "e.g. Mango Ice 30ml" },
      { name: "sku", label: "SKU", placeholder: "e.g. ELQ-MNG-30" },
      { name: "categoryId", label: "Category", type: "select", options: state.categories.map((c) => ({ value: c.id, label: c.name })) },
      { name: "brandId", label: "Brand", type: "select", options: state.brands.map((b) => ({ value: b.id, label: b.name })) },
      { name: "cost", label: "Cost price", type: "number", step: "0.01", min: 0, default: 0 },
      { name: "price", label: "Sell price", type: "number", step: "0.01", min: 0, default: 0 },
      { name: "stock", label: "Stock on hand", type: "number", min: 0, default: 0 },
      { name: "unit", label: "Unit", placeholder: "e.g. bottle, unit, pack", default: "unit" },
      { name: "description", label: "Description", type: "textarea", placeholder: "Short flavor / product description" },
    ],
    onSave: (data) => {
      const payload = { ...data, cost: parseFloat(data.cost) || 0, price: parseFloat(data.price) || 0, stock: parseInt(data.stock) || 0 };
      if (editing) {
        Object.assign(editing, payload);
        showToast(`Saved changes to "${payload.name}"`);
      } else {
        state.products.push({ id: nextId("p"), ...payload });
        showToast(`Added "${payload.name}" to products`);
      }
      renderProducts();
      saveState();
      // product changes ripple everywhere it's referenced
      if ($("#dashboard").classList.contains("active")) renderDashboard();
      if ($("#sales").classList.contains("active")) renderSales();
      if ($("#reports").classList.contains("active")) renderReports();
    },
  });
}

function bindRowActions(container, { edit, delete: del }) {
  container.querySelectorAll("tbody tr").forEach((tr) => {
    const id = tr.dataset.id;
    tr.querySelector('[data-action="edit"]')?.addEventListener("click", () => edit(id));
    tr.querySelector('[data-action="delete"]')?.addEventListener("click", () => del(id));
  });
}

/* ---------------------------------------------------------------------- */
/* 8. CATEGORIES                                                           */
/* ---------------------------------------------------------------------- */

function renderCategories() {
  const grid = $("#categoriesGrid");
  if (!state.categories.length) {
    grid.innerHTML = `<div class="table-empty">No categories yet. Add one to start organizing products.</div>`;
    return;
  }
  grid.innerHTML = state.categories.map((c) => {
    const count = state.products.filter((p) => p.categoryId === c.id).length;
    return `
      <div class="tile-card" data-id="${c.id}">
        <div class="tile-top">
          <div class="tile-icon">${c.icon}</div>
          <div class="row-actions">
            <button class="btn btn-ghost btn-icon btn-sm" data-action="edit" title="Edit">${ICONS.edit}</button>
            <button class="btn btn-ghost btn-icon btn-sm btn-danger" data-action="delete" title="Delete">${ICONS.trash}</button>
          </div>
        </div>
        <div>
          <div class="tile-name">${esc(c.name)}</div>
          <div class="tile-meta">${esc(c.desc || "")}</div>
        </div>
        <div class="tile-foot">
          <span class="text-muted" style="font-size:12px">${count} product${count === 1 ? "" : "s"}</span>
        </div>
      </div>`;
  }).join("");

  grid.querySelectorAll(".tile-card").forEach((card) => {
    const id = card.dataset.id;
    card.querySelector('[data-action="edit"]').addEventListener("click", () => openCategoryModal(id));
    card.querySelector('[data-action="delete"]').addEventListener("click", () => {
      const c = state.categories.find((x) => x.id === id);
      const inUse = state.products.some((p) => p.categoryId === id);
      confirmDelete(
        inUse ? `"${c.name}" has products assigned to it. Delete anyway?` : `Delete category "${c.name}"?`,
        () => {
          state.categories = state.categories.filter((x) => x.id !== id);
          renderCategories();
          saveState();
          showToast(`Deleted category "${c.name}"`, true);
        }
      );
    });
  });
}

function openCategoryModal(id) {
  const editing = id ? state.categories.find((c) => c.id === id) : null;
  openModal({
    title: editing ? "Edit category" : "New category",
    initial: editing || {},
    fields: [
      { name: "name", label: "Category name", placeholder: "e.g. Nic Salts" },
      { name: "icon", label: "Emoji icon", placeholder: "e.g. 🧪", default: "🏷️" },
      { name: "desc", label: "Description", type: "textarea", placeholder: "What belongs in this category?" },
    ],
    onSave: (data) => {
      if (editing) {
        Object.assign(editing, data);
        showToast(`Saved changes to "${data.name}"`);
      } else {
        state.categories.push({ id: nextId("c"), ...data });
        showToast(`Added category "${data.name}"`);
      }
      renderCategories();
      saveState();
    },
  });
}

/* ---------------------------------------------------------------------- */
/* 9. BRANDS                                                               */
/* ---------------------------------------------------------------------- */

function renderBrands() {
  const rows = state.brands.map((b) => ({ ...b, products: state.products.filter((p) => p.brandId === b.id).length }));
  renderTable({
    container: $("#brandsTable"),
    columns: [
      { key: "name", label: "Brand" },
      { key: "country", label: "Country" },
      { key: "products", label: "Products" },
    ],
    rows,
    emptyText: "No brands yet.",
    rowActions: true,
    cellFn: (b, key) => {
      if (key === "name") return `<span class="cell-strong">${esc(b.name)}</span>`;
      if (key === "country") return esc(b.country || "—");
      if (key === "products") return `<span class="cell-mono">${b.products}</span>`;
      return "";
    },
  });

  bindRowActions($("#brandsTable"), {
    edit: (id) => openBrandModal(id),
    delete: (id) => {
      const b = state.brands.find((x) => x.id === id);
      confirmDelete(`Delete brand "${b.name}"?`, () => {
        state.brands = state.brands.filter((x) => x.id !== id);
        renderBrands();
        saveState();
        showToast(`Deleted brand "${b.name}"`, true);
      });
    },
  });
}

function openBrandModal(id) {
  const editing = id ? state.brands.find((b) => b.id === id) : null;
  openModal({
    title: editing ? "Edit brand" : "New brand",
    initial: editing || {},
    fields: [
      { name: "name", label: "Brand name", placeholder: "e.g. CloudNine" },
      { name: "country", label: "Country of origin", placeholder: "e.g. USA" },
    ],
    onSave: (data) => {
      if (editing) {
        Object.assign(editing, data);
        showToast(`Saved changes to "${data.name}"`);
      } else {
        state.brands.push({ id: nextId("b"), ...data });
        showToast(`Added brand "${data.name}"`);
      }
      renderBrands();
      saveState();
    },
  });
}

/* ---------------------------------------------------------------------- */
/* 10. SUPPLIERS                                                           */
/* ---------------------------------------------------------------------- */

function renderSuppliers() {
  renderTable({
    container: $("#suppliersTable"),
    columns: [
      { key: "name", label: "Supplier" },
      { key: "contact", label: "Contact" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "terms", label: "Terms" },
      { key: "status", label: "Status" },
    ],
    rows: state.suppliers,
    emptyText: "No suppliers yet.",
    rowActions: true,
    cellFn: (s, key) => {
      if (key === "name") return `<span class="cell-strong">${esc(s.name)}</span>`;
      if (key === "email") return `<span class="cell-mono">${esc(s.email)}</span>`;
      if (key === "phone") return `<span class="cell-mono">${esc(s.phone)}</span>`;
      if (key === "status") return Badge(s.status === "active" ? "Active" : "On hold", s.status === "active" ? "ok" : "warn");
      return esc(s[key] || "—");
    },
  });

  bindRowActions($("#suppliersTable"), {
    edit: (id) => openSupplierModal(id),
    delete: (id) => {
      const s = state.suppliers.find((x) => x.id === id);
      confirmDelete(`Delete supplier "${s.name}"?`, () => {
        state.suppliers = state.suppliers.filter((x) => x.id !== id);
        renderSuppliers();
        saveState();
        showToast(`Deleted supplier "${s.name}"`, true);
      });
    },
  });
}

function openSupplierModal(id) {
  const editing = id ? state.suppliers.find((s) => s.id === id) : null;
  openModal({
    title: editing ? "Edit supplier" : "New supplier",
    initial: editing || {},
    fields: [
      { name: "name", label: "Company name", placeholder: "e.g. Cascade Distribution LLC" },
      { name: "contact", label: "Contact person", placeholder: "e.g. Maria Chen" },
      { name: "email", label: "Email", type: "email", placeholder: "orders@company.com" },
      { name: "phone", label: "Phone", placeholder: "(555) 555-0100" },
      { name: "terms", label: "Payment terms", type: "select", options: [
        { value: "COD", label: "COD" }, { value: "Net 15", label: "Net 15" }, { value: "Net 30", label: "Net 30" }, { value: "Net 45", label: "Net 45" },
      ] },
      { name: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "on hold", label: "On hold" }] },
    ],
    onSave: (data) => {
      if (editing) {
        Object.assign(editing, data);
        showToast(`Saved changes to "${data.name}"`);
      } else {
        state.suppliers.push({ id: nextId("s"), ...data });
        showToast(`Added supplier "${data.name}"`);
      }
      renderSuppliers();
      saveState();
    },
  });
}

/* ---------------------------------------------------------------------- */
/* 11. STOCK IN                                                            */
/* ---------------------------------------------------------------------- */

function renderStockIn() {
  const rows = [...state.stockIn].sort((a, b) => (a.date < b.date ? 1 : -1));
  renderTable({
    container: $("#stockInTable"),
    columns: [
      { key: "date", label: "Date" },
      { key: "product", label: "Product" },
      { key: "qty", label: "Qty received" },
      { key: "supplier", label: "Supplier" },
      { key: "cost", label: "Unit cost" },
      { key: "total", label: "Total cost" },
      { key: "note", label: "Note" },
    ],
    rows,
    emptyText: "No stock has been received yet. Log your first delivery.",
    rowActions: true,
    cellFn: (r, key) => {
      const p = productById(r.productId);
      switch (key) {
        case "date": return `<span class="cell-mono">${r.date}</span>`;
        case "product": return `<span class="cell-strong">${esc(p?.name || "—")}</span><div class="cell-sub">${esc(p?.sku || "")}</div>`;
        case "qty": return `<span class="cell-mono">+${r.qty}</span>`;
        case "supplier": return esc(supplierName(r.supplierId));
        case "cost": return `<span class="cell-mono">${money(r.unitCost)}</span>`;
        case "total": return `<span class="cell-mono">${money(r.unitCost * r.qty)}</span>`;
        case "note": return `<span class="cell-sub">${esc(r.note || "—")}</span>`;
        default: return "";
      }
    },
  });

  bindRowActions($("#stockInTable"), {
    edit: (id) => openStockInModal(id),
    delete: (id) => {
      confirmDelete("Remove this stock-in record? Stock quantities will not be reversed automatically.", () => {
        state.stockIn = state.stockIn.filter((x) => x.id !== id);
        renderStockIn();
        saveState();
        showToast("Stock-in record removed", true);
      });
    },
  });
}

function openStockInModal(id) {
  const editing = id ? state.stockIn.find((x) => x.id === id) : null;
  openModal({
    title: editing ? "Edit stock-in record" : "Receive stock",
    initial: editing || { date: "2026-08-07" },
    fields: [
      { name: "productId", label: "Product", type: "select", options: state.products.map((p) => ({ value: p.id, label: `${p.name} (${p.sku})` })) },
      { name: "supplierId", label: "Supplier", type: "select", options: state.suppliers.map((s) => ({ value: s.id, label: s.name })) },
      { name: "qty", label: "Quantity received", type: "number", min: 1, default: 1 },
      { name: "unitCost", label: "Unit cost", type: "number", step: "0.01", min: 0, default: 0 },
      { name: "date", label: "Date", type: "date" },
      { name: "note", label: "Note (optional)", type: "textarea" },
    ],
    onSave: (data) => {
      const payload = { ...data, qty: parseInt(data.qty) || 0, unitCost: parseFloat(data.unitCost) || 0 };
      if (editing) {
        // reverse old qty, apply new
        const product = productById(editing.productId);
        if (product) product.stock -= editing.qty;
        Object.assign(editing, payload);
      } else {
        state.stockIn.push({ id: nextId("si"), ...payload });
      }
      const product = productById(payload.productId);
      if (product) product.stock += payload.qty;
      showToast(`Received ${payload.qty} × ${product?.name || "item"}`);
      renderStockIn();
      renderProducts();
      saveState();
    },
  });
}

/* ---------------------------------------------------------------------- */
/* 12. STOCK OUT                                                           */
/* ---------------------------------------------------------------------- */

function renderStockOut() {
  const rows = [...state.stockOut].sort((a, b) => (a.date < b.date ? 1 : -1));
  renderTable({
    container: $("#stockOutTable"),
    columns: [
      { key: "date", label: "Date" },
      { key: "product", label: "Product" },
      { key: "qty", label: "Qty out" },
      { key: "customer", label: "Customer" },
      { key: "channel", label: "Channel" },
      { key: "price", label: "Sold at" },
      { key: "total", label: "Total" },
    ],
    rows,
    emptyText: "No stock has gone out yet. Log a sale or removal.",
    rowActions: true,
    cellFn: (r, key) => {
      const p = productById(r.productId);
      switch (key) {
        case "date": return `<span class="cell-mono">${r.date}</span>`;
        case "product": return `<span class="cell-strong">${esc(p?.name || "—")}</span><div class="cell-sub">${esc(p?.sku || "")}</div>`;
        case "qty": return `<span class="cell-mono">−${r.qty}</span>`;
        case "customer": return esc(r.customer || "Walk-in");
        case "channel": return Badge(r.channel, r.channel === "Online" ? "info" : r.channel === "Damaged/Written off" ? "bad" : "neutral");
        case "price": return `<span class="cell-mono">${money(p?.price || 0)}</span>`;
        case "total": return `<span class="cell-mono">${money((p?.price || 0) * r.qty)}</span>`;
        default: return "";
      }
    },
  });

  bindRowActions($("#stockOutTable"), {
    edit: (id) => openStockOutModal(id),
    delete: (id) => {
      confirmDelete("Remove this stock-out record? Stock quantities will not be reversed automatically.", () => {
        state.stockOut = state.stockOut.filter((x) => x.id !== id);
        renderStockOut();
        saveState();
        showToast("Stock-out record removed", true);
      });
    },
  });
}

function openStockOutModal(id) {
  const editing = id ? state.stockOut.find((x) => x.id === id) : null;
  openModal({
    title: editing ? "Edit stock-out record" : "Record stock out",
    initial: editing || { date: TODAY, customer: "Walk-in", payment: "Cash" },
    fields: [
      { name: "productId", label: "Product", type: "select", options: state.products.map((p) => ({ value: p.id, label: `${p.name} (${p.sku}) — ${p.stock} in stock` })) },
      { name: "qty", label: "Quantity", type: "number", min: 1, default: 1 },
      { name: "customer", label: "Customer (optional)", placeholder: "e.g. Walk-in" },
      { name: "payment", label: "Payment method", type: "select", options: [{ value: "Cash", label: "Cash" }, { value: "Card", label: "Card" }, { value: "GCash", label: "GCash" }, { value: "Other", label: "Other" }] },
      { name: "channel", label: "Channel", type: "select", options: [{ value: "In-store", label: "In-store" }, { value: "Online", label: "Online" }, { value: "Wholesale", label: "Wholesale" }, { value: "Damaged/Written off", label: "Damaged / written off" }] },
      { name: "date", label: "Date", type: "date" },
    ],
    onSave: (data) => {
      const payload = { ...data, qty: parseInt(data.qty) || 0 };
      const product = productById(payload.productId);
      if (editing) {
        const oldProduct = productById(editing.productId);
        if (oldProduct) oldProduct.stock += editing.qty;
        Object.assign(editing, payload);
      } else {
        state.stockOut.push({ id: nextId("so"), ...payload });
      }
      if (product) {
        if (payload.qty > product.stock) {
          showToast(`Warning: ${product.name} stock is now negative`, true);
        }
        product.stock -= payload.qty;
      }
      showToast(`Logged ${payload.qty} × ${product?.name || "item"} out`);
      renderStockOut();
      renderProducts();
      saveState();
    },
  });
}

/* ---------------------------------------------------------------------- */
/* 13. LOW STOCK                                                           */
/* ---------------------------------------------------------------------- */

function renderLowStock() {
  const rows = state.products
    .filter((p) => p.stock <= state.settings.lowStockThreshold)
    .sort((a, b) => a.stock - b.stock);

  $("#lowStockSummary").textContent = rows.length
    ? `${rows.length} item${rows.length === 1 ? "" : "s"} at or below the reorder point of ${state.settings.lowStockThreshold} units.`
    : `All products are above the reorder point of ${state.settings.lowStockThreshold} units.`;

  renderTable({
    container: $("#lowStockTable"),
    columns: [
      { key: "product", label: "Product" },
      { key: "sku", label: "SKU" },
      { key: "stock", label: "On hand" },
      { key: "status", label: "Status" },
      { key: "supplier", label: "Preferred supplier" },
    ],
    rows,
    emptyText: "Nothing is low right now. Nice work.",
    cellFn: (p, key) => {
      switch (key) {
        case "product": return `<span class="cell-strong">${esc(p.name)}</span>`;
        case "sku": return `<span class="cell-mono">${esc(p.sku)}</span>`;
        case "stock": return TankGauge(p);
        case "status": { const s = stockStatus(p); return Badge(s.label, s.type); }
        case "supplier": {
          const match = state.stockIn.filter((si) => si.productId === p.id).slice(-1)[0];
          return match ? esc(supplierName(match.supplierId)) : `<span class="text-muted">Not set</span>`;
        }
        default: return "";
      }
    },
  });

  // add a dedicated reorder column with a per-row action button
  buildLowStockReorderColumn(rows);
}

function buildLowStockReorderColumn(rows) {
  const table = $("#lowStockTable table");
  if (!table) return;
  const headRow = table.querySelector("thead tr");
  if (!headRow.querySelector("[data-reorder-head]")) {
    const th = document.createElement("th");
    th.setAttribute("data-reorder-head", "");
    headRow.appendChild(th);
  }
  const bodyRows = table.querySelectorAll("tbody tr");
  bodyRows.forEach((tr) => {
    const id = tr.dataset.id;
    const td = document.createElement("td");
    td.innerHTML = `<button class="btn btn-sm btn-primary" data-reorder="${id}">Reorder</button>`;
    tr.appendChild(td);
    td.querySelector("button").addEventListener("click", () => {
      const p = productById(id);
      openModal({
        title: `Reorder — ${p.name}`,
        initial: { date: "2026-08-07", qty: Math.max(state.settings.lowStockThreshold * 2 - p.stock, 10) },
        fields: [
          { name: "supplierId", label: "Supplier", type: "select", options: state.suppliers.map((s) => ({ value: s.id, label: s.name })) },
          { name: "qty", label: "Quantity to order", type: "number", min: 1 },
          { name: "unitCost", label: "Unit cost", type: "number", step: "0.01", min: 0, default: p.cost },
          { name: "date", label: "Expected date", type: "date" },
        ],
        extraNote: `Currently ${p.stock} ${p.unit}(s) in stock.`,
        onSave: (data) => {
          const payload = { productId: id, qty: parseInt(data.qty) || 0, unitCost: parseFloat(data.unitCost) || 0, supplierId: data.supplierId, date: data.date, note: "Reorder from Low Stock" };
          state.stockIn.push({ id: nextId("si"), ...payload });
          p.stock += payload.qty;
          showToast(`Reordered ${payload.qty} × ${p.name}`);
          renderLowStock();
          renderProducts();
          saveState();
        },
      });
    });
  });
}

/* ---------------------------------------------------------------------- */
/* 14. REPORTS                                                             */
/* ---------------------------------------------------------------------- */

let reportsPeriod = "weekly";

const PERIOD_LABEL = { daily: "Daily", weekly: "Weekly", monthly: "Monthly" };

function renderReports() {
  const chipRow = $("#reportPeriodChips");
  if (chipRow) {
    chipRow.innerHTML = ["daily", "weekly", "monthly"]
      .map((p) => `<button class="chip ${reportsPeriod === p ? "active" : ""}" data-period="${p}">${PERIOD_LABEL[p]}</button>`)
      .join("");
  }

  const outsInPeriod = state.stockOut.filter((o) => isInPeriod(o.date, reportsPeriod));
  const insInPeriod = state.stockIn.filter((si) => isInPeriod(si.date, reportsPeriod));

  const totalRevenue = outsInPeriod.reduce((sum, o) => sum + o.qty * (productById(o.productId)?.price || 0), 0);
  const totalCOGS = outsInPeriod.reduce((sum, o) => sum + o.qty * (productById(o.productId)?.cost || 0), 0);
  const estimatedProfit = totalRevenue - totalCOGS;
  const productsSold = outsInPeriod.reduce((sum, o) => sum + o.qty, 0);

  const qtyByProduct = {};
  outsInPeriod.forEach((o) => { qtyByProduct[o.productId] = (qtyByProduct[o.productId] || 0) + o.qty; });
  const bestEntry = Object.entries(qtyByProduct).sort((a, b) => b[1] - a[1])[0];
  const bestProduct = bestEntry ? productById(bestEntry[0]) : null;

  $("#reportsPeriodNote").textContent = {
    daily: `Showing today, ${TODAY}.`,
    weekly: "Showing the last 7 days.",
    monthly: "Showing the last 30 days.",
  }[reportsPeriod];

  $("#reportStatGrid").innerHTML = [
    StatCard({ label: "Total Revenue", value: money(totalRevenue), icon: ICONS.chart, colorClass: "teal" }),
    StatCard({ label: "Products Sold", value: productsSold, icon: ICONS.box, colorClass: "amber" }),
    StatCard({ label: "Estimated Profit", value: money(estimatedProfit), icon: ICONS.award, colorClass: "violet" }),
    StatCard({ label: "Best Selling Vape", value: bestProduct ? esc(bestProduct.name) : "—", icon: ICONS.tag, colorClass: "teal", trend: bestEntry ? { dir: "up", icon: "▲", text: `${bestEntry[1]} sold` } : null }),
  ].join("");

  // revenue by category (within selected period)
  const revByCat = {};
  outsInPeriod.forEach((o) => {
    const p = productById(o.productId);
    if (!p) return;
    revByCat[p.categoryId] = (revByCat[p.categoryId] || 0) + o.qty * p.price;
  });
  const catEntries = Object.entries(revByCat).sort((a, b) => b[1] - a[1]);
  const catMax = Math.max(...catEntries.map((e) => e[1]), 1);
  const palette = ["#5eead4", "#a78bfa", "#fbbf24", "#f87171", "#4ade80", "#60a5fa"];
  $("#categoryLegend").innerHTML = catEntries.length
    ? catEntries.map(([cid, val], i) => `
        <div class="legend-row">
          <span class="legend-dot" style="background:${palette[i % palette.length]}"></span>
          <span style="width:110px">${esc(catName(cid))}</span>
          <span class="legend-bar"><span class="legend-bar-fill" style="width:${(val / catMax) * 100}%;background:${palette[i % palette.length]}"></span></span>
          <span class="legend-val">${money(val)}</span>
        </div>`).join("")
    : `<div class="table-empty">No sales in this period.</div>`;

  // supplier spend (within selected period)
  const spendBySupplier = {};
  insInPeriod.forEach((si) => { spendBySupplier[si.supplierId] = (spendBySupplier[si.supplierId] || 0) + si.qty * si.unitCost; });
  const supEntries = Object.entries(spendBySupplier).sort((a, b) => b[1] - a[1]);
  renderTable({
    container: $("#supplierSpendTable"),
    columns: [{ key: "supplier", label: "Supplier" }, { key: "spend", label: "Total spend" }],
    rows: supEntries.map(([sid, val]) => ({ id: sid, sid, val })),
    emptyText: "No purchases in this period.",
    cellFn: (r, key) => key === "supplier" ? esc(supplierName(r.sid)) : `<span class="cell-mono">${money(r.val)}</span>`,
  });

  // margin by product (top 6 by margin %, all-time — not period specific)
  const marginRows = state.products
    .map((p) => ({ ...p, marginPct: p.price > 0 ? ((p.price - p.cost) / p.price) * 100 : 0 }))
    .sort((a, b) => b.marginPct - a.marginPct)
    .slice(0, 6);
  renderTable({
    container: $("#marginTable"),
    columns: [
      { key: "product", label: "Product" },
      { key: "cost", label: "Cost" },
      { key: "price", label: "Price" },
      { key: "margin", label: "Margin" },
    ],
    rows: marginRows,
    emptyText: "No products yet.",
    cellFn: (p, key) => {
      if (key === "product") return `<span class="cell-strong">${esc(p.name)}</span>`;
      if (key === "cost") return `<span class="cell-mono">${money(p.cost)}</span>`;
      if (key === "price") return `<span class="cell-mono">${money(p.price)}</span>`;
      if (key === "margin") return Badge(`${p.marginPct.toFixed(0)}%`, p.marginPct >= 50 ? "ok" : p.marginPct >= 30 ? "warn" : "bad");
      return "";
    },
  });
}

function bindReportFilters() {
  $("#reportPeriodChips")?.addEventListener("click", (e) => {
    const chip = e.target.closest("[data-period]");
    if (!chip) return;
    reportsPeriod = chip.dataset.period;
    renderReports();
  });
}

/* ---------------------------------------------------------------------- */
/* 15. SETTINGS                                                            */
/* ---------------------------------------------------------------------- */

function renderSettings() {
  $("#setShopName").value = state.settings.shopName;
  $("#setContactEmail").value = state.settings.contactEmail || "";
  $("#setContactPhone").value = state.settings.contactPhone || "";
  $("#setAddress").value = state.settings.address || "";
  $("#setCurrency").value = state.settings.currency;
  $("#setTaxRate").value = state.settings.taxRate;
  $("#setLowThreshold").value = state.settings.lowStockThreshold;
  $("#setCriticalThreshold").value = state.settings.criticalThreshold;
  $("#setNotifyLowStock").checked = state.settings.notifyLowStock;
  $("#setNotifyDaily").checked = state.settings.notifyDailySummary;
  $("#setAutoReorder").checked = state.settings.autoReorder;

  const preview = $("#logoPreview");
  if (preview) {
    preview.innerHTML = state.settings.logo
      ? `<img src="${state.settings.logo}" alt="Shop logo" class="image-preview">`
      : `<div class="image-preview image-preview-empty">${ICONS.image}</div>`;
  }
  const clearBtn = $("#logoClearBtn");
  if (clearBtn) clearBtn.style.display = state.settings.logo ? "inline-flex" : "none";
}

let pendingLogo = null;

function bindSettingsForm() {
  $("#logoFileInput")?.addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      pendingLogo = reader.result;
      $("#logoPreview").innerHTML = `<img src="${reader.result}" alt="Shop logo" class="image-preview">`;
      $("#logoClearBtn").style.display = "inline-flex";
    };
    reader.readAsDataURL(file);
  });

  $("#logoClearBtn")?.addEventListener("click", () => {
    pendingLogo = "";
    $("#logoPreview").innerHTML = `<div class="image-preview image-preview-empty">${ICONS.image}</div>`;
    $("#logoClearBtn").style.display = "none";
  });

  $("#settingsForm").addEventListener("submit", (e) => {
    e.preventDefault();
    state.settings.shopName = $("#setShopName").value || state.settings.shopName;
    state.settings.contactEmail = $("#setContactEmail").value;
    state.settings.contactPhone = $("#setContactPhone").value;
    state.settings.address = $("#setAddress").value;
    if (pendingLogo !== null) { state.settings.logo = pendingLogo; pendingLogo = null; }
    state.settings.currency = $("#setCurrency").value || "$";
    state.settings.taxRate = parseFloat($("#setTaxRate").value) || 0;
    state.settings.lowStockThreshold = parseInt($("#setLowThreshold").value) || 0;
    state.settings.criticalThreshold = parseInt($("#setCriticalThreshold").value) || 0;
    state.settings.notifyLowStock = $("#setNotifyLowStock").checked;
    state.settings.notifyDailySummary = $("#setNotifyDaily").checked;
    state.settings.autoReorder = $("#setAutoReorder").checked;
    $("#brandNameLabel").textContent = state.settings.shopName;
    applyBrandMark();
    showToast("Settings saved");
    refreshLowStockBadge();
    saveState();
  });

  $("#settingsResetBtn").addEventListener("click", () => {
    confirmDelete("Reset settings to their defaults?", () => {
      const fresh = cloneDefaultState().settings;
      Object.assign(state.settings, fresh);
      pendingLogo = null;
      renderSettings();
      $("#brandNameLabel").textContent = state.settings.shopName;
      applyBrandMark();
      showToast("Settings reset to defaults");
      saveState();
    });
  });
}

function applyBrandMark() {
  const mark = $("#sidebarBrandMark");
  if (!mark) return;
  mark.innerHTML = state.settings.logo
    ? `<img src="${state.settings.logo}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:10px">`
    : `<svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M7 17a4.5 4.5 0 01-.4-9 5.5 5.5 0 0110.6-1.6A4 4 0 0117 17H7z" fill="#0d0f15"/></svg>`;
}

/* ---------------------------------------------------------------------- */
/* 16. GLOBAL BINDINGS / INIT                                              */
/* ---------------------------------------------------------------------- */

function bindNav() {
  $$(".nav-item").forEach((item) => {
    item.addEventListener("click", () => navigateTo(item.dataset.target));
  });
}

function bindPrimaryAction() {
  $("#primaryAction").addEventListener("click", () => {
    const page = $("#primaryAction").dataset.for;
    const openers = {
      products: () => openProductModal(null),
      categories: () => openCategoryModal(null),
      brands: () => openBrandModal(null),
      suppliers: () => openSupplierModal(null),
      "stock-in": () => openStockInModal(null),
      "stock-out": () => openStockOutModal(null),
    };
    openers[page]?.();
  });
}

function bindProductFilters() {
  $("#productCategoryChips").addEventListener("click", (e) => {
    const chip = e.target.closest("[data-cat]");
    if (!chip) return;
    productFilter.category = chip.dataset.cat;
    renderProducts();
  });
  $("#productSearch").addEventListener("input", (e) => {
    productFilter.search = e.target.value.trim();
    renderProducts();
  });
}

function bindDashboardLinks() {
  $$("[data-goto]").forEach((el) => el.addEventListener("click", () => navigateTo(el.dataset.goto)));
}

function bindEscapeClose() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const overlay = $("#modalOverlay");
      if (overlay.classList.contains("open")) {
        overlay.classList.remove("open");
        overlay.innerHTML = "";
      }
    }
  });
}

function bindGlobalSearch() {
  $("#globalSearch").addEventListener("input", (e) => {
    const q = e.target.value.trim();
    if (!q) return;
    navigateTo("products");
    $("#productSearch").value = q;
    productFilter.search = q;
    renderProducts();
  });
}

function init() {
  document.title = `${state.settings.shopName} — VaporLedger`;
  $("#brandNameLabel").textContent = state.settings.shopName;
  applyBrandMark();
  bindNav();
  bindPrimaryAction();
  bindProductFilters();
  bindGlobalSearch();
  bindSettingsForm();
  bindSalesForm();
  bindReportFilters();
  bindDashboardLinks();
  bindEscapeClose();
  navigateTo("dashboard");
}

document.addEventListener("DOMContentLoaded", init);
