export const categories = ['All', 'Gardens', 'Accommodation', 'Events', 'Catering', 'Camping'];

export function categoryFromHash(hash) {
  let value;
  try {
    value = decodeURIComponent(hash.replace(/^#/, '')).trim().toLowerCase();
  } catch {
    return 'All';
  }
  return categories.find(category => category.toLowerCase() === value) || 'All';
}
