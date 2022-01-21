export const liveCallerScript = `
setTimeout(() => {
  LiveCaller.$emit('ui.widget.open');
  (function (w, t, c, p, s, e, l, k) {
    p = new Promise(function (r) {
      w[c] = {
        client: function () {
          return p;
        }
      };
      l = document.createElement('div');
      l.setAttribute('id', 'live-caller-widget');
      a = document.querySelector('.headerclick');
      s = document.createElement(t);
      s.async = 1;
      s.setAttribute('data-livecaller', 'script');
      k = document.body || document.documentElement;
      a.insertBefore(l, a.firstChild);
      l.setAttribute('data-livecaller', 'mount-el');
      s.src = 'https://cdn.livecaller.io/js/app.js';
      e = document.getElementsByTagName(t)[0];
      e ? e.parentNode.insertBefore(s, e) : k.insertBefore(s, l.nextSibling);
      s.onload = function () {
        r(w[c]);
      };
    });
    return p;
  })(window, 'script', 'LiveCaller').then(function () {
    try {
      LiveCaller.config.merge({
        widget: { id: '53197b8d-09f4-4229-a7a3-107a9ed884e9' },
        app: { locale: getLangFromLocalStorage() }
      });
      let globalVm = '';
      LiveCaller.$on('session.ready', (vm) => {
        globalVm = vm;
      });

      LiveCaller.$on('analytics.click', (analytics) => {
        if (analytics.target === 'chat-button') {
          const department = globalVm.widget.departments.find((department) => {
            return department.display_name.toLowerCase() === 'verification';
          });
          setTimeout(() => {
            globalVm.$router
              .push({ name: 'chat', params: { department: department.id } })
              .catch((e) => {
                console.log(e);
              });
          });
        }
      });
      LiveCaller.liftOff();
    } catch (e) {}
  });
}, 1000);

  function getLangFromLocalStorage() {
    return window.localStorage.getItem('lang') || 'ka';
  }`;
