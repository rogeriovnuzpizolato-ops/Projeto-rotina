// Usada pela tela principal: manda para o login se não houver token
function exigirLogin() {
  if (!getToken()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

function sair() {
  clearToken();
  window.location.href = 'login.html';
}

function mostrarErroAuth(mensagem) {
  const caixa = document.getElementById('erro');
  caixa.textContent = mensagem;
  caixa.classList.add('visivel');
}

function esconderErroAuth() {
  document.getElementById('erro').classList.remove('visivel');
}

function iniciarLogin(form) {
  if (getToken()) {
    window.location.href = 'index.html';
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    esconderErroAuth();

    const botao = form.querySelector('button');
    botao.disabled = true;

    try {
      const token = await apiLogin(form.email.value.trim(), form.senha.value);
      setToken(token);
      window.location.href = 'index.html';
    } catch (erro) {
      mostrarErroAuth(erro.message);
      botao.disabled = false;
    }
  });
}

function iniciarCadastro(form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    esconderErroAuth();

    const email = form.email.value.trim();
    const senha = form.senha.value;

    if (senha !== form.confirmar.value) {
      mostrarErroAuth('As senhas não são iguais.');
      return;
    }

    const botao = form.querySelector('button');
    botao.disabled = true;

    try {
      await apiCadastrar(email, senha);
      // Já entra direto depois de criar a conta
      const token = await apiLogin(email, senha);
      setToken(token);
      window.location.href = 'index.html';
    } catch (erro) {
      mostrarErroAuth(erro.message);
      botao.disabled = false;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const formLogin = document.getElementById('formLogin');
  const formCadastro = document.getElementById('formCadastro');

  if (formLogin) iniciarLogin(formLogin);
  if (formCadastro) iniciarCadastro(formCadastro);
});