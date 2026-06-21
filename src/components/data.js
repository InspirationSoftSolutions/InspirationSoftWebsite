import { supabase } from '../lib/supabase';
export const headertransparentlogo = '/assets/Inspiration-landscape-transperent-logo.png';
export const headerlogo = '/assets/Inspiration-landscape-logo.png';
export const logo = '/assets/inspiration-logo-transparent.png';
export const logoIcon = '/assets/inspiration-icon-transparent.png';
export const landingVideo = '/assets/landing-background.mp4';
export const ADMIN_ID = 'InpirationSoft';
export const ADMIN_PASSWORD = 'Inspiration@2026';

export const services = [
  ['Custom Web Application', 'Secure portals, dashboards, workflow engines, CRMs, ERP modules, and business tools built around your exact process.'],
  ['Website Design', 'Professional, responsive interfaces with clear content, elegant motion, fast loading, and a brand-first visual system.'],
  ['Logo Creation', 'Distinct logo concepts, refinements, usage guidelines, and launch-ready brand assets for digital and print.'],
  ['Software Development', 'End-to-end software planning, UI, backend, integrations, testing, deployment, and long-term enhancements.'],
  ['Website Development', 'Corporate websites, product sites, CMS-enabled pages, landing pages, SEO structure, and performance-minded delivery.'],
  ['Database Development', 'Relational database design, reporting structures, migrations, optimization, backups, and secure access patterns.'],
  ['Hosting & Maintenance', 'Managed deployment, uptime checks, domain/email coordination, SSL, updates, bug fixes, and release support.']
];

export const products = [
  ['Inventory Management', 'Stock tracking, purchase flow, barcode-ready item control, warehouse views, alerts, and inventory reports.'],
  ['Construction Management System', 'Project planning, material tracking, contractor billing, site progress, approvals, documents, and cost visibility.'],
  ['Account Opening / eKYC Module', 'Digital onboarding for finance companies with customer capture, document upload, verification workflow, and audit history.']
];

export const stats = [
  ['99.9%', 'hosting-ready uptime approach'],
  ['7+', 'digital service capabilities'],
  ['3', 'ready product solution families'],
  ['24/7', 'maintenance mindset']
];

export const processSteps = ['Discovery', 'Design', 'Development', 'Testing', 'Launch', 'Support'];

export const contactPoints = [
  'Custom software consultation',
  'Product solution demos',
  'Hosting and support planning'
];

export const siteDefaults = {
  services,
  products,
  stats,
  processSteps,
  contactPoints
};

const sortByDisplayOrder = (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0);

const rowsToPairs = (rows, titleKey = 'title', textKey = 'description') =>
  (rows || []).sort(sortByDisplayOrder).map(row => [row[titleKey], row[textKey]]);

const rowsToLabels = rows =>
  (rows || []).sort(sortByDisplayOrder).map(row => row.label || row.title).filter(Boolean);

async function loadCollection(table, select = '*') {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from(table)
    .select(select)
    .eq('is_active', true)
    .order('display_order', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function loadSiteContent() {
  if (!supabase) return siteDefaults;

  const [serviceRows, productRows, statRows, processRows, contactRows] = await Promise.allSettled([
    loadCollection('site_services', 'title,description,display_order,is_active'),
    loadCollection('site_products', 'title,description,display_order,is_active'),
    loadCollection('site_stats', 'value,label,display_order,is_active'),
    loadCollection('site_process_steps', 'title,display_order,is_active'),
    loadCollection('site_contact_points', 'label,display_order,is_active')
  ]);

  const pick = (result, fallback, mapper) =>
    result.status === 'fulfilled' && result.value.length ? mapper(result.value) : fallback;

  return {
    services: pick(serviceRows, siteDefaults.services, rowsToPairs),
    products: pick(productRows, siteDefaults.products, rowsToPairs),
    stats: pick(statRows, siteDefaults.stats, rows => rowsToPairs(rows, 'value', 'label')),
    processSteps: pick(processRows, siteDefaults.processSteps, rows => rowsToLabels(rows)),
    contactPoints: pick(contactRows, siteDefaults.contactPoints, rows => rowsToLabels(rows))
  };
}

export { supabase };
