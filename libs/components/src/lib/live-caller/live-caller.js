 export function initLiveCaller(lang) {
  const liveCallerDiv = document.querySelectorAll('div[data-livecaller]');
  if (liveCallerDiv.length > 0) {
    liveCallerDiv.forEach(item => {
      item.remove();
    })
  }

  (function (w, t, c, p, s, e, l, k) {
    p = new Promise(function (r) {
      w[c] = {
        client: function () {
          return p;
        }
      };
      l = document.createElement('div');
      l.setAttribute('id', 'live-caller-widget');
      s = document.createElement(t);
      s.async = 1;
      s.setAttribute('data-livecaller', 'script');
      k = document.body || document.documentElement;
      k.insertBefore(l, k.firstChild);
      l.setAttribute('data-livecaller', 'mount-el');
      s.src = 'https://cdn.livecaller.io/js/app.js';
      e = document.getElementsByTagName(t)[0];
      e
        ? e.parentNode.insertBefore(s, e)
        : k.insertBefore(s, l.nextSibling);
      s.onload = function () {
        r(w[c]);
      };
    });
    return p;
  })
  (window, 'script', 'LiveCaller').then(function () {
    let liveCaller = window['LiveCaller'];
    try {
      liveCaller.config.merge({
        widget: { id: 'e6b7026a-2d6e-47cd-a56f-b37f348f859f' },
        app: { locale: lang }
      });
      let globalVm = '';
      liveCaller.$on('session.ready', (vm) => {
        globalVm = vm;
      });

      liveCaller.$on('analytics.click', (analytics) => {
        if (analytics.target === 'chat-button') {
          let department = globalVm.widget.departments.find(
            (department) => {
              return department.display_name.toLowerCase() === 'support';
            }
          );
          setTimeout(() => {
            globalVm.$router
              .push({ name: 'chat', params: { department: department.id } })
              .catch((e) => {
                console.log(e);
              });
          });
        }
      });
      liveCaller.liftOff();
    } catch (e) {
      console.log(e);
    }
  })
}
