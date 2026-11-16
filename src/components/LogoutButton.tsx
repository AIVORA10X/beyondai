'use client';

export function LogoutButton() {
  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  }

  return (
    <button type="button" className="logout-btn" onClick={handleLogout}>
      خروج
    </button>
  );
}
