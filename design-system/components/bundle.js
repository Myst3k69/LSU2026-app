/* @ds-bundle: {"format":4,"namespace":"BuildOS","components":[{"name":"Button"},{"name":"Input"},{"name":"TaskCard"},{"name":"ForgottenBadge"},{"name":"DomainHeader"},{"name":"TaskStatus"},{"name":"ChatBubble"},{"name":"ProgressBar"},{"name":"PrototypeBanner"},{"name":"Logo"},{"name":"Icon"},{"name":"AppShell"}]} */
(function () {
  'use strict';
  var R = window.React;
  var h = R.createElement;
  var F = R.Fragment;

  function cx() {
    var out = [];
    for (var i = 0; i < arguments.length; i++) { if (arguments[i]) out.push(arguments[i]); }
    return out.join(' ');
  }
  function omit(obj, keys) {
    var o = {};
    for (var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k) && keys.indexOf(k) < 0) o[k] = obj[k]; }
    return o;
  }

  /* ---------- Icon ---------- */
  var ICONS = {
    'arrow-right': ['M5 12h14', 'M13 6l6 6-6 6'],
    'arrow-left': ['M19 12H5', 'M11 6l-6 6 6 6'],
    'check': ['M5 12.5l4.5 4.5L19 7.5'],
    'circle': [{ c: [12, 12, 8.25] }],
    'check-circle': [{ c: [12, 12, 8.25] }, 'M8.25 12.25l2.6 2.6 4.9-5.2'],
    'postpone': ['M4.5 12a7.5 7.5 0 1 0 2.2-5.3', 'M4.5 4.5v3.75h3.75', 'M12 8.5V12l2.5 1.75'],
    'alert': ['M12 4l8.75 15.25H3.25z', 'M12 10v4', 'M12 16.9v.1'],
    'sparkle': [{ f: 'M12 2.75c.7 4.9 3.35 7.55 8.25 8.25-4.9.7-7.55 3.35-8.25 8.25-.7-4.9-3.35-7.55-8.25-8.25 4.9-.7 7.55-3.35 8.25-8.25z' }],
    'doc': ['M7 3.5h7l4 4V20.5H7z', 'M14 3.5v4h4', 'M10 12h5', 'M10 15.5h5'],
    'doc-plus': ['M7 3.5h7l4 4V20.5H7z', 'M14 3.5v4h4', 'M12.5 11v6', 'M9.5 14h6'],
    'external': ['M14 4h6v6', 'M20 4l-8.5 8.5', 'M18 14v5.5H4.5V6H10'],
    'send': ['M4 12L20 4.5 15.5 20l-3-6.5z', 'M12.5 13.5L20 4.5'],
    'plus': ['M12 5v14', 'M5 12h14'],
    'search': [{ c: [11, 11, 6.25] }, 'M15.75 15.75L20 20'],
    'home': ['M4 11l8-6.5 8 6.5', 'M6.5 9.5V19.5h11V9.5'],
    'list': ['M9.5 6.5H20', 'M9.5 12H20', 'M9.5 17.5H20', 'M4.5 6.5h.5', 'M4.5 12h.5', 'M4.5 17.5h.5'],
    'grid': ['M4.5 4.5h6v6h-6z', 'M13.5 4.5h6v6h-6z', 'M4.5 13.5h6v6h-6z', 'M13.5 13.5h6v6h-6z'],
    'chat': ['M4.5 5h15v10.5H10L4.5 19.5z'],
    'chevron-right': ['M9.5 6l6 6-6 6'],
    'chevron-down': ['M6 9.5l6 6 6-6'],
    'calendar': ['M4.5 6h15v13.5h-15z', 'M4.5 10h15', 'M8.5 3.5v4', 'M15.5 3.5v4'],
    'flag': ['M6 20.5V4', 'M6 4.5h11l-2.25 4 2.25 4H6'],
    'menu': ['M4 7h16', 'M4 12h16', 'M4 17h16'],
    'more': ['M6 12h.5', 'M12 12h.5', 'M18 12h.5'],
    'cube': ['M12 3.5l7.5 4.25v8.5L12 20.5l-7.5-4.25v-8.5z', 'M4.5 7.75L12 12l7.5-4.25', 'M12 12v8.5'],
    'users': [{ c: [9, 8.5, 3.25] }, 'M3 19.5c0-3.25 2.7-5.5 6-5.5s6 2.25 6 5.5', 'M15.5 5.4a3.25 3.25 0 0 1 0 6.2', 'M17.5 14.3c2 .7 3.5 2.6 3.5 5.2'],
    'scale': ['M12 4v16', 'M7.5 20h9', 'M5 7.5h14', 'M5 7.5l-2.75 6.5h5.5z', 'M19 7.5l-2.75 6.5h5.5z'],
    'euro': ['M17.5 6.6a7 7 0 1 0 0 10.8', 'M4.5 10.25h9', 'M4.5 13.75h9'],
    'megaphone': ['M4 10v4h3.5l8 5V5l-8 5z', 'M18.5 9.5a3 3 0 0 1 0 5'],
    'code': ['M8 7l-5 5 5 5', 'M16 7l5 5-5 5', 'M13.75 4.5l-3.5 15'],
    'sliders': ['M4 7h9.5', 'M18.5 7H20', 'M4 17h3.5', 'M12.5 17H20', { c: [16, 7, 2.25] }, { c: [10, 17, 2.25] }],
    'eye': ['M2.75 12S6.25 5.75 12 5.75 21.25 12 21.25 12 17.75 18.25 12 18.25 2.75 12 2.75 12z', { c: [12, 12, 2.75] }]
  };

  function Icon(props) {
    var size = props.size || 20;
    var def = ICONS[props.name] || ICONS.circle;
    var kids = def.map(function (p, i) {
      if (typeof p === 'string') return h('path', { key: i, d: p });
      if (p.c) return h('circle', { key: i, cx: p.c[0], cy: p.c[1], r: p.c[2] });
      return h('path', { key: i, d: p.f, fill: 'currentColor', stroke: 'none' });
    });
    var a11y = props.label ? { role: 'img', 'aria-label': props.label } : { 'aria-hidden': 'true', focusable: 'false' };
    return h('svg', Object.assign({
      className: cx('bo-icon', props.className),
      width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
      stroke: 'currentColor', strokeWidth: props.strokeWidth || 1.75,
      strokeLinecap: 'round', strokeLinejoin: 'round'
    }, a11y), props.label ? h('title', null, props.label) : null, kids);
  }

  /* ---------- Logo ---------- */
  var LOGO = { vb: '6 -81.49 376.44 84.81', build: 'M6.494140625 0.0V-70.3125H39.404296875Q52.1484375 -70.3125 58.203125 -65.869140625Q64.2578125 -61.42578125 64.2578125 -53.02734375Q64.2578125 -47.4609375 62.060546875 -44.2138671875Q59.86328125 -40.966796875 56.591796875 -39.404296875Q53.662109375 -37.939453125 50.732421875 -37.40234375Q58.0078125 -36.1328125 62.109375 -31.8359375Q66.357421875 -27.392578125 66.357421875 -19.53125Q66.357421875 -12.109375 62.841796875 -7.8369140625Q59.326171875 -3.564453125 53.5400390625 -1.7822265625Q47.75390625 0.0 40.966796875 0.0ZM24.12109375 -13.525390625H37.20703125Q41.796875 -13.525390625 44.23828125 -14.6728515625Q46.6796875 -15.8203125 47.607421875 -17.7978515625Q48.53515625 -19.775390625 48.53515625 -22.16796875Q48.53515625 -24.609375 47.509765625 -26.5869140625Q46.484375 -28.564453125 43.8720703125 -29.7119140625Q41.259765625 -30.859375 36.5234375 -30.859375H24.12109375ZM24.12109375 -43.505859375H38.037109375Q42.333984375 -43.505859375 44.53125 -45.0927734375Q46.728515625 -46.6796875 46.728515625 -50.146484375Q46.728515625 -53.125 44.873046875 -54.9560546875Q43.017578125 -56.787109375 38.134765625 -56.787109375H24.12109375Z M89.431640625 1.318359375Q83.181640625 1.318359375 79.275390625 -1.5869140625Q75.369140625 -4.4921875 73.5869140625 -9.5458984375Q71.8046875 -14.599609375 71.8046875 -21.044921875V-52.734375H88.943359375V-23.14453125Q88.943359375 -16.845703125 91.04296875 -14.0869140625Q93.142578125 -11.328125 97.048828125 -11.328125Q99.001953125 -11.328125 101.052734375 -12.3779296875Q103.103515625 -13.427734375 104.51953125 -16.1865234375Q105.935546875 -18.9453125 105.935546875 -24.12109375V-52.734375H123.025390625V0.0H106.423828125V-9.326171875Q103.93359375 -4.345703125 99.978515625 -1.66015625Q95.6328125 1.318359375 89.431640625 1.318359375Z M133.013671875 0.0V-52.734375H150.15234375V0.0ZM141.607421875 -58.0078125Q136.626953125 -58.0078125 133.74609375 -60.888671875Q130.865234375 -63.76953125 130.865234375 -68.75Q130.865234375 -73.73046875 133.74609375 -76.611328125Q136.626953125 -79.4921875 141.607421875 -79.4921875Q146.587890625 -79.4921875 149.46875 -76.611328125Q152.349609375 -73.73046875 152.349609375 -68.75Q152.349609375 -63.76953125 149.46875 -60.888671875Q146.587890625 -58.0078125 141.607421875 -58.0078125Z M173.71484375 0.0Q166.732421875 0.0 163.265625 -3.173828125Q159.798828125 -6.34765625 159.798828125 -12.59765625V-73.2421875H176.9375V-14.94140625Q176.9375 -13.28125 177.4013671875 -12.744140625Q177.865234375 -12.20703125 179.37890625 -12.20703125H182.9921875V0.0Z M206.26171875 1.318359375Q199.572265625 1.318359375 194.689453125 -1.9775390625Q189.806640625 -5.2734375 187.21875 -11.474609375Q184.630859375 -17.67578125 184.630859375 -26.513671875Q184.630859375 -35.302734375 187.2431640625 -41.455078125Q189.85546875 -47.607421875 194.7626953125 -50.830078125Q199.669921875 -54.052734375 206.5546875 -54.052734375Q212.658203125 -54.052734375 217.052734375 -51.318359375Q220.2265625 -49.31640625 222.619140625 -45.556640625V-73.2421875H239.7578125V0.0H223.498046875V-9.423828125Q220.71484375 -3.955078125 216.41796875 -1.3671875Q212.0234375 1.318359375 206.26171875 1.318359375ZM212.8046875 -11.376953125Q215.9296875 -11.376953125 218.3466796875 -13.037109375Q220.763671875 -14.697265625 222.1552734375 -18.0419921875Q223.546875 -21.38671875 223.546875 -26.318359375Q223.546875 -33.740234375 220.51953125 -37.5732421875Q217.4921875 -41.40625 212.951171875 -41.40625Q208.166015625 -41.40625 205.3828125 -37.3291015625Q202.599609375 -33.251953125 202.599609375 -26.123046875Q202.599609375 -19.23828125 205.3095703125 -15.3076171875Q208.01953125 -11.376953125 212.8046875 -11.376953125Z', os: 'M281.58203125 1.318359375Q270.64453125 1.318359375 262.685546875 -3.1005859375Q254.7265625 -7.51953125 250.4296875 -15.72265625Q246.1328125 -23.92578125 246.1328125 -35.15625Q246.1328125 -46.435546875 250.4296875 -54.58984375Q254.7265625 -62.744140625 262.685546875 -67.1875Q270.64453125 -71.630859375 281.58203125 -71.630859375Q292.51953125 -71.630859375 300.478515625 -67.1875Q308.4375 -62.744140625 312.734375 -54.58984375Q317.03125 -46.435546875 317.03125 -35.15625Q317.03125 -23.92578125 312.734375 -15.72265625Q308.4375 -7.51953125 300.478515625 -3.1005859375Q292.51953125 1.318359375 281.58203125 1.318359375ZM281.533203125 -13.671875Q287.001953125 -13.671875 290.810546875 -16.2109375Q294.619140625 -18.75 296.62109375 -23.5595703125Q298.623046875 -28.369140625 298.623046875 -35.15625Q298.623046875 -41.9921875 296.62109375 -46.77734375Q294.619140625 -51.5625 290.810546875 -54.1015625Q287.001953125 -56.640625 281.533203125 -56.640625Q276.162109375 -56.640625 272.353515625 -54.1015625Q268.544921875 -51.5625 266.5185546875 -46.77734375Q264.4921875 -41.9921875 264.4921875 -35.15625Q264.4921875 -28.369140625 266.5185546875 -23.5595703125Q268.544921875 -18.75 272.353515625 -16.2109375Q276.162109375 -13.671875 281.533203125 -13.671875Z M350.75 1.318359375Q342.9375 1.318359375 336.0771484375 -0.9765625Q329.216796875 -3.271484375 324.578125 -8.10546875Q319.939453125 -12.939453125 318.71875 -20.556640625L336.58984375 -24.169921875Q337.029296875 -18.359375 340.447265625 -15.6494140625Q343.865234375 -12.939453125 350.310546875 -12.939453125Q354.802734375 -12.939453125 357.244140625 -13.9892578125Q359.685546875 -15.0390625 360.6376953125 -16.6748046875Q361.58984375 -18.310546875 361.58984375 -20.068359375Q361.58984375 -23.33984375 358.7822265625 -25.1953125Q355.974609375 -27.05078125 351.580078125 -27.83203125L345.330078125 -28.955078125Q341.228515625 -29.638671875 337.1025390625 -30.908203125Q332.9765625 -32.177734375 329.5341796875 -34.47265625Q326.091796875 -36.767578125 324.0166015625 -40.4296875Q321.94140625 -44.091796875 321.94140625 -49.560546875Q321.94140625 -56.54296875 325.4814453125 -61.474609375Q329.021484375 -66.40625 335.3447265625 -69.0185546875Q341.66796875 -71.630859375 349.919921875 -71.630859375Q357.537109375 -71.630859375 363.8359375 -69.3603515625Q370.134765625 -67.08984375 374.333984375 -62.6708984375Q378.533203125 -58.251953125 379.802734375 -51.806640625L362.322265625 -48.14453125Q361.8828125 -50.927734375 360.7353515625 -52.978515625Q359.587890625 -55.029296875 357.2685546875 -56.201171875Q354.94921875 -57.373046875 350.896484375 -57.373046875Q347.13671875 -57.373046875 344.8662109375 -56.396484375Q342.595703125 -55.419921875 341.5703125 -53.90625Q340.544921875 -52.392578125 340.544921875 -50.68359375Q340.544921875 -47.4609375 344.060546875 -45.8740234375Q347.576171875 -44.287109375 353.09375 -43.310546875L359.5390625 -42.08984375Q364.666015625 -41.2109375 369.4755859375 -38.916015625Q374.28515625 -36.62109375 377.361328125 -32.373046875Q380.4375 -28.125 380.4375 -21.240234375Q380.4375 -13.8671875 376.580078125 -8.837890625Q372.72265625 -3.80859375 366.033203125 -1.2451171875Q359.34375 1.318359375 350.75 1.318359375Z', b: 'M23.138984375 71.796875V28.203125H43.54328125Q51.4446484375 28.203125 55.1985546875 30.9580078125Q58.9524609375 33.712890625 58.9524609375 38.919921875Q58.9524609375 42.37109375 57.59015625 44.38427734375Q56.2278515625 46.3974609375 54.19953125 47.3662109375Q52.383125 48.2744140625 50.56671875 48.607421875Q55.0774609375 49.39453125 57.6204296875 52.05859375Q60.25421875 54.8134765625 60.25421875 59.6875Q60.25421875 64.2890625 58.07453125 66.93798828125Q55.89484375 69.5869140625 52.30744140625 70.69189453125Q48.7200390625 71.796875 44.51203125 71.796875ZM34.0676953125 63.4111328125H42.1809765625Q45.0266796875 63.4111328125 46.5403515625 62.69970703125Q48.0540234375 61.98828125 48.62921875 60.76220703125Q49.2044140625 59.5361328125 49.2044140625 58.052734375Q49.2044140625 56.5390625 48.568671875 55.31298828125Q47.9329296875 54.0869140625 46.31330078125 53.37548828125Q44.693671875 52.6640625 41.7571484375 52.6640625H34.0676953125ZM34.0676953125 44.8232421875H42.695625Q45.3596875 44.8232421875 46.7219921875 43.83935546875Q48.084296875 42.85546875 48.084296875 40.7060546875Q48.084296875 38.859375 46.93390625 37.72412109375Q45.783515625 36.5888671875 42.756171875 36.5888671875H34.0676953125Z', p: 'M69.9889453125 72.6142578125Q66.8405078125 72.6142578125 64.9635546875 70.7373046875Q63.0866015625 68.8603515625 63.0866015625 65.7421875Q63.0866015625 62.59375 64.9635546875 60.716796875Q66.8405078125 58.83984375 69.9889453125 58.83984375Q73.107109375 58.83984375 74.9840625 60.716796875Q76.861015625 62.59375 76.861015625 65.7421875Q76.861015625 68.8603515625 74.9840625 70.7373046875Q73.107109375 72.6142578125 69.9889453125 72.6142578125Z' };

  function Logo(props) {
    var variant = props.variant || 'full';
    var tone = props.tone || 'color';
    var height = props.height || 28;
    var cls = cx('bo-logo', 'bo-logo--' + tone, props.className);
    if (variant === 'icon') {
      return h('svg', { className: cls, width: height, height: height, viewBox: '0 0 100 100', role: 'img', 'aria-label': 'BuildOS' },
        h('rect', { className: 'bo-logo__tile', width: 100, height: 100, rx: 22 }),
        h('path', { className: 'bo-logo__b', d: LOGO.b }),
        h('path', { className: 'bo-logo__dot', d: LOGO.p }));
    }
    var vb = LOGO.vb.split(' ').map(Number);
    var width = Math.round(height * vb[2] / vb[3]);
    return h('svg', { className: cls, width: width, height: height, viewBox: LOGO.vb, role: 'img', 'aria-label': 'BuildOS' },
      h('path', { className: 'bo-logo__build', d: LOGO.build }),
      h('path', { className: 'bo-logo__os', d: LOGO.os }));
  }

  /* ---------- Button ---------- */
  function Button(props) {
    var variant = props.variant || 'primary';
    var size = props.size || 'md';
    var rest = omit(props, ['variant', 'size', 'icon', 'iconLeft', 'block', 'className', 'children']);
    return h('button', Object.assign({ type: 'button' }, rest, {
      className: cx('bo-btn', 'bo-btn--' + variant, 'bo-btn--' + size, props.block && 'bo-btn--block', props.className)
    }),
      props.iconLeft ? h(Icon, { name: props.iconLeft, size: size === 'sm' ? 16 : 18 }) : null,
      h('span', null, props.children),
      props.icon ? h(Icon, { name: props.icon, size: size === 'sm' ? 16 : 18 }) : null);
  }

  /* ---------- Input ---------- */
  var fieldSeq = 0;
  function Input(props) {
    var idRef = R.useRef(null);
    if (idRef.current === null) idRef.current = props.id || 'bo-field-' + (++fieldSeq);
    var id = idRef.current;
    var rest = omit(props, ['label', 'hint', 'multiline', 'size', 'icon', 'className', 'id', 'footer']);
    var ctrlCls = cx('bo-field__control', props.size === 'lg' ? 'body-l' : 'body');
    var control = props.multiline
      ? h('textarea', Object.assign({ rows: 4 }, rest, { id: id, className: ctrlCls, 'aria-describedby': props.hint ? id + '-hint' : undefined }))
      : h('input', Object.assign({ type: 'text' }, rest, { id: id, className: ctrlCls, 'aria-describedby': props.hint ? id + '-hint' : undefined }));
    return h('div', { className: cx('bo-field', props.size === 'lg' && 'bo-field--lg', props.icon && 'bo-field--icon', props.className) },
      props.label ? h('label', { className: 'bo-field__label label', htmlFor: id }, props.label) : null,
      h('div', { className: 'bo-field__box' },
        props.icon ? h(Icon, { name: props.icon, size: 18, className: 'bo-field__icon' }) : null,
        control,
        props.footer ? h('div', { className: 'bo-field__footer' }, props.footer) : null),
      props.hint ? h('p', { className: 'bo-field__hint body-s', id: id + '-hint' }, props.hint) : null);
  }

  /* ---------- TaskStatus ---------- */
  var STATUS = {
    todo: { label: 'À faire', icon: 'circle' },
    done: { label: 'Faite', icon: 'check-circle' },
    postponed: { label: 'Reportée', icon: 'postpone' }
  };
  function TaskStatus(props) {
    var s = STATUS[props.status] || STATUS.todo;
    var key = STATUS[props.status] ? props.status : 'todo';
    return h('span', { className: cx('bo-status', 'bo-status--' + key, props.className) },
      h(Icon, { name: s.icon, size: 14, strokeWidth: 2 }), h('span', null, s.label));
  }

  /* ---------- ForgottenBadge ---------- */
  function ForgottenBadge(props) {
    if (props.compact) {
      return h('span', { className: cx('bo-forgot', 'bo-forgot--compact', props.className), title: 'Souvent oubliée' },
        h(Icon, { name: 'alert', size: 14, strokeWidth: 2, label: 'Souvent oubliée' }));
    }
    return h('span', { className: cx('bo-forgot', props.className) },
      h(Icon, { name: 'alert', size: 14, strokeWidth: 2 }), h('span', null, props.children || 'Souvent oubliée'));
  }

  /* ---------- ProgressBar ---------- */
  function ProgressBar(props) {
    var max = props.max || 100;
    var pct = Math.max(0, Math.min(100, Math.round((props.value || 0) / max * 100)));
    return h('div', {
      className: cx('bo-progress', props.size === 'sm' && 'bo-progress--sm', props.tone === 'ink' && 'bo-progress--ink', props.className),
      role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': max, 'aria-valuenow': props.value || 0,
      'aria-label': props.label || 'Avancement'
    }, h('span', { className: 'bo-progress__fill', style: { width: pct + '%' } }));
  }

  /* ---------- DomainHeader ---------- */
  function DomainHeader(props) {
    var done = props.done || 0, total = props.total || 0;
    var pct = total ? Math.round(done / total * 100) : 0;
    return h('header', { className: cx('bo-domain', props.compact && 'bo-domain--compact', props.className) },
      h('span', { className: cx('bo-domain__num', props.compact ? 'numeral-s' : 'numeral') }, props.index),
      h('div', { className: 'bo-domain__main' },
        h('div', { className: 'bo-domain__title' },
          props.icon ? h(Icon, { name: props.icon, size: 18 }) : null,
          h('h3', { className: 'title-m' }, props.name)),
        h('div', { className: 'bo-domain__meta body-s' },
          h('span', null, done + '/' + total + ' faites'),
          props.forgotten ? h('span', { className: 'bo-domain__forgot' }, h('span', { className: 'bo-dot', 'aria-hidden': 'true' }), props.forgotten + ' souvent oubliée' + (props.forgotten > 1 ? 's' : '')) : null)),
      h('div', { className: 'bo-domain__progress' },
        h('span', { className: 'bo-domain__pct ui' }, pct + ' %'),
        h(ProgressBar, { value: done, max: total || 1, size: 'sm', label: 'Avancement ' + props.name })));
  }

  /* ---------- TaskCard ---------- */
  function TaskCard(props) {
    var status = props.status || 'todo';
    var Tag = props.onClick ? 'button' : 'article';
    var extra = props.onClick ? { type: 'button', onClick: props.onClick } : {};
    return h(Tag, Object.assign({
      className: cx('bo-task', 'bo-task--' + status, props.selected && 'is-selected', props.compact && 'bo-task--compact', props.className)
    }, extra),
      h('span', { className: 'bo-task__check', 'aria-hidden': 'true' },
        h(Icon, { name: status === 'done' ? 'check' : status === 'postponed' ? 'postpone' : 'circle', size: status === 'todo' ? 22 : 14, strokeWidth: status === 'todo' ? 1.5 : 2.25 })),
      h('div', { className: 'bo-task__body' },
        props.domain ? h('span', { className: 'bo-task__domain label' }, props.domain) : null,
        h('h4', { className: 'bo-task__title title-s' }, props.title),
        props.description ? h('p', { className: 'bo-task__desc body-s' }, props.description) : null,
        h('div', { className: 'bo-task__meta' },
          h(TaskStatus, { status: status }),
          props.forgotten ? h(ForgottenBadge, null) : null,
          props.meta ? h('span', { className: 'bo-task__info body-s' }, props.meta) : null)),
      h(Icon, { name: 'chevron-right', size: 18, className: 'bo-task__go' }));
  }

  /* ---------- ChatBubble ---------- */
  function ChatBubble(props) {
    var from = props.from === 'user' ? 'user' : 'ai';
    return h('div', { className: cx('bo-msg', 'bo-msg--' + from, props.className) },
      h('div', { className: 'bo-msg__head' },
        from === 'ai'
          ? h('span', { className: 'bo-msg__avatar bo-msg__avatar--ai' }, h(Icon, { name: 'sparkle', size: 14 }))
          : h('span', { className: 'bo-msg__avatar' }, props.initials || 'VO'),
        h('span', { className: 'bo-msg__author label' }, props.author || (from === 'ai' ? 'Copilote IA' : 'Vous')),
        props.time ? h('span', { className: 'bo-msg__time body-s' }, props.time) : null),
      h('div', { className: 'bo-msg__bubble body' }, props.children),
      props.actions && props.actions.length ? h('div', { className: 'bo-msg__actions' },
        props.actions.map(function (a, i) {
          return h(Button, { key: i, variant: 'secondary', size: 'sm', iconLeft: a.icon }, a.label);
        })) : null);
  }

  /* ---------- PrototypeBanner ---------- */
  function PrototypeBanner(props) {
    return h('div', { className: cx('bo-proto', props.className), role: 'note' },
      h('span', { className: 'bo-proto__mark', 'aria-hidden': 'true' }),
      h('span', { className: 'label' }, props.children || 'Prototype de vision – données fictives'),
      h('span', { className: 'bo-proto__mark', 'aria-hidden': 'true' }));
  }

  /* ---------- AppShell ---------- */
  var NAV = [
    { id: 'home', label: 'Accueil', icon: 'home' },
    { id: 'plan', label: 'Mon plan', icon: 'list' },
    { id: 'dashboard', label: 'Tableau de bord', icon: 'grid' },
    { id: 'chat', label: 'Conversations', icon: 'chat' },
    { id: 'docs', label: 'Documents', icon: 'doc' }
  ];
  function AppShell(props) {
    var D = Demo;
    var active = props.active || 'plan';
    return h('div', { className: cx('bo-app', props.className) },
      h('aside', { className: 'bo-side' },
        h('div', { className: 'bo-side__brand' }, h(Logo, { height: 26 })),
        h('div', { className: 'bo-side__project' },
          h('span', { className: 'bo-side__avatar' }, D.project.initial),
          h('span', { className: 'bo-side__pname' },
            h('span', { className: 'label' }, 'Projet'),
            h('strong', { className: 'ui' }, D.project.name)),
          h(Icon, { name: 'chevron-down', size: 16 })),
        h('nav', { className: 'bo-side__nav', 'aria-label': 'Navigation principale' },
          NAV.map(function (n) {
            var count = n.id === 'plan' ? D.stats().total : n.id === 'docs' ? 6 : null;
            return h('a', { key: n.id, href: '#', className: cx('bo-side__link ui', active === n.id && 'is-active'), 'aria-current': active === n.id ? 'page' : undefined },
              h(Icon, { name: n.icon, size: 18 }), h('span', null, n.label),
              count !== null ? h('span', { className: 'bo-side__count body-s' }, count) : null);
          })),
        h('div', { className: 'bo-side__section label' }, 'Domaines'),
        h('ul', { className: 'bo-side__domains' },
          D.domains.map(function (d) {
            var s = D.stats(d.id);
            return h('li', { key: d.id, className: cx('bo-side__domain body-s', props.domain === d.id && 'is-active') },
              h('span', { className: 'bo-side__dnum' }, d.index), h('span', { className: 'bo-side__dname' }, d.name),
              h('span', { className: 'bo-side__dcount' }, s.done + '/' + s.total));
          })),
        h('div', { className: 'bo-side__foot' },
          h('span', { className: 'bo-side__user' }, D.project.founderInitials),
          h('span', { className: 'body-s' }, h('strong', null, D.project.founder), h('br'), 'Fondatrice'))),
      h('div', { className: 'bo-main' },
        h('div', { className: 'bo-topbar' },
          h('div', { className: 'bo-topbar__crumbs body-s' }, props.crumbs || null),
          h('div', { className: 'bo-topbar__ask' }, h(Icon, { name: 'sparkle', size: 16 }), h('span', { className: 'body-s' }, 'Demander au copilote…'), h('kbd', { className: 'body-s' }, '⌘ K')),
          props.actions || null),
        h('div', { className: 'bo-main__body' }, props.children)));
  }

  /* ---------- Demo data (prototype de vision, données fictives) ---------- */
  var Demo = {
    project: {
      name: 'Créno Vélo', initial: 'C', founder: 'Camille Ferrand', founderInitials: 'CF',
      pitch: 'Une application qui permet aux Lyonnais de réserver en deux minutes un réparateur vélo indépendant, à domicile ou au bureau, sur un créneau garanti.',
      description: 'Je veux lancer une application de réservation pour les réparateurs vélo indépendants à Lyon. Le cycliste choisit un créneau, le réparateur se déplace à domicile ou au bureau, le paiement se fait en ligne. Je prends une commission sur chaque réservation. Lancement prévu au printemps sur 3 arrondissements.'
    },
    domains: [
      { id: 'produit', index: '01', name: 'Produit', icon: 'cube' },
      { id: 'marche', index: '02', name: 'Marché & clients', icon: 'users' },
      { id: 'juridique', index: '03', name: 'Juridique & admin', icon: 'scale' },
      { id: 'finance', index: '04', name: 'Finance', icon: 'euro' },
      { id: 'marketing', index: '05', name: 'Marketing & acquisition', icon: 'megaphone' },
      { id: 'tech', index: '06', name: 'Tech', icon: 'code' },
      { id: 'operations', index: '07', name: 'Opérations', icon: 'sliders' },
      { id: 'veille', index: '08', name: 'Veille', icon: 'eye' }
    ],
    tasks: [
      { id: 't1', d: 'produit', title: 'Définir le parcours de réservation en 3 écrans', status: 'done', meta: 'Validée le 30 sept.' },
      { id: 't2', d: 'produit', title: 'Lister les fonctionnalités indispensables du MVP', status: 'done', meta: '9 fonctionnalités retenues' },
      { id: 't3', d: 'produit', title: 'Fixer les règles d’annulation et de retard', status: 'todo', forgotten: true, meta: 'Échéance 20 oct.' },
      { id: 't4', d: 'produit', title: 'Tester la maquette avec 5 cyclistes lyonnais', status: 'todo', meta: 'Échéance 24 oct.' },
      { id: 't5', d: 'marche', title: 'Interroger 10 réparateurs vélo indépendants', status: 'done', meta: '10 entretiens' },
      { id: 't6', d: 'marche', title: 'Comparer les solutions déjà utilisées par les cyclistes', status: 'done', meta: '3 alternatives analysées' },
      { id: 't7', d: 'marche', title: 'Estimer le volume de réparations à Lyon', status: 'todo', meta: '2 ressources' },
      { id: 't8', d: 'marche', title: 'Valider le prix accepté pour un déplacement', status: 'postponed', meta: 'Après les tests maquette' },
      { id: 't9', d: 'juridique', title: 'Choisir le statut juridique', status: 'done', meta: 'SASU retenue' },
      { id: 't10', d: 'juridique', title: 'Rédiger les CGU de la plateforme et le modèle de CGV', status: 'todo', forgotten: true, meta: '4 documents générables' },
      { id: 't11', d: 'juridique', title: 'Vérifier le nom et déposer la marque', status: 'done', forgotten: true, meta: 'Dépôt effectué le 6 oct.' },
      { id: 't12', d: 'juridique', title: 'Tenir le registre des traitements de données', status: 'todo', forgotten: true, meta: '2 ressources' },
      { id: 't13', d: 'finance', title: 'Fixer la commission par réservation', status: 'done', meta: '12 % retenus' },
      { id: 't14', d: 'finance', title: 'Ouvrir un compte bancaire professionnel', status: 'done', meta: 'Ouvert le 1er oct.' },
      { id: 't15', d: 'finance', title: 'Construire le prévisionnel sur 12 mois', status: 'todo', meta: 'Échéance 31 oct.' },
      { id: 't16', d: 'finance', title: 'Clarifier la TVA applicable aux commissions', status: 'todo', forgotten: true, meta: '1 ressource' },
      { id: 't17', d: 'marketing', title: 'Publier une page « liste d’attente »', status: 'done', meta: '148 inscrits' },
      { id: 't18', d: 'marketing', title: 'Créer la fiche d’établissement sur les cartes en ligne', status: 'todo', meta: '30 min' },
      { id: 't19', d: 'marketing', title: 'Nouer 3 partenariats avec des magasins de vélo', status: 'postponed', meta: 'Après le MVP' },
      { id: 't20', d: 'tech', title: 'Choisir un prestataire de paiement en ligne', status: 'todo', meta: '3 options comparées' },
      { id: 't21', d: 'tech', title: 'Gérer créneaux et zones d’intervention', status: 'todo', meta: 'Échéance 7 nov.' },
      { id: 't22', d: 'tech', title: 'Héberger les données dans l’Union européenne', status: 'done', forgotten: true, meta: 'Hébergeur choisi' },
      { id: 't23', d: 'operations', title: 'Souscrire une assurance RC professionnelle', status: 'todo', forgotten: true, meta: 'Échéance 25 oct.' },
      { id: 't24', d: 'operations', title: 'Définir la procédure en cas de litige ou de dommage', status: 'todo', forgotten: true, meta: '1 document générable' },
      { id: 't25', d: 'operations', title: 'Rédiger le guide d’accueil des réparateurs', status: 'todo', meta: '1 document générable' },
      { id: 't26', d: 'veille', title: 'Suivre les dispositifs publics d’aide à la réparation', status: 'todo', meta: 'Alerte mensuelle' },
      { id: 't27', d: 'veille', title: 'Surveiller l’arrivée de nouveaux acteurs à Lyon', status: 'postponed', meta: 'Après le lancement' }
    ],
    decisions: [
      { date: '12 oct.', domain: 'Finance', text: 'Commission fixée à 12 % par réservation, payée par le réparateur.' },
      { date: '9 oct.', domain: 'Juridique & admin', text: 'Statut retenu : SASU, avec ouverture du capital possible en 2027.' },
      { date: '7 oct.', domain: 'Marché & clients', text: 'Lancement limité aux 3e, 6e et 7e arrondissements.' },
      { date: '3 oct.', domain: 'Marketing & acquisition', text: 'Partenariats avec les magasins reportés après le MVP.' }
    ],
    domain: function (id) { for (var i = 0; i < Demo.domains.length; i++) if (Demo.domains[i].id === id) return Demo.domains[i]; return null; },
    tasksOf: function (id) { return Demo.tasks.filter(function (t) { return t.d === id; }); },
    stats: function (id) {
      var list = id ? Demo.tasksOf(id) : Demo.tasks;
      var s = { total: list.length, done: 0, todo: 0, postponed: 0, forgotten: 0, forgottenOpen: 0 };
      list.forEach(function (t) {
        s[t.status]++;
        if (t.forgotten) { s.forgotten++; if (t.status !== 'done') s.forgottenOpen++; }
      });
      s.pct = s.total ? Math.round(s.done / s.total * 100) : 0;
      return s;
    }
  };

  var api = {
    Button: Button, Input: Input, TaskCard: TaskCard, ForgottenBadge: ForgottenBadge,
    DomainHeader: DomainHeader, TaskStatus: TaskStatus, ChatBubble: ChatBubble,
    ProgressBar: ProgressBar, PrototypeBanner: PrototypeBanner, Logo: Logo, Icon: Icon,
    AppShell: AppShell, Demo: Demo, icons: Object.keys(ICONS)
  };
  window.BuildOS = Object.assign(window.BuildOS || {}, api);
})();
