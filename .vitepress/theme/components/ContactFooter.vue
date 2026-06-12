<template>
  <div class="contact-footer">
    <div class="contact-label">聯絡方式</div>
    <div class="contact-links">
      <span class="contact-note">✉️ scsoarhigh0525@gmail.com</span>
      <a href="https://www.threads.com/@ai._xiangc" target="_blank" rel="noopener noreferrer" class="contact-link">🧵 Threads</a>
      <a href="https://www.instagram.com/ai._xiangc/" target="_blank" rel="noopener noreferrer" class="contact-link contact-link--ig">📷 Instagram</a>
    </div>
  </div>
</template>

<style scoped>
.contact-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  max-width: 1152px;
  margin: 0 auto;
  padding: 24px;
  border-top: 1px solid var(--vp-c-divider);
}

.contact-label {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}

.contact-links {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.contact-link {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration: none !important;
  transition: opacity 0.15s;
}

.contact-link:hover {
  opacity: 0.8;
}

.contact-link--ig {
  color: var(--xc-orange);
}

.contact-note {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}
</style>
