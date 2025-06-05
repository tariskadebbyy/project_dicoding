import HomePresenter from './presenters/homePresenter.js';
import HomeView from './views/homeView.js';
import AddPresenter from './presenters/addPresenter.js';
import AddView from './views/addView.js';
import LoginPresenter from './presenters/loginPresenter.js';
import LoginView from './views/loginView.js';
import RegisterPresenter from './presenters/registerPresenter.js';
import RegisterView from './views/registerView.js';

import 'leaflet/dist/leaflet.css';
import './style.css';

async function router() {
  const container = document.getElementById('main');
  let route = window.location.hash;

  if (!container) {
    console.error('Element #main tidak ditemukan!');
    return;
  }

  if (!route || route === '#/') {
    window.location.hash = '#/login';
    return;
  }

  const renderAndInit = async (View, Presenter) => {
    const renderAction = async () => {
      await View.render(container);
      await View.afterRender?.();
      Presenter.init(View);
    };

    if (document.startViewTransition) {
      document.startViewTransition(() => renderAction());
    } else {
      await renderAction();
    }
  };

  if (route === '#/add') {
    await renderAndInit(AddView, AddPresenter);
  } else if (route === '#/login') {
    await renderAndInit(LoginView, LoginPresenter);
  } else if (route === '#/register') {
    await renderAndInit(RegisterView, RegisterPresenter);
  } else if (route === '#/home') {
    await renderAndInit(HomeView, HomePresenter);
  } else {
    container.innerHTML = '<p>Halaman tidak ditemukan</p>';
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
