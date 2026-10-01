// Safety net: if ds/_ds_bundle.js fails to load, provide Arcade-styled Button/LinkButton/DestructiveButton
// so CTAs never render empty. No-op when the real bundle is present.
(function () {
  var NS = 'DSArcadeDesignSystem_c0f4b3';
  function install() {
  if (window[NS] && window[NS].Button) return;
  var FONT = '"Proxima Nova", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  var SKIN = {
    primary: { bg: '#0060ff', bgH: '#3373dd', bd: '#0060ff', bdH: '#3373dd', fg: '#ffffff' },
    secondary: { bg: '#ffffff', bgH: '#f0f5ff', bd: '#d4d5d6', bdH: '#0060ff', fg: '#161616' },
    tertiary: { bg: 'transparent', bgH: 'transparent', bd: 'transparent', bdH: 'transparent', fg: '#0060ff' }
  };
  var DSKIN = {
    primary: { bg: '#e64646', bgH: '#c93a3a', bd: '#e64646', bdH: '#c93a3a', fg: '#ffffff' },
    secondary: { bg: '#ffffff', bgH: '#fff1f1', bd: '#e64646', bdH: '#c93a3a', fg: '#e64646' },
    tertiary: { bg: 'transparent', bgH: 'transparent', bd: 'transparent', bdH: 'transparent', fg: '#e64646' }
  };
  function make(skins, link) {
    return function (p) {
      var R = window.React;
      var st = R.useState(false), hov = st[0], setHov = st[1];
      var s = skins[p.view || 'secondary'] || skins.secondary;
      var h = (p.size === 'small') ? 24 : 32;
      var style = link ? {
        height: 24, padding: 0, border: 0, background: 'none', color: hov ? '#3373dd' : '#0060ff',
        fontFamily: FONT, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6
      } : {
        height: h, minWidth: 90, padding: '0 16px', borderRadius: 2, border: '1px solid ' + (hov ? s.bdH : s.bd),
        background: hov ? s.bgH : s.bg, color: s.fg, fontFamily: FONT, fontSize: 14, fontWeight: 600, lineHeight: '16px',
        cursor: p.disabled ? 'not-allowed' : 'pointer', opacity: p.disabled ? 0.5 : 1,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, boxSizing: 'border-box',
        transition: 'background-color .15s, border-color .15s'
      };
      return R.createElement('button', {
        type: 'button', disabled: p.disabled, onClick: p.disabled ? undefined : p.onClick,
        onMouseEnter: function () { setHov(true); }, onMouseLeave: function () { setHov(false); },
        style: Object.assign(style, p.style || {})
      }, p.leftIcon || null, p.children, p.rightIcon || null);
    };
  }
  window[NS] = Object.assign({}, window[NS] || {}, {
    Button: make(SKIN, false),
    DestructiveButton: make(DSKIN, false),
    LinkButton: make(SKIN, true)
  });
  }
  // Wait until every script (incl. the real bundle) has had its chance to load.
  if (document.readyState === 'complete') setTimeout(install, 0);
  else window.addEventListener('load', install);
})();
