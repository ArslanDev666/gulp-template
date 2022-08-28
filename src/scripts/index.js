import { DARK_THEME, DEFAULT_THEME } from './const/themes';

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('#change-theme');
  const html = document.documentElement;

  const toggleTheme = () => {
    const theme = html.dataset.theme;
    html.dataset.theme = theme === DARK_THEME ? DEFAULT_THEME : DARK_THEME;
  };

  btn.addEventListener('click', toggleTheme);
});
