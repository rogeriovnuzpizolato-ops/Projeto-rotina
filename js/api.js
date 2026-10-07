const BASE_URL = 'http://localhost:8080';

// ---------- Token guardado no navegador ----------

function getToken() {
  return localStorage.getItem('token');
}

function setToken(token) {
  localStorage.setItem('token', token);
}

function clearToken() {
  localStorage.removeItem('token');
}

// ---------- Base das requisições ----------

async function requisitar(caminho, opcoes) {
  try {
    return await fetch(BASE_URL + caminho, opcoes);
  } catch {
    throw new Error('Não foi possível conectar à API. Confira se ela está rodando em ' + BASE_URL + '.');
  }
}

// Requisição para rotas protegidas: anexa o token e trata sessão expirada
async function authFetch(caminho, opcoes = {}) {
  const headers = { Authorization: 'Bearer ' + getToken(), ...(opcoes.headers || {}) };

  if (opcoes.body) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await requisitar(caminho, { ...opcoes, headers });

  if (res.status === 401 || res.status === 403) {
    clearToken();
    window.location.href = 'login.html';
    throw new Error('Sessão expirada. Faça login novamente.');
  }

  if (!res.ok) {
    throw new Error('Algo deu errado (erro ' + res.status + ').');
  }

  return res;
}

// ---------- Autenticação ----------

async function apiCadastrar(email, senha) {
  const res = await requisitar('/auth/cadastro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  });

  if (!res.ok) {
    throw new Error(
      res.status === 500
        ? 'Não foi possível cadastrar. Esse email já pode estar em uso.'
        : 'Não foi possível cadastrar.'
    );
  }
}

async function apiLogin(email, senha) {
  const res = await requisitar('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  });

  if (!res.ok) {
    throw new Error('Email ou senha incorretos.');
  }

  const dados = await res.json();
  return dados.token;
}

// ---------- Tarefas ----------

async function listarTarefas() {
  const res = await authFetch('/tarefas');
  return res.json();
}

async function criarTarefa(tarefa) {
  const res = await authFetch('/tarefas', {
    method: 'POST',
    body: JSON.stringify(tarefa)
  });
  return res.json();
}

async function atualizarTarefa(id, tarefa) {
  const res = await authFetch('/tarefas/' + id, {
    method: 'PUT',
    body: JSON.stringify(tarefa)
  });
  return res.json();
}

async function deletarTarefa(id) {
  await authFetch('/tarefas/' + id, { method: 'DELETE' });
}