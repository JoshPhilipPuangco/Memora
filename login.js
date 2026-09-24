'use strict';

const tabLogin = document.getElementById('tab-login');
const tabSignup = document.getElementById('tab-signup');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const loginError = document.getElementById('login-error');
const signupError = document.getElementById('signup-error');

const loginEmailInput = document.getElementById('login-email');
const loginPasswordInput = document.getElementById('login-password');
const signupUsernameInput = document.getElementById('signup-username');
const signupEmailInput = document.getElementById('signup-email');
const signupPasswordInput = document.getElementById('signup-password');

function showTab(name) {
  const showingLogin = name === 'login';

  tabLogin.className = showingLogin ? 'tab is-selected' : 'tab';
  tabSignup.className = showingLogin ? 'tab' : 'tab is-selected';

  loginForm.hidden = !showingLogin;
  signupForm.hidden = showingLogin;

  clearError(loginError);
  clearError(signupError);
}

function initTabFromHash() {
  if (location.hash === '#signup') {
    showTab('signup');
  } else {
    showTab('login');
  }
}

function isUsernameValid(value) {
  if (value.length < 6) {
    return false;
  }

  const allowedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_';

  for (const char of value) {
    if (!allowedChars.includes(char)) {
      return false;
    }
  }

  return true;
}

function isEmailValid(value) {
  if (value.length === 0) {
    return false;
  }

  if (value.includes(' ')) {
    return false;
  }

  let atCount = 0;
  for (const char of value) {
    if (char === '@') {
      atCount += 1;
    }
  }
  if (atCount !== 1) {
    return false;
  }

  const atIndex = value.indexOf('@');
  if (atIndex === 0 || atIndex === value.length - 1) {
    return false;
  }

  let domainPart = '';
  for (let i = atIndex + 1; i < value.length; i++) {
    domainPart += value[i];
  }

  if (!domainPart.includes('.')) {
    return false;
  }

  const dotIndex = domainPart.indexOf('.');
  if (dotIndex === 0 || dotIndex === domainPart.length - 1) {
    return false;
  }

  return true;
}

function isPasswordValid(value) {
  return value.length >= 6;
}

function getAccount() {
  const raw = localStorage.getItem('account');

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

function saveAccount(username, email, password) {
  localStorage.setItem('account', JSON.stringify({ username: username, email: email, password: password }));
}

function setCurrentUser(email) {
  localStorage.setItem('currentUser', JSON.stringify({ email: email }));
}

function showError(errorElement, message) {
  errorElement.textContent = message;
}

function clearError(errorElement) {
  errorElement.textContent = '';
}

function handleSignup(event) {
  event.preventDefault();
  clearError(signupError);

  const username = signupUsernameInput.value.trim();
  const email = signupEmailInput.value.trim();
  const password = signupPasswordInput.value.trim();

  if (!username || !email || !password) {
    showError(signupError, 'Please fill in all fields.');
    return;
  }

  if (!isUsernameValid(username)) {
    showError(signupError, 'Username must be at least 6 characters and contain only letters, numbers, and underscores.');
    return;
  }

  if (!isEmailValid(email)) {
    showError(signupError, 'Please enter a valid email address.');
    return;
  }

  if (!isPasswordValid(password)) {
    showError(signupError, 'Password must be at least 6 characters.');
    return;
  }

  if (getAccount()) {
    showError(signupError, 'An account already exists. Please log in instead.');
    return;
  }

  saveAccount(username, email, password);
  setCurrentUser(email);
  window.location.href = 'my-decks.html';
}

function handleLogin(event) {
  event.preventDefault();
  clearError(loginError);

  const email = loginEmailInput.value.trim();
  const password = loginPasswordInput.value.trim();

  if (!email || !password) {
    showError(loginError, 'Please fill in all fields.');
    return;
  }

  if (!isEmailValid(email)) {
    showError(loginError, 'Please enter a valid email address.');
    return;
  }

  const account = getAccount();
  const matches = account && account.email === email && account.password === password;

  if (!matches) {
    showError(loginError, 'Incorrect email or password');
    return;
  }

  setCurrentUser(email);
  window.location.href = 'my-decks.html';
}

tabLogin.addEventListener('click', () => showTab('login'));
tabSignup.addEventListener('click', () => showTab('signup'));
loginForm.addEventListener('submit', handleLogin);
signupForm.addEventListener('submit', handleSignup);

initTabFromHash();
