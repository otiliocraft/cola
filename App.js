document.addEventListener('DOMContentLoaded', function() {
// --- NAVEGACIÓN ENTRE SECCIONES ---
document.querySelectorAll('nav ul li a[data-section]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const sectionId = this.getAttribute('data-section');
    if (sectionId) {
      document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
      const section = document.getElementById(sectionId);
      if (section) section.style.display = 'block';
      document.querySelectorAll('nav ul li a').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      history.pushState({section: sectionId}, '', '#' + encodeURIComponent(sectionId));
    }
  });
});

window.addEventListener('popstate', function(e) {
  const sectionId = (e.state && e.state.section) || decodeURIComponent(location.hash.replace('#', '')) || 'inicio';
  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
  const section = document.getElementById(sectionId);
  if (section) section.style.display = 'block';
});

// --- MODALES REGISTRO Y RECUPERAR ---
  // Mostrar modal de registro
  const registrateLink = document.getElementById('registrate-link');
  const modalRegistro = document.getElementById('modal-registro');
  const cerrarModal = document.getElementById('cerrar-modal');
  if (registrateLink && modalRegistro) {
    registrateLink.addEventListener('click', function(e) {
      e.preventDefault();
      modalRegistro.style.display = 'flex';
    });
  }
  if (cerrarModal && modalRegistro) {
    cerrarModal.addEventListener('click', function() {
      modalRegistro.style.display = 'none';
    });
  }

  // Mostrar modal de recuperación
  const olvideLink = document.getElementById('olvide-link');
  const modalRecuperar = document.getElementById('modal-recuperar');
  const cerrarModalRecuperar = document.getElementById('cerrar-modal-recuperar');
  if (olvideLink && modalRecuperar) {
    olvideLink.addEventListener('click', function(e) {
      e.preventDefault();
      modalRecuperar.style.display = 'flex';
      document.getElementById('recuperar-form').reset();
      document.getElementById('preguntas-seguridad').style.display = 'none';
      document.getElementById('recuperar-error').style.display = 'none';
      document.getElementById('recuperar-exito').style.display = 'none';
    });
  }
  if (cerrarModalRecuperar && modalRecuperar) {
    cerrarModalRecuperar.addEventListener('click', function() {
      modalRecuperar.style.display = 'none';
    });
  }

  // Mostrar/ocultar contraseña en login
  const loginPassword = document.getElementById('login-password');
  const toggleLoginPassword = document.getElementById('toggle-login-password');
  if (loginPassword && toggleLoginPassword) {
    toggleLoginPassword.addEventListener('click', function() {
      if (loginPassword.type === 'password') {
        loginPassword.type = 'text';
        toggleLoginPassword.textContent = '🙈';
      } else {
        loginPassword.type = 'password';
        toggleLoginPassword.textContent = '👁️';
      }
    });
  }

  // Mostrar/ocultar contraseña en registro
  const regPassword = document.getElementById('reg-password');
  const toggleRegPassword = document.getElementById('toggle-reg-password');
  if (regPassword && toggleRegPassword) {
    toggleRegPassword.addEventListener('click', function() {
      if (regPassword.type === 'password') {
        regPassword.type = 'text';
        toggleRegPassword.textContent = '🙈';
      } else {
        regPassword.type = 'password';
        toggleRegPassword.textContent = '👁️';
      }
    });
  }
  // Mostrar/ocultar confirmar contraseña
  const regPassword2 = document.getElementById('reg-password2');
  const toggleRegPassword2 = document.getElementById('toggle-reg-password2');
  if (regPassword2 && toggleRegPassword2) {
    toggleRegPassword2.addEventListener('click', function() {
      if (regPassword2.type === 'password') {
        regPassword2.type = 'text';
        toggleRegPassword2.textContent = '🙈';
      } else {
        regPassword2.type = 'password';
        toggleRegPassword2.textContent = '👁️';
      }
    });
  }
  // Mostrar/ocultar nueva contraseña en recuperación
  const nuevaPassword = document.getElementById('nueva-password');
  const toggleNuevaPassword = document.getElementById('toggle-nueva-password');
  if (nuevaPassword && toggleNuevaPassword) {
    toggleNuevaPassword.addEventListener('click', function() {
      if (nuevaPassword.type === 'password') {
        nuevaPassword.type = 'text';
        toggleNuevaPassword.textContent = '🙈';
      } else {
        nuevaPassword.type = 'password';
        toggleNuevaPassword.textContent = '👁️';
      }
    });
  }

  // Validación en tiempo real de la contraseña
  const regPasswordInput = document.getElementById('reg-password');
  if (regPasswordInput) {
    regPasswordInput.addEventListener('input', function() {
      const val = regPasswordInput.value;
      document.getElementById('cond-length').classList.toggle('ok', val.length >= 8);
      document.getElementById('cond-mayus').classList.toggle('ok', /[A-Z]/.test(val));
      document.getElementById('cond-minus').classList.toggle('ok', /[a-z]/.test(val));
      document.getElementById('cond-num').classList.toggle('ok', /[0-9]/.test(val));
      document.getElementById('cond-symbol').classList.toggle('ok', /[^A-Za-z0-9]/.test(val));
    });
  }

  // Mostrar sección inicial
  const initialSection = decodeURIComponent(location.hash.replace('#', '')) || 'inicio';
  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
  const section = document.getElementById(initialSection);
  if (section) section.style.display = 'block';
});

// --- REGISTRO ---
function obtenerUsuarios() {
  try {
    return JSON.parse(localStorage.getItem('usuariosGlamour')) || [];
  } catch {
    return [];
  }
}
function guardarUsuarios(usuarios) {
  localStorage.setItem('usuariosGlamour', JSON.stringify(usuarios));
}
const registroForm = document.getElementById('registro-form');
if (registroForm) {
  registroForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Limpiar errores anteriores
    document.querySelectorAll('.input-error').forEach(div => div.textContent = '');

    let valido = true;

    // Validar nombre
    const nombre = document.getElementById('reg-nombre').value.trim();
    if (nombre.length < 3) {
      document.getElementById('error-nombre').textContent = 'El nombre es muy corto.';
      valido = false;
    }

    // Validar usuario
    const usuario = document.getElementById('reg-usuario').value.trim();
    if (usuario.length < 4) {
      document.getElementById('error-usuario').textContent = 'El usuario debe tener al menos 4 caracteres.';
      valido = false;
    }

    // Validar contraseña
    const password = document.getElementById('reg-password').value;
    const password2 = document.getElementById('reg-password2').value;
    let passError = '';
    if (password.length < 8) passError += 'Debe tener al menos 8 caracteres. ';
    if (!/[A-Z]/.test(password)) passError += 'Debe tener una mayúscula. ';
    if (!/[a-z]/.test(password)) passError += 'Debe tener una minúscula. ';
    if (!/[0-9]/.test(password)) passError += 'Debe tener un número. ';
    if (!/[^A-Za-z0-9]/.test(password)) passError += 'Debe tener un símbolo. ';
    if (passError) {
      document.getElementById('password-condiciones').nextElementSibling.textContent = passError;
      valido = false;
    } else {
      document.getElementById('password-condiciones').nextElementSibling.textContent = '';
    }

    // Validar confirmación de contraseña
    if (password !== password2) {
      document.getElementById('reg-password2').parentElement.nextElementSibling.textContent = 'Las contraseñas no coinciden.';
      valido = false;
    } else {
      document.getElementById('reg-password2').parentElement.nextElementSibling.textContent = ' ';
    }

    // Validar preguntas y respuestas
    const pregunta1 = document.getElementById('pregunta1').value.trim();
    const respuesta1 = document.getElementById('respuesta1').value.trim();
    const pregunta2 = document.getElementById('pregunta2').value.trim();
    const respuesta2 = document.getElementById('respuesta2').value.trim();
    if (!pregunta1 || !respuesta1 || !pregunta2 || !respuesta2) {
      valido = false;
    }

    // Validar edad y fecha
    const fecha = document.getElementById('reg-fecha').value;
    const edad = document.getElementById('reg-edad').value.trim();
    if (!fecha || !edad) {
      valido = false;
    }

    // Validar usuario único
    let usuarios = obtenerUsuarios();
    if (usuarios.find(u => u.usuario === usuario)) {
      document.getElementById('error-usuario').textContent = 'El usuario ya está registrado. Elige otro nombre de usuario.';
      valido = false;
    }

    if (!valido) return;

    usuarios.push({
      nombre: nombre.replace(/[<>]/g, ''),
      fecha,
      edad: edad.replace(/[<>]/g, ''),
      usuario: usuario.replace(/[<>]/g, ''),
      password,
      pregunta1: pregunta1.replace(/[<>]/g, ''),
      respuesta1: respuesta1.replace(/[<>]/g, ''),
      pregunta2: pregunta2.replace(/[<>]/g, ''),
      respuesta2: respuesta2.replace(/[<>]/g, '')
    });
    guardarUsuarios(usuarios);
    // Ocultar modal de registro
document.getElementById('modal-registro').style.display = 'none';

// Mostrar mensaje de éxito
const exitoDiv = document.getElementById('registro-exito');
if (exitoDiv) {
  exitoDiv.style.display = 'block';
}

// Cerrar mensaje al hacer clic fuera del contenido o en la X
document.addEventListener('click', function cerrarMensaje(e) {
  const mensaje = document.getElementById('registro-exito');
  if (!mensaje) return;

  // Si se hace clic en la "X" o fuera del contenido
  if (
    e.target === mensaje ||
    e.target.classList.contains('cerrar-mensaje')
  ) {
    mensaje.style.display = 'none';
    // Quitar evento para evitar múltiples listeners
    document.removeEventListener('click', cerrarMensaje);
  }
});
    document.getElementById('modal-registro').style.display = 'none';
    registroForm.reset();
    // Mostrar login y rellenar usuario
    document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
    const loginSection = document.getElementById('login');
    if (loginSection) loginSection.style.display = 'block';
    document.getElementById('login-usuario').value = usuario;
  });
}

// --- LOGIN ---
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const usuarioInput = document.getElementById('login-usuario').value.trim();
    const password = document.getElementById('login-password').value;
    const usuarios = obtenerUsuarios();
    const user = usuarios.find(u => u.usuario === usuarioInput && u.password === password);
    if (user) {
      loginError.style.display = 'none';
      localStorage.setItem('usuarioActual', usuarioInput);
      mostrarInfoUsuario(usuarioInput);
      document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
      document.getElementById('info-usuario').style.display = 'block';
    } else {
      loginError.style.display = 'block';
    }
  });
}

// --- MOSTRAR DATOS DEL USUARIO ---
function mostrarInfoUsuario(usuario) {
  const usuarios = obtenerUsuarios();
  const userObj = usuarios.find(u => u.usuario === usuario);
  if (!userObj) return;
  const datos = [
    { label: 'Nombre completo', value: userObj.nombre || '' },
    { label: 'Fecha de nacimiento', value: userObj.fecha || '' },
    { label: 'Edad', value: userObj.edad || '' },
    { label: 'Usuario', value: userObj.usuario || '' }
  ];
  const lista = document.getElementById('datos-usuario');
  if (lista) {
    lista.innerHTML = datos.map(d => `<li><strong>${d.label}:</strong> ${d.value.replace(/[<>]/g, '')}</li>`).join('');
  }
  const infoSection = document.getElementById('info-usuario');
  if (infoSection) infoSection.style.display = 'block';
}

// --- LOGOUT ---
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', function() {
    localStorage.removeItem('usuarioActual');
    document.getElementById('info-usuario').style.display = 'none';
    document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
    document.getElementById('login').style.display = 'block';
  });
}

// --- RECUPERAR CONTRASEÑA ---
let usuarioRecuperar = null;
const verPreguntasBtn = document.getElementById('ver-preguntas');
if (verPreguntasBtn) {
  verPreguntasBtn.onclick = function() {
    const usuario = document.getElementById('rec-usuario').value.trim();
    const usuarios = obtenerUsuarios();
    const user = usuarios.find(u => u.usuario === usuario);
    if (user) {
      usuarioRecuperar = user;
      document.getElementById('label-pregunta1').textContent = user.pregunta1.replace(/[<>]/g, '');
      document.getElementById('label-pregunta2').textContent = user.pregunta2.replace(/[<>]/g, '');
      document.getElementById('preguntas-seguridad').style.display = '';
      document.getElementById('recuperar-error').style.display = 'none';
    } else {
      document.getElementById('preguntas-seguridad').style.display = 'none';
      document.getElementById('recuperar-error').style.display = '';
    }
  };
}

const recuperarForm = document.getElementById('recuperar-form');
if (recuperarForm) {
  recuperarForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!usuarioRecuperar) return;
    const r1 = document.getElementById('respuesta1-recuperar').value.trim();
    const r2 = document.getElementById('respuesta2-recuperar').value.trim();
    const nuevaPass = document.getElementById('nueva-password').value;
    if (
      r1 === usuarioRecuperar.respuesta1 &&
      r2 === usuarioRecuperar.respuesta2
    ) {
      let usuarios = obtenerUsuarios();
      usuarios = usuarios.map(u =>
        u.usuario === usuarioRecuperar.usuario
          ? { ...u, password: nuevaPass }
          : u
      );
      guardarUsuarios(usuarios);
      document.getElementById('recuperar-exito').style.display = '';
      document.getElementById('recuperar-error').style.display = 'none';
      this.reset();
      document.getElementById('preguntas-seguridad').style.display = 'none';
      setTimeout(() => {
        document.getElementById('recuperar-exito').style.display = 'none';
        document.getElementById('modal-recuperar').style.display = 'none';
      }, 1500);
    } else {
      document.getElementById('recuperar-error').style.display = '';
    }
  });
}
