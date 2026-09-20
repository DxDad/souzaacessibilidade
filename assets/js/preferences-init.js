(() => {
  try {
    const theme = localStorage.getItem('souza_theme');
    const fontSize = localStorage.getItem('souza_font_size');

    if (theme === 'light') {
      document.documentElement.dataset.theme = 'light';
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#f4efe5');
    }

    if (['small', 'large', 'largest'].includes(fontSize)) {
      document.documentElement.dataset.fontSize = fontSize;
    }
  } catch (error) {
    // Mantém as preferências padrão quando o armazenamento não está disponível.
  }
})();
