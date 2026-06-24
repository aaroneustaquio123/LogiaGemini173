/* =========================================================
   R∴L∴S∴ Géminis N° 173 — Comportamiento de la página
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ----- Año automático en el pie ----- */
  var anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();

  /* ----- Menú móvil ----- */
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var abierto = nav.classList.toggle('abierto');
      menuBtn.classList.toggle('activo', abierto);
      menuBtn.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });

    // Cerrar el menú al hacer clic en un enlace
    nav.querySelectorAll('a').forEach(function (enlace) {
      enlace.addEventListener('click', function () {
        nav.classList.remove('abierto');
        menuBtn.classList.remove('activo');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ----- Sombra del encabezado al desplazarse ----- */
  var cabecera = document.getElementById('cabecera');
  if (cabecera) {
    window.addEventListener('scroll', function () {
      cabecera.classList.toggle('encogido', window.scrollY > 20);
    });
  }

  /* ----- Revelado de secciones al hacer scroll ----- */
  var elementos = document.querySelectorAll('.revelar');

  if ('IntersectionObserver' in window) {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visible');
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.15 });

    elementos.forEach(function (el) { observador.observe(el); });
  } else {
    // Respaldo: si no hay soporte, mostrar todo
    elementos.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ----- Pestañas del Extranet (Tesorero / Administrador) ----- */
  var pestanas = document.querySelectorAll('.tab');

  pestanas.forEach(function (pestana) {
    pestana.addEventListener('click', function () {
      var idPanel = pestana.getAttribute('data-panel');

      // Quitar estado activo de todas las pestañas y paneles
      pestanas.forEach(function (p) {
        p.classList.remove('activo');
        p.setAttribute('aria-selected', 'false');
      });
      document.querySelectorAll('.panel-acc').forEach(function (panel) {
        panel.classList.remove('activo');
      });

      // Activar la pestaña y el panel seleccionados
      pestana.classList.add('activo');
      pestana.setAttribute('aria-selected', 'true');
      var panel = document.getElementById(idPanel);
      if (panel) panel.classList.add('activo');
    });
  });

});